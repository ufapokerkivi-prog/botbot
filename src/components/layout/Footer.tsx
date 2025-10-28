export default function Footer() {
  return (
    <footer className="border-t border-border bg-elevated px-4 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center text-sm text-muted md:flex-row md:text-left">
        <div>
          <p className="font-display text-lg font-semibold text-text">Наркологическая служба</p>
          <p>© {new Date().getFullYear()} Все права защищены.</p>
        </div>
        <div className="space-y-1">
          <a href="tel:+70000000000" className="block transition-colors hover:text-primary">
            +7 (000) 000-00-00
          </a>
          <a href="mailto:info@example.com" className="block transition-colors hover:text-primary">
            info@example.com
          </a>
        </div>
      </div>
    </footer>
  );
}
