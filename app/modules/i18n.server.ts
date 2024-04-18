import { createCookie } from "@remix-run/node";
import { RemixI18Next } from "remix-i18next/server";
import Backend from "i18next-fs-backend";

import * as i18n from "~/config/i18n";
import path from "node:path";

export const localeCookie = createCookie("lng", {
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
});

export default new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    cookie: localeCookie,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18n,
    backend: {
      // Relative to the production file structure
      loadPath: path.resolve(
        `${
          process.env.NODE_ENV === "production"
            ? "./../client/assets"
            : "public"
        }/locales/{{lng}}.json`
      ),
    },
  },
  plugins: [Backend],
});
