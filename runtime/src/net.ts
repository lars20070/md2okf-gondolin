import { createHttpHooks } from "@earendil-works/gondolin";

export function createRuntimeNetwork(openRouterApiKey: string) {
  const network = createHttpHooks({
    // Keep this an explicit literal: omitted allowedHosts means allow-all.
    allowedHosts: [
      "openrouter.ai",
      "registry.npmjs.org",
      "context7.com",
    ],
    secrets: {
      OPENROUTER_API_KEY: {
        hosts: ["openrouter.ai"],
        value: openRouterApiKey,
      },
    },
  });

  return {
    httpHooks: network.httpHooks,
    env: network.env,
    allowedHosts: network.allowedHosts,
    allowWebSockets: false,
  };
}
