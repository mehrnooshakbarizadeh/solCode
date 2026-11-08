"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const signup = mode === "signup";

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMsg("");
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")), password = String(f.get("password"));
    try {
      const supabase = createClient();
      if (signup) {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/auth/callback` } });
        setMsg(error ? error.message : "Almost there! Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setMsg(error.message); else { router.push("/profile"); router.refresh(); }
      }
    } catch {
      setMsg("Sign-in isn’t set up yet. Add your Supabase keys to .env.local (see README).");
    }
    setBusy(false);
  }

  return (
    <main className="mx-auto grid min-h-[70svh] max-w-sm content-center gap-4 px-[5vw] py-12">
      <h1 className="text-3xl font-extrabold tracking-tight">{signup ? "Create your profile" : "Welcome back"}</h1>
      <form onSubmit={submit} className="grid gap-3">
        <input className="field" name="email" type="email" placeholder="Email" autoComplete="email" required aria-label="Email" />
        <input className="field" name="password" type="password" placeholder="Password (8+ characters)" minLength={8} autoComplete={signup ? "new-password" : "current-password"} required aria-label="Password" />
        <button className="btn btn-p" disabled={busy}>{busy ? "Please wait…" : signup ? "Create profile" : "Log in"}</button>
      </form>
      <p role="status" className="min-h-6 text-sm font-semibold text-b">{msg}</p>
      <p className="text-sm text-mut">{signup ? "Already have a profile? " : "New here? "}<Link className="underline" href={signup ? "/login" : "/signup"}>{signup ? "Log in" : "Create one"}</Link></p>
    </main>
  );
}
