import { appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

import type {
  VfsHookContext,
  VfsHooks,
} from "@earendil-works/gondolin";

export const FROZEN = ["/workspace/okf/.okflintrc.json"] as const;

type ErrnoError = Error & {
  code: string;
  errno: number;
  path?: string;
  syscall?: string;
};

type AuditRecord = {
  timestamp: string;
  denied: boolean;
  op: string;
  path?: string;
  oldPath?: string;
  newPath?: string;
  flags?: string | number;
};

const MUTATING_OPS = new Set([
  "mkdir",
  "unlink",
  "rmdir",
  "rename",
  "link",
  "truncate",
  "write",
  "writeFile",
]);

function errnoError(
  code: string,
  errno: number,
  syscall: string,
  path?: string,
): ErrnoError {
  const suffix = path === undefined ? "" : `, '${path}'`;
  const error = new Error(
    `${code}: permission denied, ${syscall}${suffix}`,
  ) as ErrnoError;
  error.code = code;
  error.errno = errno;
  error.path = path;
  error.syscall = syscall;
  return error;
}

function isWriteFlag(flags: string | number | undefined): boolean {
  if (typeof flags === "string") {
    return /[wa+]/.test(flags);
  }

  if (typeof flags === "number") {
    // POSIX access-mode bits: O_WRONLY=1, O_RDWR=2.
    return (flags & 0b11) !== 0;
  }

  return false;
}

function isMutation(context: VfsHookContext): boolean {
  return (
    MUTATING_OPS.has(context.op) ||
    (context.op === "open" && isWriteFlag(context.flags))
  );
}

function pathsFor(context: VfsHookContext): string[] {
  return [context.path, context.oldPath, context.newPath].filter(
    (value): value is string => value !== undefined,
  );
}

function appendAudit(auditLogPath: string, record: AuditRecord): void {
  mkdirSync(dirname(auditLogPath), { recursive: true });
  appendFileSync(auditLogPath, `${JSON.stringify(record)}\n`, "utf8");
}

export function createGuard(auditLogPath: string): VfsHooks {
  return {
    before(context) {
      if (!isMutation(context)) {
        return;
      }

      const deniedPath = pathsFor(context).find((candidate) =>
        FROZEN.includes(candidate as (typeof FROZEN)[number]),
      );
      const denied = deniedPath !== undefined;

      appendAudit(auditLogPath, {
        timestamp: new Date().toISOString(),
        denied,
        op: context.op,
        path: context.path,
        oldPath: context.oldPath,
        newPath: context.newPath,
        flags: context.flags,
      });

      if (denied) {
        throw errnoError("EACCES", -13, context.op, deniedPath);
      }
    },
  };
}
