"use client";

import { useState, useEffect } from "react";

export default function SignIn() {
  // 1. 定义状态管理 CSRF Token、加载状态、错误状态
  const [csrfToken, setCsrfToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. 用 useEffect 执行异步获取 CSRF Token 的逻辑
  useEffect(() => {
    // 封装异步函数
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/csrf");
        // 处理请求失败的情况
        if (!response.ok) {
          throw new Error(
            `请求失败：${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (err) {
        // 捕获并存储错误信息
        setError(err instanceof Error ? err.message : "获取CSRF Token失败");
        console.error("获取CSRF Token出错：", err);
      } finally {
        // 无论成功/失败，结束加载状态
        setLoading(false);
      }
    };

    // 调用异步函数
    fetchCsrfToken();
  }, []); // 空依赖：仅组件挂载时执行一次

  // 3. 渲染不同状态的UI
  // 加载中
  if (loading) {
    return <div className="p-4">加载中...</div>;
  }

  // 出错时
  if (error) {
    return <div className="p-4 text-red-500">错误：{error}</div>;
  }

  // 正常渲染登录表单
  return (
    <form
      method="post"
      action="/api/auth/callback/credentials"
      className="p-4 space-y-4"
    >
      {/* 隐藏域传递 CSRF Token */}
      <input type="hidden" name="csrfToken" value={csrfToken} />

      {/* 用户名输入框 */}
      <label className="block">
        Username
        <input
          name="username"
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </label>

      {/* 密码输入框 */}
      <label className="block">
        Password
        <input
          name="password"
          type="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </label>

      {/* 提交按钮 */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Sign in
      </button>
    </form>
  );
}
