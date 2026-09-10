import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "../Hooks/Auth.hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const registerSchema = z.object({
  Username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(100, "Username must be less than 100 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function Register() {
  const navigate = useNavigate();
  const { isLoading, handleregister } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const passwordValue = watch("password", "");

  const passwordStrength = (pw) => {
    if (!pw) return { label: "", color: "", width: "0%" };
    if (pw.length < 8) return { label: "Too short", color: "bg-red-400", width: "25%" };
    if (pw.length < 10) return { label: "Weak", color: "bg-orange-400", width: "45%" };
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw))
      return { label: "Strong", color: "bg-emerald-500", width: "100%" };
    return { label: "Medium", color: "bg-yellow-400", width: "70%" };
  };

  const strength = passwordStrength(passwordValue);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await handleregister(data);
      toast.success("Account created! Welcome aboard 🎉", {
        duration: 3000,
        style: { background: "#fff", border: "1px solid #e5e7eb", color: "#111827" },
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed. Try again.", {
        duration: 3000,
        style: { background: "#fff", border: "1px solid #fca5a5", color: "#991b1b" },
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Full-page loader ── */
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
      <div className="hidden lg:flex lg:w-[46%] bg-gradient-to-br from-indigo-600 to-blue-700 flex-col justify-between p-12 relative overflow-hidden">

        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-white/5 rounded-full" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-blue-600 font-black text-lg">R</span>
          </div>
          <span className="text-white font-extrabold text-xl tracking-tight">ResumeAI</span>
        </div>

        {/* Centre copy */}
        <div className="relative z-10">
          <h2 className="text-white text-4xl font-extrabold leading-tight mb-5">
            Your career upgrade<br />
            <span className="text-blue-200">starts right here.</span>
          </h2>
          <p className="text-blue-100 text-base leading-relaxed mb-8 max-w-sm">
            Create your free account and get an instant AI-powered score on your resume — no credit card, no commitment.
          </p>

          {/* feature checklist */}
          <ul className="space-y-3">
            {[
              "Unlimited resume scans on free tier",
              "Full 6-dimension score breakdown",
              "Keyword gap vs. any job description",
              "Personalised rewrite suggestions",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-blue-50 text-sm">
                <span className="text-emerald-300 mt-0.5 flex-shrink-0 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Mini score preview */}
        <div className="relative z-10 bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white font-bold text-sm">Resume Score Preview</p>
              <p className="text-blue-300 text-xs">Alex J. · Software Engineer</p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-black">78</span>
            </div>
          </div>
          {[
            ["ATS Compat.", 94, "bg-emerald-400"],
            ["Impact", 71, "bg-yellow-400"],
            ["Keywords", 62, "bg-orange-400"],
          ].map(([l, v, c]) => (
            <div key={l} className="mb-2 last:mb-0">
              <div className="flex justify-between text-xs mb-0.5">
                <span className="text-blue-200">{l}</span>
                <span className="text-white font-semibold">{v}</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${c} rounded-full`} style={{ width: `${v}%` }} />
              </div>
            </div>
          ))}
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
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              Free forever — no credit card needed
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Create your account</h1>
            <p className="text-gray-500 text-sm">Join over 1 million people improving their resume today.</p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

              {/* Username */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1.5">Username</label>
                <input
                  type="text"
                  placeholder="johndoe"
                  {...register("Username")}
                  className={`w-full h-11 rounded-xl border ${
                    errors.Username
                      ? "border-red-400 bg-red-50 focus:ring-red-200"
                      : "border-gray-200 bg-gray-50 focus:ring-blue-100"
                  } px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:ring-4 focus:border-blue-400 transition-all duration-200`}
                />
                {errors.Username && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {errors.Username.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1.5">Email address</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  {...register("email")}
                  className={`w-full h-11 rounded-xl border ${
                    errors.email
                      ? "border-red-400 bg-red-50 focus:ring-red-200"
                      : "border-gray-200 bg-gray-50 focus:ring-blue-100"
                  } px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:ring-4 focus:border-blue-400 transition-all duration-200`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password + strength */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                    {...register("password")}
                    className={`w-full h-11 rounded-xl border ${
                      errors.password
                        ? "border-red-400 bg-red-50 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50 focus:ring-blue-100"
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

                {/* Strength bar */}
                {passwordValue && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${strength.color}`}
                        style={{ width: strength.width }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Strength: <span className="font-semibold text-gray-600">{strength.label}</span>
                    </p>
                  </div>
                )}

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-400 leading-relaxed">
                By creating an account you agree to our{" "}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">Terms of Service</span>{" "}
                and{" "}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">Privacy Policy</span>.
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-bold transition-all duration-200 shadow-sm shadow-blue-200 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account…
                  </>
                ) : (
                  "Create Free Account →"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-gray-400 text-xs font-medium">or sign up with</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Social buttons */}
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
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Sign in →
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

export default Register;