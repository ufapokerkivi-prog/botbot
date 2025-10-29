"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function DangerStats() {
  return (
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
          Каждый день от последствий алкоголя умирает более 200 человек. Зависимость разрушает не
          только тело, но и жизнь близких. Не ждите, пока станет поздно — вызовите врача и
          остановите цепочку последствий уже сегодня.
        </p>
      </div>
    </section>
  );
}
