import { PARTYKIT_HOST as Host } from "astro:env/client";
export const PARTYKIT_HOST = Host ?? "127.0.0.1:1999";
export const PROTOCOL = PARTYKIT_HOST.startsWith("127.0.0.1")
	? "http"
	: "https";
export const PARTYKIT_URL = `${PROTOCOL}://${PARTYKIT_HOST}`;
