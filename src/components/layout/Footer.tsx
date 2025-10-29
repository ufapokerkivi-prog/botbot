export default function Footer() {
  return (
    <footer className="border-t border-border bg-elevated px-4 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <p className="font-display text-lg font-semibold text-text">Наркологическая служба</p>
            <p className="mt-2 text-sm text-muted">© 2025 Все права защищены.</p>
            <div className="mt-3 space-y-1 text-xs text-muted">
              <p>ИНН: 7700123456789</p>
              <p>Лицензия № ЛО-77-01-012345 от 01.01.2023</p>
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <a href="tel:+78000000000" className="block transition-colors hover:text-primary">
              8 (800) 000-00-00
            </a>
            <a
              href="mailto:info@example.com"
              className="block transition-colors hover:text-primary"
            >
              info@example.com
            </a>
          </div>
          <div className="flex-1 text-xs text-muted">
            <p>Политика конфиденциальности</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
