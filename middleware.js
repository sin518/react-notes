import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/config.js";
import { auth } from "@/auth.js";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  // 默认语言不重定向
  localePrefix: "as-needed",
});

export default auth((req) => {
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // 拦截所有页面和动态路由，但排除静态资源和 API
    // 这样能保留身份验证拦截功能，同时避免 SVG/图片 404
    "/((?!api|_next/static|_next/image|.*\\..*|favicon).*)",
  ],
};
