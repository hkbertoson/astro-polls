// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

import solidJs from "@astrojs/solid-js";
import { envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
	env: {
		schema: {
			PARTYKIT_HOST: envField.string({
				context: "client",
				access: "public",
			}),
		},
	},
	integrations: [tailwind(), solidJs()],
	adapter: cloudflare(),
	output: "server",
});
