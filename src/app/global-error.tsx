"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="ru">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-2xl">
            <div className="mb-6 text-6xl">⚠️</div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">Что-то пошло не так</h1>
            <p className="mb-8 text-gray-600">
              Произошла критическая ошибка. Пожалуйста, попробуйте обновить страницу.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={() => reset()}
                className="rounded-lg bg-primary-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-700"
              >
                Попробовать снова
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-white px-8 py-4 text-base font-semibold text-primary transition-all hover:border-primary-600 hover:bg-primary-600 hover:text-white"
              >
                На главную
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Нужна срочная помощь?</h2>
              <a
                href="tel:+78000000000"
                className="inline-flex items-center gap-2 text-2xl font-bold text-primary transition-colors hover:text-primary-700"
              >
                <span className="text-3xl">🚑</span>8 (800) 000-00-00
              </a>
              <p className="mt-2 text-sm text-gray-600">Круглосуточная горячая линия</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
