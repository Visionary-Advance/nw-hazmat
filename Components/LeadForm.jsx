'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const SITUATIONS = [
  { value: 'suspected', label: 'I suspect mold but haven\'t confirmed it' },
  { value: 'visible', label: 'I can see visible mold' },
  { value: 'post_leak', label: 'After a leak or water damage' },
  { value: 'health', label: 'Family is having allergic / respiratory symptoms' },
  { value: 'inspection', label: 'Pre-purchase inspection / real estate' },
  { value: 'other', label: 'Other / not sure' },
];

export default function LeadForm({ source = 'mold-services-eugene-oregon', compact = false }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [form, setForm] = useState({ name: '', phone: '', email: '', situation: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      setStatus('error');
      setErrorMsg('Form not ready. Refresh and try again.');
      return;
    }
    setStatus('loading');
    try {
      const recaptchaToken = await executeRecaptcha('lead_form');
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source, recaptchaToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please call us instead.');
        return;
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please call 541-988-9823.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-red-500/40 bg-red-600/10 p-8 text-center backdrop-blur-md"
      >
        <CheckCircle2 className="mx-auto h-14 w-14 text-red-500" />
        <h3 className="fjalla-one mt-4 text-2xl text-white">Request received</h3>
        <p className="mt-3 text-slate-300">
          We'll call you back within <span className="font-semibold text-red-500">1 hour</span> during business hours.
        </p>
        <p className="mt-2 text-sm text-slate-400">
          For immediate help, call{' '}
          <a className="text-red-500 hover:underline" href="tel:541-988-9823">
            541-988-9823
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 md:p-8 shadow-2xl group"
    >
      {/* Animated border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-red-500/0 via-red-500/20 to-red-500/0 opacity-0 blur-xl transition-opacity duration-500 group-focus-within:opacity-100"
      />
      <div className="relative">
        {!compact && (
          <>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-red-500 mb-2">
              Free Inspection
            </p>
            <h3 className="fjalla-one text-2xl md:text-3xl text-white mb-2">
              Get a callback in under an hour
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              No cost. No obligation. Just answers from a 25-year-old Eugene company.
            </p>
          </>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="lead-name" className="text-xs uppercase tracking-wider text-slate-400 mb-1.5 block">
              Name *
            </label>
            <input
              id="lead-name"
              name="name"
              required
              value={form.name}
              onChange={onChange}
              className="w-full rounded-lg bg-slate-950/50 border border-white/10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 px-4 py-3 text-white placeholder:text-slate-500 transition-colors"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="lead-phone" className="text-xs uppercase tracking-wider text-slate-400 mb-1.5 block">
              Phone *
            </label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={onChange}
              className="w-full rounded-lg bg-slate-950/50 border border-white/10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 px-4 py-3 text-white placeholder:text-slate-500 transition-colors"
              placeholder="(541) 555-0100"
            />
          </div>

          <div>
            <label htmlFor="lead-email" className="text-xs uppercase tracking-wider text-slate-400 mb-1.5 block">
              Email
            </label>
            <input
              id="lead-email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="w-full rounded-lg bg-slate-950/50 border border-white/10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 px-4 py-3 text-white placeholder:text-slate-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="lead-situation" className="text-xs uppercase tracking-wider text-slate-400 mb-1.5 block">
              What's your situation?
            </label>
            <select
              id="lead-situation"
              name="situation"
              value={form.situation}
              onChange={onChange}
              className="w-full rounded-lg bg-slate-950/50 border border-white/10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 px-4 py-3 text-white transition-colors"
            >
              <option value="">Select one…</option>
              {SITUATIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {!compact && (
            <div>
              <label htmlFor="lead-message" className="text-xs uppercase tracking-wider text-slate-400 mb-1.5 block">
                Anything else?
              </label>
              <textarea
                id="lead-message"
                name="message"
                rows={3}
                value={form.message}
                onChange={onChange}
                className="w-full rounded-lg bg-slate-950/50 border border-white/10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 px-4 py-3 text-white placeholder:text-slate-500 transition-colors resize-none"
                placeholder="Square footage, when it started, anything we should know…"
              />
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-300">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 transition-colors fjalla-one text-lg active:scale-[0.98]"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Sending…
              </>
            ) : (
              'Get My Free Inspection'
            )}
          </button>

          <p className="text-xs text-slate-500 text-center">
            By submitting, you agree to be contacted about your inquiry. We'll never share your info.
          </p>
        </div>
      </div>
    </motion.form>
  );
}
