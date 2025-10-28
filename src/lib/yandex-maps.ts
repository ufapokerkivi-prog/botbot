const YANDEX_MAP_SRC = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";

let scriptPromise: Promise<void> | null = null;

export function loadYandexMaps(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.ymaps) {
    return new Promise((resolve) => window.ymaps.ready(resolve));
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = YANDEX_MAP_SRC;
      script.async = true;
      script.onload = () => window.ymaps?.ready(resolve);
      script.onerror = () => reject(new Error("Не удалось загрузить Yandex Maps"));
      document.body.appendChild(script);
    });
  }

  return scriptPromise;
}

declare global {
  interface Window {
    ymaps: {
      ready: (cb: () => void) => Promise<void>;
    };
  }
}
