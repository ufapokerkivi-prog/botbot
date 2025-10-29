"use client";

export default function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <a
        href="tel:+78000000000"
        className="animate-pulse-soft flex w-full items-center justify-center bg-primary px-6 py-4 font-display text-base font-semibold text-white shadow-primary-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
        style={{ minHeight: "48px" }}
      >
        <span className="mr-2 text-xl">🚑</span>
        Вызвать врача
      </a>
    </div>
  );
}
