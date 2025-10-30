import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20">
      <div className="text-center">
        <div className="mb-6 text-8xl">404</div>
        <h1 className="mb-4 font-display text-3xl font-bold text-text md:text-4xl">
          Страница не найдена
        </h1>
        <p className="mb-8 max-w-md text-lg text-muted">
          К сожалению, запрашиваемая страница не существует или была удалена.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-8 py-4 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:bg-primary-700 hover:shadow-primary-lg hover:opacity-95"
          >
            На главную
          </Link>
          <a
            href="tel:+78000000000"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary bg-white px-8 py-4 font-display text-base font-semibold text-primary transition-all hover:border-primary-600 hover:bg-primary-600 hover:text-white"
          >
            <span>🚑</span>
            Позвонить
          </a>
        </div>
      </div>
    </div>
  );
}
