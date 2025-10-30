"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Помощь", href: "#help" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Заявка", href: "#request" },
  { label: "Контакты", href: "#contacts" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-elevated shadow-soft backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 shadow-sm transition-transform hover:scale-105">
              <span className="font-display text-xl font-bold text-white">Н</span>
            </div>
            <span className="hidden font-display text-lg font-semibold text-text md:inline">
              Наркологическая служба
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-semibold text-text transition-all after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-primary after:transition-all hover:text-primary hover:after:w-full focus-visible:text-primary focus-visible:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:+78000000000"
            className="hidden rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-primary transition-all hover:border-primary-200 hover:bg-primary-100 md:block"
          >
            8 (800) 000-00-00
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden"
            aria-label="Открыть меню"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-overlay"
            />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-elevated px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <span className="font-display text-xl font-bold text-white">Н</span>
                  </div>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-text"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Закрыть меню"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-border">
                  <div className="space-y-2 py-6">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="-mx-3 block rounded-xl px-4 py-3 text-base font-semibold text-text transition-all hover:bg-primary-100 hover:text-primary active:scale-95"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="tel:+78000000000"
                      className="-mx-3 block rounded-xl bg-primary-100 px-4 py-3 text-base font-semibold text-primary transition-all hover:bg-primary-600 hover:text-white"
                    >
                      8 (800) 000-00-00
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        )}
      </AnimatePresence>
    </header>
  );
}
