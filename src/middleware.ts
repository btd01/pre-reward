import createMiddleware from "next-intl/middleware"

import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
    matcher: [
        // Match all pathnames except for
        // - … or ones starting with `/api`, `/_next` or `/_vercel`
        // - … or ones containing a dot (e.g. `favicon.ico`)
        "/((?!api|_next|_vercel|.*\\..*).*)"
        // However, match all pathnames within /api, except for
        // - … /_next and /_vercel
        // "/api/((?!_next|_vercel).*)",
    ]
}
