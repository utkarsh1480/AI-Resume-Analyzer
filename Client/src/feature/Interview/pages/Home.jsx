import { useState, useRef } from "react";
import { useInterviewHook } from "../Hooks/useInterview.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/Hooks/Auth.hooks.jsx";
import {
  CloudArrowUpIcon,
  BriefcaseIcon,
  UserCircleIcon,
  InformationCircleIcon,
  SparklesIcon,
  ArrowRightOnRectangleIcon,
  DocumentTextIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";

function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const { generateReport, reports } = useInterviewHook();
  const { user, handlelogout } = useAuth();
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const handleFileChange = (file) => {
    if (file) {
      resumeInputRef.current.files = createFileList(file);
      setFileName(file.name);
    }
  };

  // helper to assign file to input ref via DataTransfer
  const createFileList = (file) => {
    const dt = new DataTransfer();
    dt.items.add(file);
    return dt.files;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleFormSubmit = async () => {
    const resumeFile = resumeInputRef.current?.files?.[0];
    if (!resumeFile && !selfDescription.trim()) {
      toast.error("Please upload a resume or add a self-description.", {
        style: { background: "#fff", border: "1px solid #fca5a5", color: "#991b1b" },
      });
      return;
    }

    setLoading(true);
    try {
      const data = await generateReport({ jobDescription, selfDescription, resumeFile });
      if (!data?._id) throw new Error("Report creation failed — no ID returned.");
      navigate(`/interview/${data._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Unable to generate report.", {
        style: { background: "#fff", border: "1px solid #fca5a5", color: "#991b1b" },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await handlelogout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 font-sans">

      {/* ── Full-page loading overlay ── */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <div className="text-center">
            <p className="text-gray-800 font-semibold text-lg">Generating your strategy…</p>
            <p className="text-gray-500 text-sm mt-1">This takes about 30 seconds ✨</p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <nav className="bg-white/90 backdrop-blur border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm">R</span>
            </div>
            <span className="text-gray-900 font-extrabold text-lg tracking-tight">ResumeAI</span>
          </Link>

          {/* User info + logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                {user?.Username?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div className="text-right">
                <p className="text-gray-800 font-semibold text-sm leading-none">{user?.Username}</p>
                <p className="text-gray-400 text-xs mt-0.5">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 text-sm font-medium transition-colors duration-200 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          PAGE CONTENT
      ══════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Page header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            <SparklesIcon className="w-3.5 h-3.5" />
            AI-Powered Strategy Generation
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
            Create Your Custom{" "}
            <span className="text-blue-600">Interview Plan</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Let our AI analyse the job requirements and your unique profile to build a personalised, winning interview strategy.
          </p>
        </div>

        {/* ── MAIN FORM CARD ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">

          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">

            {/* LEFT — Job Description */}
            <div className="p-8 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col">

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                    <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Target Job Description</h2>
                </div>
                <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs font-semibold px-3 py-1 rounded-full">
                  REQUIRED
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-4">
                Paste the complete job description. The more detail you provide, the better your personalised strategy.
              </p>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder={`Paste the full job description here…\n\ne.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design. Candidates should have 5+ years of experience…"`}
                className="flex-1 min-h-[440px] rounded-xl bg-gray-50 border border-gray-200 p-5 text-sm text-gray-700 placeholder:text-gray-400 resize-none outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 leading-relaxed"
              />

              <div className="mt-2 flex justify-between text-xs text-gray-400">
                <span>Tip: Include required skills, responsibilities and company name for best results</span>
                <span>{jobDescription.length} chars</span>
              </div>
            </div>

            {/* RIGHT — Profile */}
            <div className="p-8 flex flex-col gap-6">

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <UserCircleIcon className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Your Profile</h2>
              </div>

              {/* Upload area */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <label className="text-sm font-semibold text-gray-700">Upload Resume</label>
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Best Results
                  </span>
                </div>

                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.docx"
                  hidden
                  ref={resumeInputRef}
                  onChange={(e) => handleFileChange(e.target.files?.[0])}
                />

                <label
                  htmlFor="resume"
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`block h-40 rounded-xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                    dragOver
                      ? "border-blue-400 bg-blue-50"
                      : fileName
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                >
                  <CloudArrowUpIcon className={`w-10 h-10 ${fileName ? "text-emerald-500" : "text-blue-400"}`} />
                  {fileName ? (
                    <>
                      <p className="text-emerald-700 font-semibold text-sm text-center px-4">{fileName}</p>
                      <p className="text-emerald-500 text-xs">Click to replace</p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-700 font-semibold text-sm">Click to upload or drag & drop</p>
                      <p className="text-gray-400 text-xs">PDF & DOCX · Max 5MB</p>
                    </>
                  )}
                </label>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-gray-400 text-xs font-semibold">OR</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Self description */}
              <div className="flex flex-col flex-1">
                <label className="text-sm font-semibold text-gray-700 mb-2">Quick Self-Description</label>
                <textarea
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy…"
                  className="flex-1 min-h-[110px] rounded-xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 placeholder:text-gray-400 resize-none outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 leading-relaxed"
                />
              </div>

              {/* Info box */}
              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex items-start gap-3">
                <InformationCircleIcon className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-blue-700 text-sm leading-relaxed">
                  Either a <strong>Resume</strong> or a <strong>Self-Description</strong> is required to generate a personalised plan.
                </p>
              </div>
            </div>
          </div>

          {/* ── Bottom action bar ── */}
          <div className="border-t border-gray-100 px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/60">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <ClockIcon className="w-4 h-4" />
              <span>AI-Powered Strategy Generation · approx. 30 seconds</span>
            </div>

            <button
              onClick={handleFormSubmit}
              disabled={loading}
              className="flex items-center gap-2.5 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm shadow-sm shadow-blue-200 hover:shadow-md hover:scale-[1.02] transition-all duration-200"
            >
              <SparklesIcon className="w-5 h-5" />
              Generate My Interview Strategy
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════
            PREVIOUS REPORTS
        ══════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Previous Reports</h3>
              <p className="text-gray-500 text-sm mt-0.5">Pick up where you left off or review past strategies.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-200 text-xs font-semibold px-3 py-1.5 rounded-full">
              <DocumentTextIcon className="w-3.5 h-3.5" />
              {reports.length} {reports.length === 1 ? "report" : "reports"}
            </span>
          </div>

          {reports.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <div
                  key={report._id || report.id}
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="group rounded-xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 p-5 cursor-pointer transition-all duration-200 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-9 h-9 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                      <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date(report.createdAt || report.updatedAt || Date.now()).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </span>
                  </div>

                  <h4 className="text-gray-900 font-semibold text-sm mb-1 line-clamp-1">
                    {report.title || "Interview Report"}
                  </h4>
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4">
                    {report.jobDescription?.slice(0, 100) || "No description available."}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {report.matchScore != null && (
                      <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Match: {report.matchScore}%
                      </span>
                    )}
                    {report.skillGaps?.length > 0 && (
                      <span className="text-[11px] font-semibold bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full">
                        {report.skillGaps.length} skill gaps
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-100 bg-gray-50/60 py-14 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DocumentTextIcon className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium mb-1">No reports yet</p>
              <p className="text-gray-400 text-sm">Generate your first interview strategy above to see it here.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-10 pb-4 text-center flex justify-center gap-6">
          {["Privacy Policy", "Terms of Service", "Help Center"].map((item) => (
            <button key={item} className="text-gray-400 hover:text-blue-600 text-sm transition-colors duration-200">
              {item}
            </button>
          ))}
        </footer>
      </div>
    </div>
  );
}

export default Home;