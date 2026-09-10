import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

/* ─── tiny animated counter ─── */
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = end / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── floating badge ─── */
function ScoreBadge({ label, score, color }) {
  return (
    <div className="flex flex-col items-center bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100 min-w-[80px]">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</span>
      <span className={`text-xl font-extrabold ${color}`}>{score}</span>
      <span className="text-[10px] text-gray-400">/ 100</span>
    </div>
  );
}

const STEPS = [
  {
    num: "01",
    title: "Upload Your Resume",
    desc: "Drop your PDF or DOCX file. Our parser instantly reads every section — experience, skills, education, and more.",

  },
  {
    num: "02",
    title: "AI Scans & Scores",
    desc: "Our model benchmarks your resume against thousands of successful profiles and real recruiter feedback patterns.",

  },
  {
    num: "03",
    title: "Get Actionable Fixes",
    desc: "Receive a prioritised list of improvements with exact wording suggestions, keyword gaps, and formatting tips.",

  },
];

const FEATURES = [
  { title: "ATS Score", desc: "Know exactly how applicant tracking systems read your resume before a human ever sees it." },
  { title: "Keyword Gap Analysis", desc: "Match your resume to any job description and surface missing keywords that cost you callbacks." },
  { title: "Writing Quality", desc: "Detect weak action verbs, passive voice, and vague impact statements recruiters skip past." },
  { title: "Role Targeting", desc: "Personalise your resume score by role — a software engineer's needs differ from a product manager's." },
  { title: "Impact Metrics", desc: "Identify where adding numbers (%, $, users) would make your achievements 3× more compelling." },
  { title: "Instant Suggestions", desc: "Every issue comes with a ready-to-use rewrite — no blank-page anxiety, just copy and paste." },
];

const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    role: "Software Engineer @ Google",
    avatar: "PM",
    color: "bg-violet-500",
    text: "I'd been applying for three months with zero responses. After using this tool I rewrote two bullet points and landed four interviews in a week. I'm not even exaggerating.",
    stars: 5,
  },
  {
    name: "James O'Brien",
    role: "Product Manager @ Stripe",
    avatar: "JO",
    color: "bg-blue-500",
    text: "The keyword gap feature is genuinely eye-opening. I thought my resume was strong — turns out I was missing 60% of the keywords in the job posting I wanted most.",
    stars: 5,
  },
  {
    name: "Sara Lindqvist",
    role: "Data Analyst @ Spotify",
    avatar: "SL",
    color: "bg-emerald-500",
    text: "Clean, fast, no fluff. It told me exactly what was weak and gave me the fix. Took me 20 minutes total and I went from a 54 to an 89 ATS score.",
    stars: 5,
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-black">R</span>
            </div>
            <span className="text-gray-900 font-extrabold text-xl tracking-tight">ResumeAI</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Pricing", "Blog"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-gray-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-200 border border-gray-200">
              Log in
            </Link>
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors duration-200 shadow-sm">
              Get Started Free
            </Link>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gray-700">
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            {["Features", "How It Works", "Pricing", "Blog"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} onClick={() => setMobileOpen(false)} className="text-gray-700 font-medium">
                {item}
              </a>
            ))}
            <Link to="/login" className="text-center border border-gray-200 rounded-xl py-2.5 font-semibold text-gray-700">Log in</Link>
            <Link to="/register" className="text-center bg-blue-600 text-white rounded-xl py-2.5 font-semibold">Get Started Free</Link>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 pt-28 pb-20 px-6 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left copy */}
            <div>
              {/* pill badge */}
           
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Get Expert Feedback<br />
                on your{" "}
                <span className="text-blue-600 relative">
                  Resume
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M0 6 Q50 0 100 5 Q150 10 200 4" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
                  </svg>
                </span>
                , instantly.
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
                Our free AI resume checker scores your resume on the key criteria recruiters and hiring managers look for. Get actionable steps to land more interviews — in under 60 seconds.
              </p>

              {/* Upload box */}
              <div className="border-2 border-dashed border-blue-300 bg-white/80 backdrop-blur rounded-2xl p-6 mb-6 hover:border-blue-400 hover:bg-blue-50/40 transition-all duration-300 cursor-pointer group">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200 text-2xl">
                    📎
                  </div>
                  <p className="text-gray-700 font-semibold">Drop your resume here or choose a file</p>
                  <p className="text-gray-400 text-sm">PDF & DOCX only · Max 5MB</p>
                  <Link to="/register" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-colors duration-200 shadow-md shadow-blue-200 text-sm">
                    Analyze My Resume →
                  </Link>
                </div>
              </div>

              {/* Social proof row */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex -space-x-2">
                  {["bg-violet-400", "bg-blue-400", "bg-emerald-400", "bg-orange-400", "bg-pink-400"].map((c, i) => (
                    <div key={i} className={`w-8 h-8 ${c} rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map((s) => <span key={s} className="text-yellow-400 text-sm">★</span>)}
                  </div>
                  <p className="text-gray-500 text-xs">Trusted by <span className="text-blue-600 font-semibold">50+</span> job seekers globally</p>
                </div>
              </div>
            </div>

            {/* Right — mock dashboard card */}
            <div className="relative hidden lg:block">
              {/* Main card */}
              <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl shadow-slate-900/30 border border-slate-800">
                {/* card header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest">RESUME WORDED</p>
                    <p className="text-white text-sm font-medium mt-0.5">Good morning, Alex.</p>
                    <p className="text-slate-400 text-xs">Welcome to your resume review.</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-lg">
                    A
                  </div>
                </div>

                {/* Score */}
                <div className="bg-slate-800 rounded-2xl p-4 mb-4">
                  <p className="text-slate-400 text-xs mb-2">Your resume scored <span className="text-white font-bold">78 out of 100</span></p>
                  <div className="w-full h-2.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-blue-500 to-blue-600" style={{ width: "78%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1"><span>0</span><span>100</span></div>
                </div>

                {/* Sub-scores */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[["Impact", "71", "text-yellow-400"], ["Brevity", "85", "text-emerald-400"], ["Style", "62", "text-orange-400"], ["Skills", "94", "text-blue-400"]].map(([l, s, c]) => (
                    <div key={l} className="bg-slate-800 rounded-xl p-2.5 text-center">
                      <p className="text-slate-400 text-[10px] uppercase tracking-wide">{l}</p>
                      <p className={`${c} font-black text-lg`}>{s}</p>
                      <p className="text-slate-500 text-[9px]">/100</p>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                <div>
                  <p className="text-slate-300 text-xs font-semibold mb-2 uppercase tracking-widest">Recommendations</p>
                  {[
                    { issue: "Weak action verbs in 3 bullets", tag: "IMPACT", tagColor: "bg-yellow-500/20 text-yellow-400" },
                    { issue: "Missing keywords: TypeScript, CI/CD", tag: "KEYWORDS", tagColor: "bg-blue-500/20 text-blue-400" },
                    { issue: "No measurable results on experience", tag: "METRICS", tagColor: "bg-emerald-500/20 text-emerald-400" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-800 rounded-xl px-3 py-2.5 mb-1.5 last:mb-0">
                      <span className="text-slate-300 text-xs flex-1">{i + 1}. {r.issue}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ml-2 ${r.tagColor}`}>{r.tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                {[["ATS", "94%", "text-emerald-600"], ["Match", "82%", "text-blue-600"]].map(([l, v, c]) => (
                  <div key={l} className="bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2 text-center">
                    <p className="text-gray-400 text-[10px] uppercase font-semibold">{l}</p>
                    <p className={`${c} font-black text-base`}>{v}</p>
                  </div>
                ))}
              </div>

              {/* Pulse dot */}
              <div className="absolute -top-3 -right-3 flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 py-1.5 shadow-md">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-ping absolute"></span>
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-gray-600 text-xs font-medium ml-2">Analyzing live…</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-blue-600 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { end: 1200000, suffix: "+", label: "Resumes Analyzed" },
            { end: 94, suffix: "%", label: "Interview Rate Increase" },
            { end: 180, suffix: "+", label: "Countries Reached" },
            { end: 4.9, suffix: "/5", label: "Average Rating", isFloat: true },
          ].map(({ end, suffix, label, isFloat }) => (
            <div key={label}>
              <p className="text-white text-4xl font-black mb-1">
                {isFloat ? end : <Counter end={end} suffix={suffix} />}
                {isFloat ? suffix : ""}
              </p>
              <p className="text-blue-100 text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — HOW IT WORKS + FEATURES
      ═══════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">How It Works</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">Three steps. That's all it takes.</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">No account needed for the first scan. Drop a file, get your score, decide if you want to dig deeper.</p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {STEPS.map((step) => (
              <div key={step.num} className="relative group">
                <div className="bg-gray-50 hover:bg-blue-50 rounded-2xl p-8 transition-all duration-300 border border-gray-100 hover:border-blue-200 h-full">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <div className="text-blue-600 font-black text-sm mb-2">{step.num}</div>
                  <h3 className="text-gray-900 font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
                {/* connector line */}
                {step.num !== "03" && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200 z-10"></div>
                )}
              </div>
            ))}
          </div>

          {/* Features grid */}
          <div id="features">
            <div className="text-center mb-12">
              <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">Everything You Need</span>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Built for serious job seekers</h2>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">Every feature exists because real recruiters told us what they actually look for.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 cursor-default">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SAMPLE SCORE BREAKDOWN
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left text */}
          <div>
            <span className="inline-block bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider border border-blue-500/30">
              Real Results, Real Feedback
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Stop guessing.<br />
              <span className="text-blue-400">Start knowing.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Most people submit the same resume to 50 jobs and wonder why they hear nothing back. Our AI shows you exactly which sections are hurting you — and how to fix them today, not next week.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Personalised score breakdown across 6 dimensions",
                "Side-by-side comparison with successful resumes in your field",
                "One-click suggestions you can apply in minutes",
                "Track improvement over time as you edit",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300 text-sm">
                  <span className="text-blue-400 mt-0.5 text-base flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/register" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-900/40">
              Try It Free — No Credit Card →
            </Link>
          </div>

          {/* Right — progress bars card */}
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-3xl p-8 backdrop-blur">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white font-bold text-lg">Alex Johnson</p>
                <p className="text-slate-400 text-sm">Software Engineer · Entry Level</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
                <span className="text-white font-black text-2xl">78</span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "ATS Compatibility", score: 94, color: "bg-emerald-400" },
                { label: "Impact & Achievements", score: 71, color: "bg-yellow-400" },
                { label: "Writing Quality", score: 85, color: "bg-blue-400" },
                { label: "Keyword Relevance", score: 62, color: "bg-orange-400" },
                { label: "Format & Structure", score: 88, color: "bg-violet-400" },
                { label: "Skills Alignment", score: 75, color: "bg-pink-400" },
              ].map(({ label, score, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300 font-medium">{label}</span>
                    <span className="text-white font-bold">{score}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full`} style={{ width: `${score}%`, transition: "width 1s ease" }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-700 flex gap-2 flex-wrap">
              {["Missing: CI/CD", "Missing: TypeScript", "Weak verb: 'helped'"].map((tag) => (
                <span key={tag} className="text-xs bg-red-500/20 text-red-300 border border-red-500/30 px-2.5 py-1 rounded-full font-medium">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — TESTIMONIALS + FINAL CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-yellow-50 text-yellow-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">Real Stories</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">People who landed the job</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">We don't pay for reviews. These are real people who used the tool and came back to tell us about it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                </div>
                <p className="text-gray-700 leading-relaxed text-[15px] flex-1 mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>{t.avatar}</div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing teaser */}
          <div id="pricing" className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Simple, transparent pricing</h2>
              <p className="text-gray-500">Start free. Upgrade when you're ready.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Free */}
              <div className="rounded-2xl border border-gray-200 p-8 bg-white">
                <p className="font-bold text-gray-900 text-lg mb-1">Free</p>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">$0</p>
                <p className="text-gray-400 text-sm mb-6">Forever free</p>
                <ul className="space-y-2.5 mb-8 text-sm text-gray-600">
                  {["3 resume scans per month", "Overall ATS score", "Top 3 improvement tips", "PDF & DOCX support"].map((f) => (
                    <li key={f} className="flex items-center gap-2"><span className="text-blue-500">✓</span>{f}</li>
                  ))}
                </ul>
                <Link to="/register" className="block text-center border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50 transition-colors">
                  Start Free
                </Link>
              </div>
              {/* Pro */}
              <div className="rounded-2xl border-2 border-blue-600 p-8 bg-blue-600 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
                <p className="font-bold text-blue-100 text-lg mb-1">Pro</p>
                <p className="text-4xl font-extrabold text-white mb-1">$9<span className="text-blue-200 text-base font-medium">/mo</span></p>
                <p className="text-blue-200 text-sm mb-6">Cancel anytime</p>
                <ul className="space-y-2.5 mb-8 text-sm text-blue-100">
                  {["Unlimited resume scans", "Full 6-dimension breakdown", "Keyword gap by job description", "Writing quality suggestions", "Progress tracking & history", "Priority support"].map((f) => (
                    <li key={f} className="flex items-center gap-2"><span className="text-yellow-300">✓</span>{f}</li>
                  ))}
                </ul>
                <Link to="/register" className="block text-center bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors">
                  Get Pro Access →
                </Link>
              </div>
            </div>
          </div>

          {/* Final CTA banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden">
            {/* decorative circles */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/5 rounded-full"></div>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 relative z-10">
              Your next interview is one upload away.
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto relative z-10">
              Join over a million people who improved their resume in the last 30 days. It takes 60 seconds to find out where you stand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link to="/register" className="bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                Analyze My Resume — It's Free
              </Link>
              <Link to="/login" className="border-2 border-white/50 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
                I Already Have an Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════ */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-black">R</span>
                </div>
                <span className="text-white font-extrabold text-lg">ResumeAI</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">AI-powered resume feedback that actually helps you get the interview.</p>
              <div className="flex gap-3">
                {["𝕏", "in", "📧"].map((s, i) => (
                  <div key={i} className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-sm cursor-pointer transition-colors">{s}</div>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { title: "Resources", links: ["Resume Templates", "Career Blog", "Job Board Tips", "Interview Prep"] },
              { title: "Company", links: ["About Us", "Privacy Policy", "Terms of Service", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-white font-semibold text-sm mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="text-sm hover:text-white transition-colors duration-200">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2025 ResumeAI. All rights reserved.</p>
            <p>Made with ❤️ for job seekers everywhere</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
