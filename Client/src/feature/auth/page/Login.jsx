import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "../Hooks/Auth.hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function Login() {
  const navigate = useNavigate();
  const { isLoading, handlelogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await handlelogin(data);
      toast.success("Welcome back! 👋", {
        duration: 3000,
        style: { background: "#fff", border: "1px solid #e5e7eb", color: "#111827" },
      });
      navigate("/dashboard");
    } catch {
      toast.error("Invalid email or password", {
        duration: 3000,
        style: { background: "#fff", border: "1px solid #fca5a5", color: "#991b1b" },
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Full-page loader while auth check is in progress ── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Checking session…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 flex">

      {/* ══════════════ LEFT BRANDING PANEL ══════════════ */}
      <div className="hidden lg:flex lg:w-[46%] bg-gradient-to-br from-blue-600 to-indigo-700 flex-col justify-between p-12 relative overflow-hidden">

        {/* decorative circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/[0.03] rounded-full" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-blue-600 font-black text-lg">R</span>
          </div>
          <span className="text-white font-extrabold text-xl tracking-tight">ResumeAI</span>
        </div>

        {/* Centre text */}
        <div className="relative z-10">
          <h2 className="text-white text-4xl font-extrabold leading-tight mb-5">
            Land your dream job<br />
            <span className="text-blue-200">faster than ever.</span>
          </h2>
          <p className="text-blue-100 text-base leading-relaxed mb-10 max-w-sm">
            AI-powered resume feedback trusted by over 1 million job seekers in 180+ countries.
          </p>

          {/* mini stat cards */}
          <div className="grid grid-cols-2 gap-4 max-w-xs">
            {[
              { value: "1M+", label: "Resumes analyzed" },
              { value: "94%", label: "Interview rate ↑" },
              { value: "4.9★", label: "Average rating" },
              { value: "60s", label: "To get your score" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
                <p className="text-white font-black text-xl">{value}</p>
                <p className="text-blue-200 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-5">
          <p className="text-blue-50 text-sm leading-relaxed italic mb-4">
            "I rewrote two bullet points based on the suggestions and landed four interviews the very next week."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-400 flex items-center justify-center text-white font-bold text-xs">PM</div>
            <div>
              <p className="text-white font-semibold text-sm">Priya Mehta</p>
              <p className="text-blue-300 text-xs">Software Engineer @ Google</p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════ RIGHT FORM PANEL ══════════════ */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">R</span>
            </div>
            <span className="text-gray-900 font-extrabold text-lg">ResumeAI</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-500 text-sm">Sign in to continue to your resume dashboard.</p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  {...register("email")}
                  className={`w-full h-11 rounded-xl border ${
                    errors.email ? "border-red-400 bg-red-50 focus:ring-red-200" : "border-gray-200 bg-gray-50 focus:ring-blue-100"
                  } px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:ring-4 focus:border-blue-400 transition-all duration-200`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-gray-700 text-sm font-semibold">Password</label>
                  <button type="button" className="text-blue-600 text-xs font-medium hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...register("password")}
                    className={`w-full h-11 rounded-xl border ${
                      errors.password ? "border-red-400 bg-red-50 focus:ring-red-200" : "border-gray-200 bg-gray-50 focus:ring-blue-100"
                    } px-4 pr-11 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:ring-4 focus:border-blue-400 transition-all duration-200`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-base"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input type="checkbox" className="w-4 h-4 rounded accent-blue-600" />
                <span className="text-gray-600 text-sm">Keep me signed in</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-bold transition-all duration-200 shadow-sm shadow-blue-200 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign in to ResumeAI →"
                )}
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-gray-400 text-xs font-medium">or continue with</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Social buttons (UI only) */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "G", label: "Google", color: "text-red-500" },
                { icon: "in", label: "LinkedIn", color: "text-blue-700" },
              ].map(({ icon, label, color }) => (
                <button
                  key={label}
                  type="button"
                  className="flex items-center justify-center gap-2 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-colors duration-200"
                >
                  <span className={`font-black ${color}`}>{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer link */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Create one free →
            </Link>
          </p>

          <p className="text-center text-gray-400 text-xs mt-4">
            <Link to="/" className="hover:text-gray-600 transition-colors">← Back to homepage</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;