import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { upsertProfile } from "@/lib/profile.functions";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Loader2 } from "lucide-react";

const PLANS = [
  { name: "Drop-in", price: "₦8,000", per: "single session" },
  { name: "Monthly", price: "₦45,000", per: "per month" },
  { name: "PT Pro", price: "₦120,000", per: "per month" },
] as const;
type PlanName = (typeof PLANS)[number]["name"];

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => {
    const parsed: { plan?: PlanName | undefined } = {};
    if (typeof search.plan === "string" && PLANS.some((p) => p.name === search.plan)) {
      parsed.plan = search.plan as PlanName;
    }
    return parsed;
  },
  head: () => ({
    meta: [
      { title: "Join PulseGym — Sign up or Log in" },
      {
        name: "description",
        content:
          "Create your PulseGym member account to explore coaches and chat with our AI health coach.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const upsert = useServerFn(upsertProfile);
  const { plan: initialPlan } = Route.useSearch();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already signed in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/member" });
    });
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<PlanName>(
    PLANS.find((p) => p.name === initialPlan)?.name ?? "Monthly",
  );

  async function handleGoogle() {
    setError(null);
    setBusy(true);
    try {
      const res = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + "/auth",
      });
      if (res.error) throw res.error;
      if (!res.redirected) navigate({ to: "/member" });
    } catch (err) {
      const host = window.location.hostname;
      const external = !host.endsWith("lovable.app") && host !== "localhost";
      setError(
        external
          ? "Google sign-in is only available on the official PulseGym site. Please use email and password here."
          : err instanceof Error
            ? err.message
            : "Google sign-in failed.",
      );
      setBusy(false);
    }
  }


  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        const { data, error: signErr } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin + "/member",
          },
        });
        if (signErr) throw signErr;
        // If signup requires email confirmation, session may be null
        if (data.session) {
          await upsert({
            data: {
              full_name: fullName,
              age: age ? Number(age) : null,
              gender,
              fitness_goal: goal ? `${goal} · Plan: ${selectedPlan}` : `Plan: ${selectedPlan}`,
              doctor_name: doctorName,
              doctor_email: doctorEmail || undefined,
            },
          });
          navigate({ to: "/member" });
        } else {
          setError("Check your inbox to confirm your email, then log in.");
          setMode("login");
        }
      } else {
        const { error: loginErr } = await supabase.auth.signInWithPassword({ email, password });
        if (loginErr) throw loginErr;
        navigate({ to: "/member" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[color:var(--ink)] text-white flex flex-col">
      <div className="container-x py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm"
        >
          <ArrowLeft size={16} /> Back to site
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-lg bg-white text-[color:var(--ink)] p-8 md:p-10 shadow-2xl">
          <h1 className="font-display text-4xl">
            {mode === "signup" ? "Join PulseGym" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-black/60">
            {mode === "signup"
              ? "Create your member account to meet your coach and chat with our AI health coach."
              : "Log in to your PulseGym member area."}
          </p>

          <div className="mt-6 flex gap-2 text-xs font-display tracking-widest">
            <button
              onClick={() => setMode("signup")}
              className={`px-4 py-2 border ${mode === "signup" ? "bg-[color:var(--ink)] text-white border-[color:var(--ink)]" : "border-black/20"}`}
            >
              SIGN UP
            </button>
            <button
              onClick={() => setMode("login")}
              className={`px-4 py-2 border ${mode === "login" ? "bg-[color:var(--ink)] text-white border-[color:var(--ink)]" : "border-black/20"}`}
            >
              LOG IN
            </button>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="mt-6 w-full flex items-center justify-center gap-3 border border-black/20 py-3 hover:bg-black/5 disabled:opacity-50"
          >
            <GoogleIcon /> Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-black/40">
            <div className="h-px flex-1 bg-black/10" /> OR{" "}
            <div className="h-px flex-1 bg-black/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" && (
              <>
                <Field label="Full name" value={fullName} onChange={setFullName} required />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Age" type="number" value={age} onChange={setAge} />
                  <SelectField
                    label="Gender"
                    value={gender}
                    onChange={setGender}
                    options={["", "Female", "Male", "Other", "Prefer not to say"]}
                  />
                </div>
                <SelectField
                  label="Fitness goal"
                  value={goal}
                  onChange={setGoal}
                  options={[
                    "",
                    "Lose weight",
                    "Build muscle",
                    "Improve strength",
                    "Rehab / recover from injury",
                    "General fitness & mobility",
                    "Athletic performance",
                  ]}
                />
                <Field label="Doctor's name" value={doctorName} onChange={setDoctorName} />
                <Field
                  label="Doctor's email"
                  type="email"
                  value={doctorEmail}
                  onChange={setDoctorEmail}
                />
                <div>
                  <span className="text-xs font-display tracking-widest text-black/60">
                    MEMBERSHIP PLAN
                  </span>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {PLANS.map((p) => {
                      const active = selectedPlan === p.name;
                      return (
                        <button
                          type="button"
                          key={p.name}
                          onClick={() => setSelectedPlan(p.name)}
                          className={`text-left border p-3 transition ${
                            active
                              ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-white"
                              : "border-black/20 hover:border-[color:var(--ink)]"
                          }`}
                        >
                          <div className="font-display text-sm">{p.name}</div>
                          <div className="font-display text-lg mt-1">{p.price}</div>
                          <div
                            className={`text-[10px] uppercase tracking-widest ${active ? "text-white/60" : "text-black/50"}`}
                          >
                            {p.per}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            <Field label="Email" type="email" value={email} onChange={setEmail} required />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              required
            />

            {error && <p className="text-sm text-[color:var(--blaze)]">{error}</p>}

            <button
              type="submit"
              disabled={busy}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-60"
            >
              {busy && <Loader2 className="animate-spin" size={16} />}
              {mode === "signup" ? "Create account" : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-display tracking-widest text-black/60">
        {label.toUpperCase()}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-black/20 px-3 py-2.5 focus:border-[color:var(--ink)] outline-none"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-xs font-display tracking-widest text-black/60">
        {label.toUpperCase()}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-black/20 px-3 py-2.5 bg-white focus:border-[color:var(--ink)] outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o || "— select —"}
          </option>
        ))}
      </select>
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
