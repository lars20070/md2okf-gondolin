import assert from "node:assert/strict";
import test from "node:test";

import { createRuntimeNetwork } from "../src/net.ts";

test("runtime egress is exactly the intended allowlist", () => {
  const network = createRuntimeNetwork("test-key");

  assert.deepEqual(network.allowedHosts, [
    "openrouter.ai",
    "registry.npmjs.org",
    "context7.com",
  ]);
  assert.equal(network.allowWebSockets, false);
  assert.notEqual(network.env.OPENROUTER_API_KEY, "test-key");
  assert.match(network.env.OPENROUTER_API_KEY ?? "", /^GONDOLIN_SECRET_/);
});
