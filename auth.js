import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: "/api/auth/signin",
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      // 移除国际化前缀后的路径，用于路由匹配
      // 例如 /zh/note/edit/123 -> /note/edit/123
      // 例如 /en/note/edit/123 -> /note/edit/123
      const pathWithoutLocale = pathname.replace(/^\/(zh|en)/, "");

      // 需要登录的路由
      if (pathWithoutLocale.startsWith("/note/edit")) {
        // 未登录则返回 false，触发重定向到登录页面
        return !!auth;
      }

      // 其他路由允许未登录访问
      return true;
    },
  },
});
