"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { IMaskInput } from "react-imask";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const services = [
  {
    id: 1,
    title: "Вывод из запоя",
    price: "от 2,900 ₽",
    icon: "💉",
    description: "Капельницы, детоксикация и круглосуточный контроль состояния.",
  },
  {
    id: 2,
    title: "Снятие похмелья",
    price: "от 2,000 ₽",
    icon: "🧪",
    description: "Комплекс витаминов, поддержка сердца и нервной системы.",
  },
  {
    id: 3,
    title: "Кодирование",
    price: "от 4,900 ₽",
    icon: "🛡️",
    description: "Лицензированные методики кодирования с психологической поддержкой.",
  },
];

const supportHighlights = ["Анонимно", "Выезжаем на дом", "Бригада приедет за 30 минут"];

const helpFeatures = [
  { icon: "⏱️", title: "Быстрый выезд 24/7" },
  { icon: "🔒", title: "Без постановки на учёт" },
  { icon: "💊", title: "Сертифицированные препараты" },
  { icon: "👨‍⚕️", title: "Врачи со стажем 10+ лет" },
];

const reviews = [
  {
    id: 1,
    city: "Москва",
    name: "Андрей",
    rating: 5,
    text: "Спасибо за оперативность! Приехали за 25 минут, хотя обещали 30. Врач вежливый, всё объяснил.",
  },
  {
    id: 2,
    city: "СПБ",
    name: "Елена",
    rating: 5,
    text: "Очень благодарна за деликатность и профессионализм. Помогли без лишних вопросов.",
  },
  {
    id: 3,
    city: "Казань",
    name: "Игорь",
    rating: 5,
    text: "Доступные цены, качественное обслуживание. Рекомендую!",
  },
  {
    id: 4,
    city: "Москва",
    name: "Мария",
    rating: 5,
    text: "Бригада приехала ночью, всё прошло анонимно и спокойно. Теперь доверяем только вам.",
  },
  {
    id: 5,
    city: "СПБ",
    name: "Владимир",
    rating: 5,
    text: "Отличная служба! Объяснили каждый шаг лечения и поддерживали после процедуры.",
  },
  {
    id: 6,
    city: "Казань",
    name: "Ольга",
    rating: 5,
    text: "Важно было сохранить конфиденциальность, и вы справились на 100%. Спасибо!",
  },
  {
    id: 7,
    city: "Москва",
    name: "Сергей",
    rating: 5,
    text: "Приехали быстро, привезли все препараты. Состояние улучшилось уже через час.",
  },
  {
    id: 8,
    city: "СПБ",
    name: "Наталья",
    rating: 5,
    text: "Очень чуткие специалисты. Ответили на все вопросы и помогли всей семье успокоиться.",
  },
  {
    id: 9,
    city: "Казань",
    name: "Дмитрий",
    rating: 5,
    text: "Чёткая организация, никаких задержек. Чувствуется профессионализм команды.",
  },
  {
    id: 10,
    city: "Москва",
    name: "Анна",
    rating: 5,
    text: "Поддержка 24/7 — это правда. Врач был на связи, пока состояние полностью не стабилизировалось.",
  },
];

const trustProofItems = [
  { icon: "🚑", title: "Выезд за 30 минут" },
  { icon: "🤫", title: "100% анонимно" },
  { icon: "💊", title: "Сертифицированные препараты" },
  { icon: "💰", title: "Доступные цены" },
  { icon: "👨‍⚕️", title: "Врачи с опытом 10+ лет" },
  { icon: "☎️", title: "Поддержка 24/7" },
];

const timelineSteps = [
  {
    step: "1",
    title: "Заявка",
    description: "Оставьте заявку на сайте или позвоните нам",
  },
  {
    step: "2",
    title: "Звонок врача",
    description: "Врач связывается, чтобы уточнить состояние и подобрать помощь",
  },
  {
    step: "3",
    title: "Выезд и помощь",
    description: "Бригада приезжает на дом и проводит процедуры",
  },
  {
    step: "4",
    title: "Поддержка и контроль",
    description: "Остаёмся на связи и контролируем восстановление",
  },
];

const modalBenefits = [
  "Персональный план восстановления",
  "Рекомендации по капельницам и препаратам",
  "Контроль состояния до полного стабилизирования",
  "Поддержка врача в течение 24 часов",
];

const cityFilters = ["Все", "Москва", "СПБ", "Казань"] as const;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Введите ваше имя"),
  phone: z
    .string()
    .trim()
    .min(1, "Укажите номер телефона")
    .refine((value) => normalizePhone(value).length === 11, "Заполните номер полностью"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const DynamicDangerStats = dynamic(() => import("@/components/DangerStats"), {
  ssr: false,
});

const DynamicContactMap = dynamic(() => import("@/components/ContactMap"), {
  ssr: false,
});

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export default function HomePage() {
  const [cityFilter, setCityFilter] = useState<(typeof cityFilters)[number]>("Все");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [primaryMessage, setPrimaryMessage] = useState<string | null>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });

  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const requestForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "" },
  });

  const popupForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "" },
  });

  const modalForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "" },
  });

  const { scrollYProgress } = useScroll({
    target: heroImageRef,
    offset: ["start end", "end start"],
  });

  const heroParallax = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  useEffect(() => {
    let animationFrame: number | null = null;
    const handleMouseMove = (event: MouseEvent) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      animationFrame = requestAnimationFrame(() => {
        setCursorPosition({
          x: (event.clientX / window.innerWidth) * 100,
          y: (event.clientY / window.innerHeight) * 100,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const popupTimer = setTimeout(() => setShowPopup(true), 30_000);
    return () => clearTimeout(popupTimer);
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    setShowTimer(false);
    inactivityTimerRef.current = setTimeout(() => setShowTimer(true), 15 * 60 * 1000);
  }, []);

  useEffect(() => {
    const events: (keyof WindowEventMap)[] = ["mousemove", "keydown", "scroll", "touchstart"];

    const startTimer = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      inactivityTimerRef.current = setTimeout(() => setShowTimer(true), 15 * 60 * 1000);
    };

    events.forEach((event) => window.addEventListener(event, resetInactivityTimer));
    startTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [resetInactivityTimer]);

  const filteredReviews = useMemo(() => {
    if (cityFilter === "Все") {
      return reviews;
    }
    return reviews.filter((review) => review.city === cityFilter);
  }, [cityFilter]);

  const handleRequestSubmit = requestForm.handleSubmit(() => {
    setPrimaryMessage("Заявка отправлена! Мы свяжемся с вами в течение 3 минут.");
    requestForm.reset();
  });

  const handlePopupSubmit = popupForm.handleSubmit(() => {
    setPopupMessage("Готово! Врач перезвонит в течение 1 минуты.");
    popupForm.reset();
  });

  const handleModalSubmit = modalForm.handleSubmit(() => {
    setModalMessage("План лечения подготовлен! Мы свяжемся в течение 3 минут.");
    modalForm.reset();
  });

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage(null);
    popupForm.reset();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage(null);
    modalForm.reset();
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

      <section
        id="hero"
        className="relative overflow-hidden px-4 pb-20 pt-24 md:pb-28 md:pt-28 lg:px-8"
      >
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-br from-primary/5 via-primary/15 to-primary/5" />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-primary/10 to-white" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-white/80 px-4 py-2 text-sm font-semibold text-primary backdrop-blur">
              <span className="text-base">⚡</span>
              Дежурная бригада готова к выезду
            </p>
            <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight text-text md:text-5xl lg:text-6xl">
              ВЫЗОВ НАРКОЛОГА НА ДОМ ЗА 30 МИНУТ — КРУГЛОСУТОЧНО И АНОНИМНО
            </h1>
            <p className="mb-8 max-w-xl text-lg text-text md:text-xl">
              Вывод из запоя, снятие похмелья и кодирование. Частная скорая помощь 24/7
            </p>
            <div className="mb-8 flex flex-wrap gap-3">
              {supportHighlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-text shadow-soft backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="tel:+78000000000"
                className="animate-pulse-soft inline-flex min-h-[52px] items-center justify-center rounded-lg bg-primary px-8 py-4 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:shadow-primary-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Вызвать врача сейчас
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex min-h-[52px] items-center justify-center rounded-lg border-2 border-primary bg-white px-8 py-4 font-display text-base font-semibold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-primary-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Получить консультацию бесплатно
              </button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/85 p-5 text-center shadow-soft backdrop-blur">
                <div className="text-3xl font-bold text-primary">
                  <CountUp end={24} suffix="/7" duration={2.4} />
                </div>
                <p className="text-sm text-muted">Работаем без выходных</p>
              </div>
              <div className="rounded-2xl bg-white/85 p-5 text-center shadow-soft backdrop-blur">
                <div className="text-3xl font-bold text-primary">
                  <CountUp end={30} suffix=" мин" duration={2.4} />
                </div>
                <p className="text-sm text-muted">Среднее время приезда</p>
              </div>
              <div className="rounded-2xl bg-white/85 p-5 text-center shadow-soft backdrop-blur">
                <div className="text-3xl font-bold text-primary">100%</div>
                <p className="text-sm text-muted">Гарантия анонимности</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={heroImageRef}
            style={{ y: heroParallax }}
            className="relative w-full max-w-xl self-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-primary/15 blur-3xl"
              aria-hidden
            />
            <div
              className="absolute -right-8 -bottom-12 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[36px] shadow-2xl">
              <div className="aspect-[3/4] w-full bg-gradient-to-br from-primary/25 via-primary/10 to-primary/5" />
              <div className="absolute inset-0 bg-gradient-to-t from-text/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/85 p-4 shadow-soft backdrop-blur">
                <p className="font-display text-lg font-semibold text-text">
                  Команда уже готовится к выезду
                </p>
                <p className="text-sm text-muted">Мы будем у вас через 30 минут после заявки</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
                className="group flex h-full flex-col rounded-2xl bg-elevated p-6 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-primary-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-4xl transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  {service.icon}
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold text-text">
                  {service.title}
                </h3>
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
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-4xl">
                      {service.icon}
                    </div>
                    <h3 className="mb-2 font-display text-xl font-semibold text-text">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-2xl font-bold text-primary">{service.price}</p>
                    <p className="text-sm text-muted">{service.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <DynamicDangerStats />

      <section id="help" className="relative overflow-hidden px-4 py-20 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-primary/10 to-white" />
        <div className="relative mx-auto max-w-7xl rounded-3xl bg-white/85 p-10 shadow-soft backdrop-blur">
          <motion.h2
            className="text-center font-display text-3xl font-bold text-text md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Выход есть. Мы восстанавливаем здоровье и трезвость за 1 день.
          </motion.h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base text-muted">
            Команда врачей-наркологов и реаниматологов приезжает с полным набором препаратов и
            оборудования, чтобы стабилизировать состояние и обеспечить поддержку пациенту и его
            близким.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {helpFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="rounded-2xl bg-elevated p-6 text-center shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="font-display text-lg font-semibold text-text">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:shadow-primary-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              Открыть форму подбора лечения
            </button>
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-surface px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            className="mb-12 text-center font-display text-3xl font-bold text-text md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Отзывы пациентов
          </motion.h2>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            {cityFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setCityFilter(filter)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                  cityFilter === filter
                    ? "border-primary bg-primary text-white shadow-primary-sm"
                    : "border-primary/40 bg-white text-primary hover:bg-primary/10"
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
                    <p className="mb-4 text-sm text-muted">{review.text}</p>
                  </div>
                  <div>
                    <div
                      className="mb-2 flex items-center gap-1 text-primary"
                      aria-label={`Оценка ${review.rating} из 5`}
                    >
                      {Array.from({ length: review.rating }).map((_, starIndex) => (
                        <span key={starIndex}>⭐</span>
                      ))}
                    </div>
                    <div className="font-display text-base font-semibold text-text">
                      {review.name}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            className="mb-12 text-center font-display text-3xl font-bold text-text md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Почему нам доверяют
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {trustProofItems.map((item, index) => (
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
              </motion.div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-center gap-8 rounded-3xl bg-surface p-10 shadow-soft md:flex-row">
            <div className="text-center">
              <div className="mb-4 text-6xl">📜</div>
              <h3 className="font-display text-xl font-semibold text-text">
                Лицензия Минздрава РФ
              </h3>
              <p className="mt-2 text-sm text-muted">
                Работаем официально и соблюдаем все стандарты лечения
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-white text-4xl shadow-soft">
                📱
              </div>
              <p className="mt-2 text-xs text-muted">
                Отсканируйте QR-код, чтобы проверить подлинность лицензии
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="request" className="relative overflow-hidden px-4 py-20 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary-700" />
        <div className="relative mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-center font-display text-3xl font-bold text-white md:text-4xl drop-shadow">
              Не рискуйте здоровьем! Оставьте заявку прямо сейчас — врач уже готов выехать.
            </h2>
            <p className="mb-8 text-center text-white/90">Анонимно. Ответим в течение 3 минут.</p>
            <form onSubmit={handleRequestSubmit} className="rounded-3xl bg-white p-8 shadow-2xl">
              <div className="space-y-4">
                <div>
                  <input
                    {...requestForm.register("name")}
                    type="text"
                    aria-invalid={Boolean(requestForm.formState.errors.name)}
                    placeholder="Ваше имя"
                    className="w-full rounded-lg border border-border px-4 py-3 text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  {requestForm.formState.errors.name && (
                    <p className="mt-2 text-sm text-red-500">
                      {requestForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Controller
                    name="phone"
                    control={requestForm.control}
                    render={({ field }) => (
                      <IMaskInput
                        mask="+7 (000) 000-00-00"
                        value={field.value ?? ""}
                        onAccept={(value: string | undefined) => field.onChange(value ?? "")}
                        onBlur={field.onBlur}
                        inputRef={field.ref}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="Телефон"
                        className="w-full rounded-lg border border-border px-4 py-3 text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        aria-invalid={Boolean(requestForm.formState.errors.phone)}
                      />
                    )}
                  />
                  {requestForm.formState.errors.phone && (
                    <p className="mt-2 text-sm text-red-500">
                      {requestForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="animate-vibrate w-full rounded-lg bg-primary px-6 py-4 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:shadow-primary-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  Отправить заявку
                </button>
                {primaryMessage && (
                  <p className="text-center text-sm text-primary">{primaryMessage}</p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <section id="contacts" className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            className="mb-12 text-center font-display text-3xl font-bold text-text md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Контакты
          </motion.h2>
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
                  className="flex min-w-[160px] flex-1 items-center justify-center gap-2 rounded-lg border-2 border-green-500 bg-green-50 px-4 py-3 font-semibold text-green-600 transition-all hover:bg-green-500 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-xl">💬</span>
                  WhatsApp
                </a>
                <a
                  href="https://t.me/yourusername"
                  className="flex min-w-[160px] flex-1 items-center justify-center gap-2 rounded-lg border-2 border-blue-500 bg-blue-50 px-4 py-3 font-semibold text-blue-600 transition-all hover:bg-blue-500 hover:text-white"
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
                  href="https://yandex.ru/maps/?text=%D0%BD%D0%B0%D1%80%D0%BA%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-700"
                >
                  <span>📍</span>
                  Открыть в навигаторе
                </a>
              </div>
            </div>
            <DynamicContactMap />
          </div>
        </div>
      </section>

      <section className="bg-surface px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            className="mb-16 text-center font-display text-3xl font-bold text-text md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Как мы работаем
          </motion.h2>
          <div className="relative">
            <div
              className="absolute left-8 top-0 hidden h-full w-0.5 bg-primary md:block"
              aria-hidden
            />
            <div className="space-y-8">
              {timelineSteps.map((item, index) => (
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

      <section className="relative overflow-hidden px-4 py-20 lg:px-8">
        <div className="absolute inset-0 bg-text" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center text-white">
          <div className="mb-8 inline-block">
            <div className="animate-glow-tiffany rounded-full bg-primary/25 p-10">
              <div className="text-7xl">🔒</div>
            </div>
          </div>
          <h2 className="mb-6 font-display text-3xl font-bold text-white md:text-4xl">
            Гарантия анонимности
          </h2>
          <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 shadow-primary-lg">
            <span className="text-2xl">✓</span>
            <span className="font-display text-lg font-semibold text-white">
              Без постановки на учёт
            </span>
          </div>
          <p className="mx-auto max-w-3xl text-lg text-white/85">
            Мы защищаем ваши данные. Конфиденциальность — наш главный принцип.
          </p>
        </div>
      </section>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={closePopup}
              className="absolute right-4 top-4 text-muted transition-colors hover:text-text"
              aria-label="Закрыть"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="mb-3 font-display text-2xl font-bold text-text">
              Нужна помощь прямо сейчас? Оставьте номер, врач перезвонит за 1 минуту
            </h3>
            <p className="mb-6 text-sm text-muted">
              Заполните форму — мы готовы подсказать, что делать в первые минуты.
            </p>
            <form onSubmit={handlePopupSubmit} className="space-y-4">
              <div>
                <input
                  {...popupForm.register("name")}
                  type="text"
                  aria-invalid={Boolean(popupForm.formState.errors.name)}
                  placeholder="Ваше имя"
                  className="w-full rounded-lg border border-border px-4 py-3 text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {popupForm.formState.errors.name && (
                  <p className="mt-2 text-sm text-red-500">
                    {popupForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Controller
                  name="phone"
                  control={popupForm.control}
                  render={({ field }) => (
                    <IMaskInput
                      mask="+7 (000) 000-00-00"
                      value={field.value ?? ""}
                      onAccept={(value: string | undefined) => field.onChange(value ?? "")}
                      onBlur={field.onBlur}
                      inputRef={field.ref}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="Телефон"
                      className="w-full rounded-lg border border-border px-4 py-3 text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      aria-invalid={Boolean(popupForm.formState.errors.phone)}
                    />
                  )}
                />
                {popupForm.formState.errors.phone && (
                  <p className="mt-2 text-sm text-red-500">
                    {popupForm.formState.errors.phone.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:shadow-primary-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Перезвоните мне
              </button>
              {popupMessage && <p className="text-center text-sm text-primary">{popupMessage}</p>}
            </form>
          </motion.div>
        </div>
      )}

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
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-start gap-3">
            <div className="text-3xl">🚑</div>
            <div>
              <h4 className="font-display text-lg font-semibold">
                Бригада готова выехать через 15 минут — оставьте заявку!
              </h4>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 text-muted transition-colors hover:text-text"
              aria-label="Закрыть"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="mb-4 font-display text-2xl font-bold text-text">
              Подбор индивидуального лечения
            </h3>
            <p className="mb-6 text-sm text-muted">
              Расскажите о ситуации — врач подготовит персональный план и расскажет, какие шаги
              важны в первую очередь.
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
              <div>
                <input
                  {...modalForm.register("name")}
                  type="text"
                  aria-invalid={Boolean(modalForm.formState.errors.name)}
                  placeholder="Ваше имя"
                  className="w-full rounded-lg border border-border px-4 py-3 text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {modalForm.formState.errors.name && (
                  <p className="mt-2 text-sm text-red-500">
                    {modalForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Controller
                  name="phone"
                  control={modalForm.control}
                  render={({ field }) => (
                    <IMaskInput
                      mask="+7 (000) 000-00-00"
                      value={field.value ?? ""}
                      onAccept={(value: string | undefined) => field.onChange(value ?? "")}
                      onBlur={field.onBlur}
                      inputRef={field.ref}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="Телефон"
                      className="w-full rounded-lg border border-border px-4 py-3 text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      aria-invalid={Boolean(modalForm.formState.errors.phone)}
                    />
                  )}
                />
                {modalForm.formState.errors.phone && (
                  <p className="mt-2 text-sm text-red-500">
                    {modalForm.formState.errors.phone.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:shadow-primary-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Получить план
              </button>
              {modalMessage && <p className="text-center text-sm text-primary">{modalMessage}</p>}
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
