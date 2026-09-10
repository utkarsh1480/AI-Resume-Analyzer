import { useState, useEffect } from "react";
import { useInterviewHook } from "../Hooks/useInterview.js";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/Hooks/Auth.hooks.jsx";
import {
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
  MapIcon,
  DocumentArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowLeftIcon,
  ArrowRightOnRectangleIcon,
  LightBulbIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

/* ─────────────────────────────────────────
   Circular progress ring (SVG)
───────────────────────────────────────── */
function ProgressRing({ size = 120, stroke = 10, progress = 0 }) {
  const r = (size - stroke) / 2;
  const circ = r * 2 * Math.PI;
  const offset = circ - (Math.min(progress, 100) / 100) * circ;
  const color =
    progress >= 70 ? "#10b981" : progress >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <svg height={size} width={size} className="block -rotate-90">
      <circle stroke="#e5e7eb" fill="transparent" strokeWidth={stroke} r={r} cx={size / 2} cy={size / 2} />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circ} ${circ}`}
        style={{ strokeDashoffset: offset, transition: "stroke-dashoffset 1s ease" }}
        r={r}
        cx={size / 2}
        cy={size / 2}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="rotate-90"
        style={{
          fontSize: size * 0.2,
          fontWeight: 800,
          fill: "#111827",
          transform: `rotate(90deg)`,
          transformOrigin: "center",
        }}
      >
        {progress}%
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────
   Accordion question card
───────────────────────────────────────── */
function QuestionCard({ index, question, answer, intention, prefix = "Q", accentClass = "bg-blue-600" }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden transition-all duration-200 ${open ? "shadow-md" : "hover:shadow-sm"}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-5 py-4 flex items-start gap-4 group"
      >
        <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg ${accentClass} text-white text-xs font-bold`}>
          {prefix}{index + 1}
        </div>
        <div className="flex-1 text-sm font-medium text-gray-800 leading-relaxed pt-0.5">{question}</div>
        <div className="text-gray-400 group-hover:text-gray-600 transition-colors mt-0.5 flex-shrink-0">
          {open ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-gray-50 space-y-4">
          {intention && (
            <div className="rounded-xl bg-violet-50 border border-violet-100 p-4">
              <span className="inline-block text-[10px] font-bold bg-violet-100 text-violet-700 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                💡 Why they ask this
              </span>
              <p className="text-sm text-violet-800 leading-relaxed">{intention}</p>
            </div>
          )}
          {answer && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
              <span className="inline-block text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                ✅ Model Answer
              </span>
              <p className="text-sm text-emerald-900 leading-relaxed">{answer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export default function Interview() {
  const { report, getReportById, generateResmue, loading } = useInterviewHook();
  const { interviewId } = useParams();
  const { user, handlelogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId]);

  const safeReport = report ?? {
    technicalQuestions: [],
    behavioralQuestions: [],
    skillGaps: [],
    matchScore: 0,
    preparationPlan: [],
    title: "",
  };

  const plan = safeReport.preparationPlan ?? [];

  const [activeSection, setActiveSection] = useState("technical");

  const scoreLabel =
    safeReport.matchScore >= 70
      ? "Strong match"
      : safeReport.matchScore >= 40
      ? "Moderate match"
      : "Needs improvement";

  const scoreColor =
    safeReport.matchScore >= 70
      ? "text-emerald-600"
      : safeReport.matchScore >= 40
      ? "text-yellow-600"
      : "text-red-500";

  const NAV_ITEMS = [
    { id: "technical", label: "Technical Questions", icon: CodeBracketIcon, count: safeReport.technicalQuestions.length },
    { id: "behavioral", label: "Behavioral Questions", icon: ChatBubbleLeftRightIcon, count: safeReport.behavioralQuestions.length },
    { id: "roadmap", label: "Road Map", icon: MapIcon, count: plan.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 font-sans">

      {/* ── Loading overlay ── */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-700 font-semibold">Loading your strategy…</p>
        </div>
      )}

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <nav className="bg-white/90 backdrop-blur border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="h-5 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-sm">R</span>
              </div>
              <span className="text-gray-900 font-extrabold text-base tracking-tight hidden sm:inline">ResumeAI</span>
            </div>
          </div>

          {safeReport.title && (
            <p className="text-gray-500 text-sm font-medium truncate max-w-xs hidden md:block">{safeReport.title}</p>
          )}

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                {user?.Username?.[0]?.toUpperCase() ?? "U"}
              </div>
              <span className="text-gray-700 font-medium text-sm">{user?.Username}</span>
            </div>
            <button
              onClick={async () => { await handlelogout(); navigate("/login"); }}
              className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 text-sm font-medium border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          3-COLUMN LAYOUT
      ══════════════════════════════════════ */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-12 gap-5">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sticky top-[70px]">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">Sections</p>

            <nav className="space-y-1">
              {NAV_ITEMS.map(({ id, label, icon: Icon, count }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                    activeSection === id
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-semibold flex-1">{label}</span>
                  {count > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeSection === id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                      {count}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => generateResmue(interviewId)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all duration-200 shadow-sm shadow-blue-200"
              >
                <DocumentArrowDownIcon className="w-4 h-4 flex-shrink-0" />
                Generate Resume PDF
              </button>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="col-span-12 md:col-span-9 lg:col-span-7">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[70vh]">

            {/* section header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {activeSection === "technical" && <CodeBracketIcon className="w-5 h-5 text-blue-600" />}
                {activeSection === "behavioral" && <ChatBubbleLeftRightIcon className="w-5 h-5 text-indigo-600" />}
                {activeSection === "roadmap" && <MapIcon className="w-5 h-5 text-violet-600" />}
                <h2 className="text-lg font-bold text-gray-900 capitalize">
                  {activeSection === "roadmap" ? "Preparation Road Map" : `${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Questions`}
                </h2>
              </div>
              <span className="text-xs text-gray-400 font-medium bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                {activeSection === "technical" && `${safeReport.technicalQuestions.length} questions`}
                {activeSection === "behavioral" && `${safeReport.behavioralQuestions.length} questions`}
                {activeSection === "roadmap" && `${plan.length}-step plan`}
              </span>
            </div>

            <div className="p-6 space-y-3">

              {/* TECHNICAL */}
              {activeSection === "technical" && (
                <>
                  {safeReport.technicalQuestions.length === 0 ? (
                    <EmptyState message="No technical questions generated." />
                  ) : (
                    safeReport.technicalQuestions.map((q, idx) => (
                      <QuestionCard
                        key={q._id || idx}
                        index={idx}
                        question={q.questions}
                        answer={q.answer}
                        intention={q.intention}
                        prefix="Q"
                        accentClass="bg-blue-600"
                      />
                    ))
                  )}
                </>
              )}

              {/* BEHAVIORAL */}
              {activeSection === "behavioral" && (
                <>
                  {safeReport.behavioralQuestions.length === 0 ? (
                    <EmptyState message="No behavioral questions generated." />
                  ) : (
                    safeReport.behavioralQuestions.map((b, idx) => (
                      <QuestionCard
                        key={b._id || idx}
                        index={idx}
                        question={b.questions}
                        answer={b.answer}
                        intention={b.intention}
                        prefix="B"
                        accentClass="bg-indigo-600"
                      />
                    ))
                  )}
                </>
              )}

              {/* ROAD MAP */}
              {activeSection === "roadmap" && (
                <>
                  {plan.length === 0 ? (
                    <EmptyState message="No preparation plan generated." />
                  ) : (
                    <div className="relative pl-8">
                      {/* vertical line */}
                      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-blue-100 rounded-full" />

                      <div className="space-y-6">
                        {plan.map((p, i) => (
                          <div key={p.day || i} className="relative">
                            {/* dot */}
                            <div className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100" />

                            <div className="bg-gray-50 hover:bg-blue-50/50 border border-gray-100 hover:border-blue-100 rounded-xl p-4 transition-all duration-200">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                                  {p.day}
                                </span>
                                <h3 className="text-sm font-bold text-gray-900">{p.focus}</h3>
                              </div>
                              <ul className="space-y-1.5">
                                {p.tasks?.map((task, j) => (
                                  <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircleIcon className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    {task}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

            </div>
          </div>
        </main>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-[70px] space-y-6">

            {/* Match Score */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <ProgressRing size={120} stroke={10} progress={safeReport.matchScore} />
              </div>
              <h4 className="text-gray-900 font-bold text-base">Match Score</h4>
              <p className={`text-sm font-semibold ${scoreColor} mt-0.5`}>{scoreLabel}</p>
              <p className="text-gray-400 text-xs mt-1">Based on your resume vs. job description</p>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Skill Gaps */}
            <div>
              <h5 className="text-gray-900 font-bold text-sm mb-3 flex items-center gap-2">
                <LightBulbIcon className="w-4 h-4 text-yellow-500" />
                Skill Gaps
              </h5>

              {safeReport.skillGaps.length === 0 ? (
                <p className="text-gray-400 text-xs">No skill gaps identified 🎉</p>
              ) : (
                <div className="space-y-2">
                  {safeReport.skillGaps.map((g, i) => {
                    const severity = g.severity?.toLowerCase();
                    const styles =
                      severity === "high"
                        ? { badge: "bg-red-50 border-red-200 text-red-700", dot: "bg-red-500", label: "High" }
                        : severity === "medium"
                        ? { badge: "bg-orange-50 border-orange-200 text-orange-700", dot: "bg-orange-500", label: "Medium" }
                        : { badge: "bg-emerald-50 border-emerald-200 text-emerald-700", dot: "bg-emerald-500", label: "Low" };

                    return (
                      <div key={i} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border ${styles.badge}`}>
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${styles.dot}`} />
                        <span className="text-xs font-medium flex-1">{g.skill}</span>
                        <span className="text-[10px] font-bold opacity-60">{styles.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="h-px bg-gray-100" />

            {/* Video placeholder */}
            <div>
              <h5 className="text-gray-900 font-bold text-sm mb-3">Interview Preview</h5>
              <div className="rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 h-32 flex flex-col items-center justify-center gap-2">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎬</span>
                </div>
                <p className="text-gray-400 text-xs text-center font-medium">Video preview<br />coming soon</p>
              </div>
            </div>

            {/* Quick actions */}
            <button
              onClick={() => generateResmue(interviewId)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors duration-200 shadow-sm shadow-blue-200"
            >
              <DocumentArrowDownIcon className="w-4 h-4" />
              Download Resume PDF
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
}

/* ── Empty state helper ── */
function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
        <span className="text-2xl">📋</span>
      </div>
      <p className="text-gray-500 font-medium">{message}</p>
      <p className="text-gray-400 text-sm mt-1">Try generating a new report from the dashboard.</p>
    </div>
  );
}
