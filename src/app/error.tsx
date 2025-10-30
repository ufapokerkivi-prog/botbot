"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-elevated px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-2xl">
        <div className="mb-6 text-6xl">⚠️</div>
        <h1 className="mb-4 font-display text-3xl font-bold text-text">Что-то пошло не так</h1>
        <p className="mb-8 text-muted">
          Произошла ошибка при загрузке страницы. Пожалуйста, попробуйте обновить страницу.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-primary-600 px-8 py-4 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:bg-primary-700 hover:shadow-primary-lg hover:opacity-95"
          >
            Попробовать снова
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-white px-8 py-4 font-display text-base font-semibold text-primary transition-all hover:border-primary-600 hover:bg-primary-600 hover:text-white"
          >
            На главную
          </Link>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <h2 className="mb-4 font-display text-xl font-semibold text-text">
            Нужна срочная помощь?
          </h2>
          <a
            href="tel:+78000000000"
            className="inline-flex items-center gap-2 text-2xl font-bold text-primary transition-colors hover:text-primary-700"
          >
            <span className="text-3xl">🚑</span>8 (800) 000-00-00
          </a>
          <p className="mt-2 text-sm text-muted">Круглосуточная горячая линия</p>
        </div>
      </div>
    </div>
  );
}
