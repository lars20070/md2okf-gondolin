import { VM } from "@earendil-works/gondolin";

const vm = await VM.create({
  sandbox: { imagePath: "alpine-base:0.2.0" },
});

try {
  const result = await vm.exec([
    "/bin/sh",
    "-lc",
    "uname -a; id -u; printf 'HOME=%s\\n' \"$HOME\"; ls -d /data",
  ]);

  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);

  if (!result.ok) {
    throw new Error(`smoke command exited ${result.exitCode}`);
  }
} finally {
  await vm.close();
}
