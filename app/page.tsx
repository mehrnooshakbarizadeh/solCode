import Link from "next/link";
import type { CSSProperties } from "react";
import ParticleCanvas from "@/components/ParticleCanvas";
import Typewriter from "@/components/Typewriter";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

const words = ["websites", "web apps", "AI tools", "experiences"];
const skills = [
  { icon: "⚛️", title: "React & TypeScript", text: "Type-safe, component-driven interfaces.", level: 92, color: "var(--c)" },
  { icon: "🤖", title: "AI integration", text: "Chatbots, smart search and content tools.", level: 80, color: "var(--a)" },
  { icon: "🚀", title: "Speed & SEO", text: "Core Web Vitals and structured data.", level: 88, color: "var(--b)" },
  { icon: "🎨", title: "Creative UI", text: "Motion, color and details that delight.", level: 85, color: "var(--d)" },
];
// TODO: replace with real projects (later loaded from the Supabase "projects" table)
const works = [
  { title: "Local business site", text: "Restaurant website with online menu", bg: "linear-gradient(135deg,var(--a),var(--d))", tags: ["React", "SEO"] },
  { title: "AI booking assistant", text: "Chat assistant for a tourism startup", bg: "linear-gradient(135deg,var(--c),var(--b))", tags: ["TypeScript", "AI"] },
  { title: "Online store", text: "Handmade crafts with secure payments", bg: "linear-gradient(135deg,var(--b),var(--c))", tags: ["Node", "Payments"] },
];
const steps = [
  ["Talk", "You tell me your idea and goals. The first call is free."],
  ["Design", "I propose colors, layout and a clear quote."],
  ["Build", "Fast, SEO-ready, mobile-first development."],
  ["Launch", "Go live, track results and keep improving."],
];
const sec = "mx-auto max-w-[1150px] px-[5vw] py-[clamp(3rem,9vw,5.6rem)]";
const grid = "grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))]";
const h2 = "text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-tight";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "ProfessionalService", name: "Solcode",
    founder: { "@type": "Person", name: "Mehrnoosh", jobTitle: "Freelance web developer" },
    areaServed: "Portugal", description: "Websites and web apps built with React, TypeScript and AI.",
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative grid min-h-[88svh] place-items-center overflow-hidden px-[5vw] py-16 text-center">
        <ParticleCanvas />
        <div className="relative max-w-3xl">
          <span className="inline-block rounded-full border border-line bg-card px-3.5 py-1.5 text-[13px] text-mut">✦ Freelance web developer · Open for projects</span>
          <h1 className="my-5 text-[clamp(2.4rem,7vw,4.75rem)] font-extrabold leading-[1.05] tracking-tight">
            I build <span className="grad"><Typewriter words={words} /></span><br />people remember.
          </h1>
          <p className="mx-auto mb-7 max-w-xl text-[clamp(1rem,2.2vw,1.2rem)] text-mut">
            Hi, I’m <b className="text-fg">Mehrnoosh</b>, the developer behind Solcode. If you need a website that’s fast, beautiful and found on Google, you’re in the right place. I mix clean code, creative design and AI to make it happen.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a className="btn btn-p" href="#work">See my work</a>
            <Link className="btn btn-g" href="/signup">Start your project</Link>
          </div>
        </div>
      </section>

      <section id="skills" className={sec}>
        <h2 className={h2}>What I bring to the table</h2>
        <p className="mb-9 text-mut">Move your mouse over the cards, they react.</p>
        <Reveal className={grid}>
          {skills.map((s) => (
            <TiltCard key={s.title} className="card">
              <div className="ic" style={{ background: s.color }}>{s.icon}</div>
              <h3>{s.title}</h3><p>{s.text}</p>
              <div className="bar"><i style={{ "--w": `${s.level}%`, background: s.color } as CSSProperties} /></div>
            </TiltCard>
          ))}
        </Reveal>
      </section>

      <section id="work" className={sec}>
        <h2 className={h2}>Selected work</h2>
        <p className="mb-9 text-mut">A mix of businesses, brands and ideas. Every one is different.</p>
        <div className={grid}>
          {works.map((w) => (
            <TiltCard key={w.title} className="card work" style={{ background: w.bg }}>
              <h3>{w.title}</h3><p>{w.text}</p>
              <div className="mt-3">{w.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            </TiltCard>
          ))}
        </div>
      </section>

      <section id="about" className={`${sec} grid items-center gap-10 md:grid-cols-[240px_1fr]`}>
        <div className="pic mx-auto w-full max-w-[220px] md:max-w-none">Your photo goes here</div>
        <div>
          <h2 className={h2}>Who’s behind the code?</h2>
          <p className="mt-3 max-w-prose text-mut">Write your story here: where you’re from, what drives you, why you chose development and how AI helps you deliver more value to clients. Visitors want to trust a real person, so keep it warm and honest.</p>
          <p className="mt-3 max-w-prose text-mut">You’ll find portfolio samples, a short bio, pictures and ways to reach me on this site. Whatever your project, small or big, you’re welcome.</p>
        </div>
      </section>

      <section className={sec}>
        <h2 className={h2}>How we work together</h2>
        <p className="mb-9 text-mut">Simple, transparent, no surprises.</p>
        <ol className={grid}>
          {steps.map(([t, d], i) => (
            <li key={t} className="card">
              <span className="mb-1.5 block text-3xl font-extrabold text-c">0{i + 1}</span>
              <h3>{t}</h3><p>{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={sec}>
        <div className="card px-[5vw] py-12 text-center" style={{ borderRadius: 28 }}>
          <h2 className={h2}>Create your free profile</h2>
          <p className="mx-auto mb-6 mt-2 max-w-md text-mut">Save favorites, follow your project progress and message me directly. It takes 10 seconds.</p>
          <Link className="btn btn-p" href="/signup">Get started</Link>
        </div>
      </section>
    </main>
  );
}
