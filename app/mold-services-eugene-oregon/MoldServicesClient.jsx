'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import CountUp from 'react-countup';
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Award,
  BadgeCheck,
  Star,
  FileCheck,
  Search,
  Sparkles,
  Droplets,
  Wind,
  Home,
  ClipboardCheck,
  ScanLine,
  ShieldHalf,
  Trash2,
  Hammer,
  AlertTriangle,
  Clock,
  MapPin,
  Quote,
} from 'lucide-react';

import LeadForm from '@/Components/LeadForm';
import UrgencyBadge from '@/Components/UrgencyBadge';
import StickyMobileCTA from '@/Components/StickyMobileCTA';
import FAQ from '@/Components/FAQ';

const PHONE = '541-988-9823';
const PHONE_HREF = 'tel:541-988-9823';

const trustStats = [
  { value: 25, suffix: '+', label: 'Years in Business', icon: Award },
  { value: 500, suffix: '+', label: 'Properties Restored', icon: Home },
  { value: 1, suffix: 'hr', label: 'Callback Window', icon: Clock, prefix: '<' },
  { value: 100, suffix: '%', label: 'EPA Certified', icon: ShieldCheck },
];

const trustSignals = [
  { icon: BadgeCheck, label: 'IICRC Certified' },
  { icon: ShieldCheck, label: 'Licensed & Insured' },
  { icon: Award, label: 'Oregon State Certified' },
  { icon: Star, label: '5-Star Rated' },
  { icon: FileCheck, label: 'Free Estimates' },
];

const healthRisks = [
  'Respiratory issues, asthma triggers, and chronic coughs',
  'Toxic black mold (Stachybotrys chartarum) exposure',
  'Long-term structural and drywall damage',
  'Reduced property value at sale or appraisal',
  'Allergic reactions, headaches, and fatigue',
  'Insurance claim complications if delayed',
];

const services = [
  { icon: Search, title: 'Mold Testing & Inspection', desc: 'Visual assessments, air sampling, and lab analysis to identify mold species and concentration.' },
  { icon: Sparkles, title: 'Professional Mold Removal', desc: 'EPA-approved containment, HEPA filtration, and antimicrobial treatment.' },
  { icon: Droplets, title: 'Water Damage Restoration', desc: 'Source identification, drying, and structural repair after leaks or floods.' },
  { icon: Wind, title: 'Air Quality Testing', desc: 'Pre- and post-remediation air sampling with detailed lab documentation.' },
  { icon: Home, title: 'Crawl Space Remediation', desc: 'Vapor barriers, moisture control, and complete crawl-space mold treatment.' },
  { icon: ClipboardCheck, title: 'Post-Remediation Verification', desc: 'Independent clearance testing and certificates for insurance and resale.' },
];

const processSteps = [
  { icon: ScanLine, title: 'Inspect', desc: 'Free on-site visual inspection. We map moisture, identify visible growth, and find the source.' },
  { icon: ShieldHalf, title: 'Contain', desc: 'Negative-air containment and HEPA filtration prevent cross-contamination during work.' },
  { icon: Trash2, title: 'Remove', desc: 'EPA-approved methods. We remove affected materials and treat surfaces with antimicrobials.' },
  { icon: Hammer, title: 'Restore', desc: 'Structural repair, dehumidification, and moisture-source mitigation so it doesn\'t come back.' },
  { icon: BadgeCheck, title: 'Certify', desc: 'Independent post-remediation verification testing and clearance documentation.' },
];

const testimonials = [
  {
    quote: 'They found mold in our basement that two other companies missed. Thorough, professional, and they explained everything along the way.',
    name: 'Sarah M.',
    location: 'South Hills, Eugene',
  },
  {
    quote: 'After a slab leak we were panicking. Their team showed up the same afternoon, sealed off the area, and walked us through what insurance would cover.',
    name: 'Mike R.',
    location: 'Springfield',
  },
  {
    quote: 'Worked directly with our insurance and made the entire process stress-free. Air quality test results came back perfect after they finished.',
    name: 'Jennifer K.',
    location: 'Cottage Grove',
  },
];

const faqs = [
  { question: 'How much does mold remediation cost in Eugene, Oregon?', answer: 'Mold remediation in Eugene typically ranges from $500 for small isolated patches to $6,000+ for whole-home contamination. Most Lane County homes fall between $1,500 and $3,500. The exact cost depends on affected square footage, mold type (black mold/Stachybotrys is more involved), the moisture source, and whether containment, HVAC cleaning, or drywall replacement is required. We offer free inspections and itemized estimates — call 541-988-9823.' },
  { question: 'Does homeowners insurance cover mold remediation in Oregon?', answer: 'Sometimes. Most Oregon policies cover mold only when it results from a covered peril — for example, a sudden burst pipe. Mold from long-term humidity, deferred maintenance, or flooding is typically excluded. We work directly with major insurers and can help document your claim.' },
  { question: 'How quickly can you respond?', answer: 'For Eugene-Springfield and Lane County, we offer same-day response for most emergencies. Submit the form or call 541-988-9823 — we promise a callback within one hour during business hours.' },
  { question: 'Is the inspection really free?', answer: 'Yes. The initial visual mold inspection in Eugene-Springfield and Lane County is free. If lab testing (air quality or surface samples) is required, that is quoted separately before we proceed.' },
  { question: 'How long does mold remediation take?', answer: 'Most residential projects in Lane County take 1 to 5 days. Small isolated jobs can finish in a single day; whole-home or black mold projects with extensive containment and material removal can run a week or longer.' },
  { question: 'Are mold spores really a health risk?', answer: 'For sensitive individuals — children, elderly, immunocompromised, asthma sufferers — yes. Even non-sensitive adults can develop respiratory issues with prolonged exposure. Stachybotrys (black mold) produces mycotoxins that warrant prompt remediation regardless of household composition.' },
];

/* -------------------- Section Components -------------------- */

function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], ['0%', '25%']);
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-slate-950 text-white"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/img/hero-hazmat-tech.jpg"
          alt="Mold remediation technician in protective equipment"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-950/95 via-slate-900/85 to-slate-950/95" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

      {/* Urgency badge top-right */}
      <div className="absolute top-6 right-6 z-30 hidden sm:block">
        <UrgencyBadge />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-24 md:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xs uppercase tracking-[0.25em] font-semibold text-red-500"
          >
            Eugene • Springfield • Lane County
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="fjalla-one mt-4 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-7xl"
          >
            Eugene's Trusted Mold Remediation Experts
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 max-w-xl text-lg text-slate-300 md:text-xl"
          >
            Fast response. Certified technicians. Safe for your family.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href={PHONE_HREF}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-4 font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-500 hover:shadow-red-600/40 active:scale-95"
            >
              <Phone className="h-5 w-5" />
              <span className="fjalla-one text-lg">Call Now: {PHONE}</span>
            </Link>
            <Link
              href="#lead-form"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
            >
              <span className="fjalla-one text-lg">Get a Free Inspection</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300"
          >
            {trustSignals.map((t) => (
              <div key={t.label} className="flex items-center gap-2">
                <t.icon className="h-4 w-4 text-red-500" />
                <span>{t.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Mobile urgency badge */}
          <div className="mt-8 sm:hidden">
            <UrgencyBadge />
          </div>
        </div>

        {/* Lead form right column */}
        <div className="lg:col-span-5">
          <LeadForm source="mold-eugene-hero" compact />
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="relative border-y border-white/10 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-8">
          {trustStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <stat.icon className="mx-auto h-8 w-8 text-red-500" />
              <p className="fjalla-one mt-3 text-4xl font-bold text-white md:text-5xl">
                {stat.prefix}
                <CountUpInView end={stat.value} />
                <span className="text-red-500">{stat.suffix}</span>
              </p>
              <p className="mt-2 text-sm uppercase tracking-wider text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUpInView({ end }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return <span ref={ref}>{inView ? <CountUp end={end} duration={2} /> : 0}</span>;
}

function ProblemSection() {
  return (
    <section className="relative bg-slate-950 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:px-8 lg:grid-cols-2">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-red-500/20 shadow-2xl"
        >
          <Image
            src="/img/mold-damage.jpg"
            alt="Mold and water damage on a wall"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-red-900/40 to-slate-950/60 mix-blend-multiply" />
          <div className="absolute inset-0 ring-1 ring-inset ring-red-500/30" />
        </motion.div>

        {/* Bullets */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] font-semibold text-red-400"
          >
            Why It Matters
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="fjalla-one mt-3 text-4xl text-white md:text-5xl"
          >
            Untreated mold puts your family at risk
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-300"
          >
            Eugene's wet climate accelerates mold growth. The longer it sits, the worse it gets — for your home and the people in it.
          </motion.p>

          <ul className="mt-8 space-y-3">
            {healthRisks.map((risk, i) => (
              <motion.li
                key={risk}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-start gap-3"
              >
                <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-red-400" />
                <span className="text-slate-200">{risk}</span>
              </motion.li>
            ))}
          </ul>

          <Link
            href="#services"
            className="mt-10 inline-flex items-center gap-2 text-red-500 hover:text-emerald-300 group"
          >
            <span className="fjalla-one text-lg">See how we help</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section id="services" className="relative bg-slate-900 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] font-semibold text-red-500"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="fjalla-one mt-3 text-4xl text-white md:text-5xl"
          >
            Complete mold solutions, end to end
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-400"
          >
            From the first call to final clearance testing — we handle every step in-house.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-colors hover:border-red-500/40 hover:bg-white/[0.07]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-600/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/15 ring-1 ring-red-500/30">
                <s.icon className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="fjalla-one mt-5 text-xl text-white md:text-2xl">{s.title}</h3>
              <p className="mt-3 text-slate-400">{s.desc}</p>

              <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-red-500 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 30%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={sectionRef} className="relative bg-slate-950 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] font-semibold text-red-500"
          >
            Our Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="fjalla-one mt-3 text-4xl text-white md:text-5xl"
          >
            Inspect. Contain. Remove. Restore. Certify.
          </motion.h2>
        </div>

        <div className="relative mt-20">
          {/* Static rail */}
          <div
            aria-hidden
            className="absolute left-7 top-0 bottom-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2"
          />
          {/* Animated progress rail */}
          <motion.div
            aria-hidden
            style={{ height: lineHeight }}
            className="absolute left-7 top-0 w-px bg-gradient-to-b from-red-500 to-red-600 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-12">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
                className={`relative grid items-center gap-6 md:grid-cols-2 ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Number/icon node */}
                <div className="absolute left-7 top-2 z-10 -translate-x-1/2 md:left-1/2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-500/40 bg-slate-950 shadow-[0_0_30px_rgba(220,38,38,0.25)]">
                    <step.icon className="h-6 w-6 text-red-500" />
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`ml-20 md:ml-0 ${
                    i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold text-red-500">
                    Step {i + 1}
                  </p>
                  <h3 className="fjalla-one mt-2 text-2xl text-white md:text-3xl">{step.title}</h3>
                  <p className="mt-3 text-slate-400">{step.desc}</p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] font-semibold text-red-500"
          >
            What Eugene Says
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="fjalla-one mt-3 text-4xl text-white md:text-5xl"
          >
            Real homeowners. Real results.
          </motion.h2>
        </div>

        <div className="relative mt-12 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-slate-950/40 p-8 backdrop-blur-md md:p-12"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <Quote className="mt-6 h-8 w-8 text-red-500/40" />
              <blockquote className="mt-3 text-xl leading-relaxed text-slate-200 md:text-2xl">
                {testimonials[idx].quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-600 to-red-700" />
                <div>
                  <p className="font-semibold text-white">{testimonials[idx].name}</p>
                  <p className="flex items-center gap-1 text-slate-400">
                    <MapPin className="h-3.5 w-3.5" />
                    {testimonials[idx].location}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? 'w-8 bg-red-500' : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadFormSection() {
  return (
    <section id="lead-form" className="relative bg-slate-950 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-4 md:px-8 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-red-500">
            Free Inspection
          </p>
          <h2 className="fjalla-one mt-3 text-4xl text-white md:text-5xl">
            Tell us what's going on.<br />We'll call you in under an hour.
          </h2>
          <p className="mt-6 text-lg text-slate-300">
            Same-day response across Eugene, Springfield, and Lane County.
            One of our certified team members will discuss your situation,
            walk you through next steps, and schedule the free on-site
            inspection.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-start gap-3 text-slate-300">
              <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" />
              <span>EPA-certified, IICRC-trained technicians on every job</span>
            </div>
            <div className="flex items-start gap-3 text-slate-300">
              <FileCheck className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" />
              <span>We work directly with your insurance carrier</span>
            </div>
            <div className="flex items-start gap-3 text-slate-300">
              <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" />
              <span>Callback promised within 1 hour during business hours</span>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-red-600/20 bg-red-600/5 p-5">
            <p className="text-sm text-slate-300">Prefer to talk now?</p>
            <Link
              href={PHONE_HREF}
              className="mt-1 inline-flex items-center gap-2 fjalla-one text-2xl text-red-500 hover:text-red-400 md:text-3xl"
            >
              <Phone className="h-6 w-6" />
              {PHONE}
            </Link>
          </div>
        </div>

        <div>
          <LeadForm source="mold-eugene-form-section" />
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="relative bg-slate-900 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-red-500">
            Common Questions
          </p>
          <h2 className="fjalla-one mt-3 text-4xl text-white md:text-5xl">
            Eugene homeowner FAQ
          </h2>
        </div>
        <div className="mt-12">
          {/* FAQ component is light-themed; wrap in card for contrast */}
          <div className="rounded-3xl bg-white p-2 md:p-6">
            <FAQ faqData={faqs} title="Mold Remediation in Eugene" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.18),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="fjalla-one text-4xl text-white md:text-6xl"
        >
          Don't wait. Mold gets worse — and more expensive — every day.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 md:text-xl"
        >
          Free inspection. No pressure. Just answers from Eugene's most experienced mold team.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-bold text-white shadow-xl shadow-red-600/20 transition-all hover:bg-red-500 active:scale-95"
          >
            <Phone className="h-5 w-5" />
            <span className="fjalla-one text-lg">Call {PHONE}</span>
          </Link>
          <Link
            href="#lead-form"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
          >
            <span className="fjalla-one text-lg">Get Free Inspection</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- Page Composition -------------------- */

export default function MoldServicesClient() {
  return (
    <main className="bg-slate-950">
      <Hero />
      <TrustBar />
      <ProblemSection />
      <ServicesGrid />
      <ProcessSection />
      <Testimonials />
      <LeadFormSection />
      <FAQSection />
      <FinalCTA />
      <StickyMobileCTA phone={PHONE} formAnchor="#lead-form" />
    </main>
  );
}
