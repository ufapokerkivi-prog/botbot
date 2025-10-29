"use client";

import {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  type FormEvent,
  type ComponentPropsWithoutRef,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import InputMask from "react-input-mask";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const services = [
  {
    id: 1,
    title: "Вывод из запоя",
    price: "от 2 900 ₽",
    icon: "💊",
    description:
      "Быстро снимаем токсическую нагрузку, подбираем безопасные препараты и сопровождаем пациента до стабилизации.",
  },
  {
    id: 2,
    title: "Снятие похмелья",
    price: "от 2 000 ₽",
    icon: "🚑",
    description:
      "Детоксикация, витамины, поддержка сердца и нервной системы. Помогаем вернуть бодрость и контроль.",
  },
  {
    id: 3,
    title: "Кодирование",
    price: "от 4 900 ₽",
    icon: "🛡️",
    description:
      "Современные методы кодирования по лицензии Минздрава. Психологическая поддержка и наблюдение 24/7.",
  },
];

const emergencyPoints = [
  "Выезд врача к вам домой или в офис",
  "Приедем в течение 30 минут",
  "Работаем без выходных и праздников",
];

const advantages = [
  {
    icon: "🚑",
    title: "Выезд за 30 минут",
    description: "Бригада готова к старту сразу после звонка",
  },
  {
    icon: "🤫",
    title: "Полная анонимность",
    description: "Документы и персональные данные не передаются третьим лицам",
  },
  {
    icon: "💳",
    title: "Честные цены",
    description: "Фиксированная стоимость, без скрытых доплат",
  },
  {
    icon: "👨‍⚕️",
    title: "Опытные врачи",
    description: "Все специалисты с профильным образованием и стажем от 10 лет",
  },
];

const modalBenefits = [
  "Персональный план лечения",
  "Рекомендации по восстановлению",
  "Подбор капельниц и препаратов",
  "Поддержка 24/7",
];

const reviews = [
  {
    id: 1,
    city: "Москва",
    name: "Андрей М.",
    text: "Врач приехал через 25 минут после звонка. Всё сделали очень деликатно, огромное спасибо за профессионализм!",
  },
  {
    id: 2,
    city: "СПБ",
    name: "Мария К.",
    text: "Выражаю благодарность за помощь отцу. Доктор был внимателен и аккуратно объяснил все действия.",
  },
  {
    id: 3,
    city: "Казань",
    name: "Дмитрий П.",
    text: "Не ожидал такой скорости: приехали через полчаса, состояние улучшилось уже через час. Рекомендую!",
  },
  {
    id: 4,
    city: "Москва",
    name: "Елена С.",
    text: "Вызывали врача для мужа глубокой ночью. Всё конфиденциально, спокойно и результативно.",
  },
  {
    id: 5,
    city: "СПБ",
    name: "Владимир Т.",
    text: "Очень ответственные и человечные специалисты. Цены соответствуют качеству.",
  },
  {
    id: 6,
    city: "Казань",
    name: "Ольга Н.",
    text: "Главное для нас была анонимность — все прошло максимально аккуратно и без лишних вопросов.",
  },
  {
    id: 7,
    city: "Москва",
    name: "Сергей Б.",
    text: "Выручали меня уже дважды. Всегда быстро, с уважением к пациенту и его близким.",
  },
  {
    id: 8,
    city: "СПБ",
    name: "Наталья Л.",
    text: "Спасли сына после тяжелого запоя. За это огромное спасибо всему коллективу службы.",
  },
  {
    id: 9,
    city: "Казань",
    name: "Игорь Ф.",
    text: "Всё понравилось: оформление, оперативность, уважительное отношение. Буду рекомендовать.",
  },
  {
    id: 10,
    city: "Москва",
    name: "Анна В.",
    text: "Очень выручили. Перезвонили сразу, помогли и всё объяснили. Сохраню контакты на будущее.",
  },
];

const proofItems = [
  { icon: "🚑", title: "30 мин", description: "Время приезда" },
  { icon: "🤫", title: "100%", description: "Анонимность" },
  { icon: "💊", title: "Сертификаты", description: "Минздрав РФ" },
  { icon: "💰", title: "Прозрачные цены", description: "Без доплат" },
  { icon: "👨‍⚕️", title: "10+ лет", description: "Опыт специалистов" },
  { icon: "☎️", title: "24/7", description: "Связь и поддержка" },
];

const timeline = [
  { step: "1", title: "Заявка", description: "Вы оставляете заявку или звоните нам" },
  { step: "2", title: "Звонок", description: "Врач связывается и уточняет состояние" },
  { step: "3", title: "Выезд", description: "Бригада приезжает в течение 30 минут" },
  { step: "4", title: "Поддержка", description: "Не оставляем вас одних после процедуры" },
];

const cityFilters = ["Все", "Москва", "СПБ", "Казань"] as const;

const HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1580281658629-73a96f2a9aa5?auto=format&fit=crop&w=900&q=80";

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export default function HomePage() {
  const [cityFilter, setCityFilter] = useState<(typeof cityFilters)[number]>("Все");
  const [showPopup, setShowPopup] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [primaryMessage, setPrimaryMessage] = useState<string | null>(null);
  const [primaryError, setPrimaryError] = useState<string | null>(null);

  const [namePopup, setNamePopup] = useState("");
  const [phonePopup, setPhonePopup] = useState("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupError, setPopupError] = useState<string | null>(null);

  const [modalName, setModalName] = useState("");
  const [modalPhone, setModalPhone] = useState("");
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  const [mapVisible, setMapVisible] = useState(false);

  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId: number | null = null;
    const handleMouseMove = (event: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setCursorPosition({
          x: (event.clientX / window.innerWidth) * 100,
          y: (event.clientY / window.innerHeight) * 100,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const popupTimer = setTimeout(() => setShowPopup(true), 30000);
    return () => clearTimeout(popupTimer);
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => setShowTimer(true), 15 * 60 * 1000);
  }, []);

  useEffect(() => {
    const events: (keyof WindowEventMap)[] = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetInactivityTimer));
    resetInactivityTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [resetInactivityTimer]);

  useEffect(() => {
    if (!mapRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMapVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredReviews = useMemo(() => {
    if (cityFilter === "Все") {
      return reviews;
    }

    return reviews.filter((review) => review.city === cityFilter);
  }, [cityFilter]);

  const handlePrimarySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const digits = normalizePhone(phone);

    if (!name.trim()) {
      setPrimaryError("Пожалуйста, укажите ваше имя");
      setPrimaryMessage(null);
      return;
    }

    if (digits.length !== 11) {
      setPrimaryError("Укажите корректный номер телефона");
      setPrimaryMessage(null);
      return;
    }

    setPrimaryError(null);
    setPrimaryMessage("Заявка отправлена! Мы свяжемся с вами в течение 3 минут.");
    setName("");
    setPhone("");
  };

  const handlePopupSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const digits = normalizePhone(phonePopup);

    if (!namePopup.trim()) {
      setPopupError("Введите ваше имя");
      setPopupMessage(null);
      return;
    }

    if (digits.length !== 11) {
      setPopupError("Пожалуйста, укажите номер телефона полностью");
      setPopupMessage(null);
      return;
    }

    setPopupError(null);
    setPopupMessage("Готово! Мы перезвоним в течение 3 минут.");
    setNamePopup("");
    setPhonePopup("");
  };

  const handleModalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const digits = normalizePhone(modalPhone);

    if (!modalName.trim()) {
      setModalError("Введите ваше имя");
      setModalMessage(null);
      return;
    }

    if (digits.length !== 11) {
      setModalError("Пожалуйста, укажите корректный номер телефона");
      setModalMessage(null);
      return;
    }

    setModalError(null);
    setModalMessage("План лечения отправлен! Наш специалист свяжется с вами.");
    setModalName("");
    setModalPhone("");
  };

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-90 transition-colors duration-500"
        style={{
          background: `radial-gradient(600px circle at ${cursorPosition.x}% ${cursorPosition.y}%, rgba(0, 200, 179, 0.12), transparent 75%)`,
        }}
      />

      {/* Hero */}
      <section
        id="hero"
        className="relative overflow-hidden px-4 pb-20 pt-24 md:pb-28 md:pt-28 lg:px-8"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-primary/10 to-white" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-white/80 px-4 py-2 text-sm font-semibold text-primary">
              <span className="text-base">⚡</span>
              Выезд врача на дом за 30 минут
            </p>
            <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight text-text md:text-5xl lg:text-6xl">
              ВЫЗОВ НАРКОЛОГА НА ДОМ ЗА 30 МИНУТ — КРУГЛОСУТОЧНО И АНОНИМНО
            </h1>
            <p className="mb-8 max-w-xl text-lg text-text md:text-xl">
              Вывод из запоя, снятие похмелья и кодирование. Частная скорая помощь 24/7. Мы приедем к вам домой,
              сохраним полную конфиденциальность и поддержим на всех этапах восстановления.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="tel:+78000000000"
                className="animate-pulse-soft inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:shadow-primary-lg hover:opacity-95"
              >
                Вызвать врача сейчас
              </a>
              <a
                href="#consultation"
                className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-white px-8 py-4 font-display text-base font-semibold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-primary-sm"
              >
                Получить консультацию бесплатно
              </a>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/80 p-5 text-center shadow-soft backdrop-blur">
                <div className="text-3xl font-bold text-primary">
                  <CountUp end={24} suffix="/7" />
                </div>
                <p className="text-sm text-muted">Работаем круглосуточно</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-5 text-center shadow-soft backdrop-blur">
                <div className="text-3xl font-bold text-primary">10+ лет</div>
                <p className="text-sm text-muted">Опыт наших специалистов</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-5 text-center shadow-soft backdrop-blur">
                <div className="text-3xl font-bold text-primary">100%</div>
                <p className="text-sm text-muted">Анонимность гарантирована</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative w-full max-w-xl self-center rounded-3xl bg-white/0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-primary/20 blur-3xl" aria-hidden />
            <div className="absolute -right-6 -bottom-8 h-52 w-52 rounded-full bg-primary/30 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
              <Image
                src={HERO_IMAGE_SRC}
                alt="Нарколог на выезде"
                width={900}
                height={1200}
                priority
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 480px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text/70 via-transparent to-transparent" aria-hidden />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/85 p-4 shadow-soft backdrop-blur">
                <p className="font-display text-lg font-semibold text-text">Дежурная бригада уже в пути</p>
                <p className="text-sm text-muted">Среднее время прибытия: 27 минут</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section id="consultation" className="px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-medium md:p-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h2 className="mb-4 font-display text-3xl font-bold text-text md:text-4xl">Срочный вызов врача</h2>
              <p className="mb-6 text-lg text-text">
                Расскажите нам о ситуации — мы подберём подходящего специалиста и подготовим необходимые препараты ещё
                до выезда.
              </p>
              <ul className="grid gap-2 text-sm text-muted">
                {emergencyPoints.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="text-lg text-primary">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <p className="mb-4 font-display text-lg font-semibold text-text">Горячая линия 24/7</p>
              <a
                href="tel:+78000000000"
                className="mb-6 flex items-center justify-center rounded-lg bg-primary px-6 py-4 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:shadow-primary-lg hover:opacity-95"
              >
                🚑 Позвонить диспетчеру
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full rounded-lg border-2 border-primary px-6 py-4 font-display text-base font-semibold text-primary transition-all hover:bg-primary hover:text-white"
              >
                Получить план лечения
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            className="mb-12 text-center font-display text-3xl font-bold text-text md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Наши услуги
          </motion.h2>
          <div className="hidden gap-6 md:grid md:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="group flex h-full flex-col rounded-2xl bg-elevated p-6 shadow-soft transition-all duration-300 hover:-translate-y-2 hover-glow-tiffany"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 text-4xl transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:shadow-primary-md">
                  {service.icon}
                </div>
                <h3 className="mb-1 font-display text-xl font-semibold text-text">{service.title}</h3>
                <p className="mb-4 text-2xl font-bold text-primary">{service.price}</p>
                <p className="text-sm text-muted">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden">
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              spaceBetween={20}
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {services.map((service) => (
                <SwiperSlide key={service.id}>
                  <div className="h-full rounded-2xl bg-elevated p-6 shadow-soft">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 text-4xl">
                      {service.icon}
                    </div>
                    <h3 className="mb-1 font-display text-xl font-semibold text-text">{service.title}</h3>
                    <p className="mb-4 text-2xl font-bold text-primary">{service.price}</p>
                    <p className="text-sm text-muted">{service.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Danger of alcohol */}
      <section className="bg-text px-4 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="mb-4 font-display text-6xl font-bold text-primary md:text-7xl">
              <CountUp end={200} duration={2.4} suffix="+" />
            </div>
            <p className="font-display text-2xl">человек умирает ежедневно</p>
          </motion.div>
          <p className="mx-auto max-w-3xl text-lg text-white/85">
            Каждый день от последствий алкоголя умирает более 200 человек. Зависимость разрушает не только тело, но и
            жизнь близких. Не ждите, пока станет поздно — вызовите врача и остановите цепочку последствий уже сегодня.
          </p>
        </div>
      </section>

      {/* How we help */}
      <section id="help" className="relative overflow-hidden px-4 py-20 lg:px-8">
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/20 to-transparent" aria-hidden />
        <div className="relative mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-text md:text-4xl">Как мы помогаем</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                className="rounded-2xl bg-white p-6 text-center shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4 text-5xl">{advantage.icon}</div>
                <h3 className="font-display text-lg font-semibold text-text">{advantage.title}</h3>
                <p className="mt-2 text-sm text-muted">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:shadow-primary-lg hover:opacity-95"
            >
              Открыть форму подбора лечения
            </button>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center font-display text-3xl font-bold text-text md:text-4xl">Как мы работаем</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-primary md:block" aria-hidden />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.step}
                  className="relative flex flex-col gap-4 md:flex-row md:gap-6"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center self-start rounded-full bg-primary font-display text-2xl font-bold text-white shadow-primary-md">
                    {item.step}
                  </div>
                  <div className="flex-1 rounded-2xl bg-white p-6 shadow-soft">
                    <h3 className="font-display text-xl font-semibold text-text">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-text md:text-4xl">
            Почему нам доверяют
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {proofItems.map((item, index) => (
              <motion.div
                key={item.title}
                className="rounded-2xl bg-elevated p-5 text-center shadow-soft"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="mb-3 text-4xl">{item.icon}</div>
                <div className="font-display text-lg font-semibold text-text">{item.title}</div>
                <div className="mt-1 text-xs text-muted">{item.description}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-center gap-8 rounded-3xl bg-surface p-10 shadow-soft md:flex-row">
            <div className="text-center">
              <div className="mb-4 text-6xl">📜</div>
              <h3 className="font-display text-xl font-semibold text-text">Лицензия Минздрава РФ</h3>
              <p className="mt-2 text-sm text-muted">Все врачи проходят ежегодную аттестацию</p>
            </div>
            <div className="text-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-white text-4xl shadow-soft">📱</div>
              <p className="mt-2 text-xs text-muted">Отсканируйте QR-код для проверки лицензий</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-surface px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-text md:text-4xl">Отзывы пациентов</h2>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            {cityFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setCityFilter(filter)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                  cityFilter === filter
                    ? "border-primary bg-primary text-white shadow-primary-sm"
                    : "border-primary/40 bg-white text-primary hover:bg-primary/20"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            className="pb-12"
          >
            {filteredReviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-soft">
                  <div>
                    <div className="mb-2 text-sm font-semibold text-primary">{review.city}</div>
                    <p className="text-sm text-muted">{review.text}</p>
                  </div>
                  <div className="mt-6 font-display text-base font-semibold text-text">{review.name}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA form #2 */}
      <section id="request" className="relative overflow-hidden px-4 py-20 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-700 to-primary/80" />
        <div className="relative mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-center font-display text-3xl font-bold text-white md:text-4xl drop-shadow-lg">
              Анонимная консультация
            </h2>
            <p className="mb-8 text-center text-white/90 drop-shadow">Ответим в течение 3 минут</p>
            <form onSubmit={handlePrimarySubmit} className="rounded-3xl bg-white p-8 shadow-2xl">
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ваше имя"
                  required
                  className="w-full rounded-lg border border-border px-4 py-3 text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
                <InputMask mask="+7 (999) 999-99-99" value={phone} onChange={(event) => setPhone(event.target.value)}>
                  {(inputProps: ComponentPropsWithoutRef<"input">) => (
                    <input
                      {...inputProps}
                      type="tel"
                      inputMode="tel"
                      placeholder="Телефон"
                      required
                      className="w-full rounded-lg border border-border px-4 py-3 text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-100"
                    />
                  )}
                </InputMask>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary px-6 py-4 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:shadow-primary-lg hover:opacity-95"
                >
                  Отправить заявку
                </button>
                <p className="text-center text-xs text-muted">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
                {primaryError && <p className="text-center text-sm text-red-500">{primaryError}</p>}
                {primaryMessage && <p className="text-center text-sm text-primary">{primaryMessage}</p>}
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="relative overflow-hidden px-4 py-20 lg:px-8">
        <div className="absolute inset-0 bg-text" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-block">
            <div className="animate-glow-tiffany rounded-full bg-primary/20 p-10">
              <div className="text-7xl">🔒</div>
            </div>
          </div>
          <h2 className="mb-6 font-display text-3xl font-bold text-white md:text-4xl">Гарантия анонимности</h2>
          <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 shadow-primary-lg">
            <span className="text-2xl">✓</span>
            <span className="font-display text-lg font-semibold text-white">Без постановки на учёт</span>
          </div>
          <p className="mx-auto max-w-3xl text-lg text-white/80">
            Мы работаем строго конфиденциально. Данные пациентов защищены, информация о лечении не передаётся на
            государственные ресурсы и страховые базы. Мы понимаем, насколько важна репутация и спокойствие вашей семьи.
          </p>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-text md:text-4xl">Контакты</h2>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-8">
              <div>
                <h3 className="mb-3 font-display text-2xl font-semibold text-text">Телефон</h3>
                <a
                  href="tel:+78000000000"
                  className="text-4xl font-bold text-primary transition-colors hover:text-primary-700"
                >
                  8 (800) 000-00-00
                </a>
                <p className="mt-2 text-sm text-muted">Звонок бесплатный по России</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/78000000000"
                  className="flex flex-1 min-w-[160px] items-center justify-center gap-2 rounded-lg border-2 border-green-500 bg-green-50 px-4 py-3 font-semibold text-green-600 transition-all hover:bg-green-500 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-xl">💬</span>
                  WhatsApp
                </a>
                <a
                  href="https://t.me/yourusername"
                  className="flex flex-1 min-w-[160px] items-center justify-center gap-2 rounded-lg border-2 border-blue-500 bg-blue-50 px-4 py-3 font-semibold text-blue-600 transition-all hover:bg-blue-500 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-xl">✈️</span>
                  Telegram
                </a>
              </div>
              <div className="rounded-2xl bg-primary/5 p-6">
                <h4 className="font-display text-lg font-semibold text-text">Адрес клиники</h4>
                <p className="mt-2 text-sm text-muted">г. Москва, ул. Примерная, д. 123</p>
                <a
                  href="https://yandex.ru/maps/?text=%D0%BD%D0%B0%D1%80%D0%BA%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F%20%D1%81%D0%BB%D1%83%D0%B6%D0%B1%D0%B0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-700"
                >
                  <span>📍</span>
                  Открыть в навигаторе
                </a>
              </div>
            </div>
            <div
              ref={mapRef}
              className="min-h-[360px] overflow-hidden rounded-2xl bg-elevated shadow-soft"
            >
              {mapVisible ? (
                <iframe
                  title="Карта проезда"
                  src="https://yandex.ru/map-widget/v1/?ll=37.620070%2C55.753630&z=11&mode=search&text=%D0%BD%D0%B0%D1%80%D0%BA%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C"
                  loading="lazy"
                  className="h-full w-full border-0"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="text-6xl">🗺️</div>
                  <p className="text-sm text-muted">Карта загрузится автоматически при просмотре блока</p>
                  <button
                    type="button"
                    onClick={() => setMapVisible(true)}
                    className="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                  >
                    Загрузить карту
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Popup after 30 seconds */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => {
                setShowPopup(false);
                setPopupError(null);
                setPopupMessage(null);
              }}
              className="absolute right-4 top-4 text-muted transition-colors hover:text-text"
              aria-label="Закрыть"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="mb-3 font-display text-2xl font-bold text-text">Нужна срочная помощь?</h3>
            <p className="mb-6 text-sm text-muted">
              Оставьте телефон — мы перезвоним и подскажем, какие действия предпринять прямо сейчас.
            </p>
            <form onSubmit={handlePopupSubmit} className="space-y-4">
              <input
                type="text"
                name="popupName"
                value={namePopup}
                onChange={(event) => setNamePopup(event.target.value)}
                placeholder="Ваше имя"
                required
                className="w-full rounded-lg border border-border px-4 py-3 text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <InputMask
                mask="+7 (999) 999-99-99"
                value={phonePopup}
                onChange={(event) => setPhonePopup(event.target.value)}
              >
                {(inputProps: ComponentPropsWithoutRef<"input">) => (
                  <input
                    {...inputProps}
                    type="tel"
                    inputMode="tel"
                    placeholder="Телефон"
                    required
                    className="w-full rounded-lg border border-border px-4 py-3 text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                )}
              </InputMask>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:shadow-primary-lg"
              >
                Перезвоните мне
              </button>
              {popupError && <p className="text-center text-sm text-red-500">{popupError}</p>}
              {popupMessage && <p className="text-center text-sm text-primary">{popupMessage}</p>}
            </form>
          </motion.div>
        </div>
      )}

      {/* Timer banner */}
      {showTimer && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-28 right-4 z-40 w-full max-w-xs rounded-2xl bg-primary p-5 text-white shadow-2xl md:bottom-8"
        >
          <button
            type="button"
            onClick={() => setShowTimer(false)}
            className="absolute right-3 top-3 text-white/80 transition-colors hover:text-white"
            aria-label="Закрыть"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-start gap-3">
            <div className="text-3xl">🚑</div>
            <div>
              <h4 className="font-display text-lg font-semibold">Бригада готова выехать</h4>
              <p className="mt-1 text-sm text-white/90">Оставьте заявку — мы перезвоним в течение 3 минут</p>
              <a
                href="#request"
                onClick={() => setShowTimer(false)}
                className="mt-3 inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-gray-100"
              >
                Оставить заявку
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setModalError(null);
                setModalMessage(null);
              }}
              className="absolute right-4 top-4 text-muted transition-colors hover:text-text"
              aria-label="Закрыть"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="mb-4 font-display text-2xl font-bold text-text">Подбор индивидуального лечения</h3>
            <p className="mb-6 text-sm text-muted">
              Ответьте на несколько вопросов — мы подготовим персональный план помощи и подскажем, какие меры принять
              прямо сейчас.
            </p>
            <ul className="mb-6 grid gap-2 text-sm text-muted">
              {modalBenefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <span className="text-lg text-primary">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <input
                type="text"
                name="modalName"
                value={modalName}
                onChange={(event) => setModalName(event.target.value)}
                placeholder="Ваше имя"
                required
                className="w-full rounded-lg border border-border px-4 py-3 text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <InputMask
                mask="+7 (999) 999-99-99"
                value={modalPhone}
                onChange={(event) => setModalPhone(event.target.value)}
              >
                {(inputProps: ComponentPropsWithoutRef<"input">) => (
                  <input
                    {...inputProps}
                    type="tel"
                    inputMode="tel"
                    placeholder="Телефон"
                    required
                    className="w-full rounded-lg border border-border px-4 py-3 text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                )}
              </InputMask>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:shadow-primary-lg"
              >
                Получить план
              </button>
              {modalError && <p className="text-center text-sm text-red-500">{modalError}</p>}
              {modalMessage && <p className="text-center text-sm text-primary">{modalMessage}</p>}
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
