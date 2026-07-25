import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_liri6br";
const EMAILJS_TEMPLATE_ID = "template_gg2mx7f";
const EMAILJS_PUBLIC_KEY = "nAsHaQs96w0LPCaSM";
import {
  ArrowRight, Download, Mail, Phone, MapPin, Github, Linkedin, Twitter,
  BarChart3, Database, LineChart, Code2, Trophy, Sparkles, GraduationCap,
  Briefcase, ChevronUp, ExternalLink, Send, Quote, Cpu, Brain, MessageSquare,
} from "lucide-react";
import profileAsset from "@/assets/profile-bio.jpg.asset.json";
import resumeAsset from "@/assets/ALADESUYI_PRAISE_CV.pdf.asset.json";
const profileImg = profileAsset.url;
const resumeUrl = resumeAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aladesuyi Praise Kolade — Data Analyst & Web Developer" },
      { name: "description", content: "Turning raw data into actionable insights. Portfolio of Aladesuyi Praise Kolade — Data Analyst, Computer Engineer, and modern web developer based in Ibadan, Nigeria." },
      { property: "og:title", content: "Aladesuyi Praise Kolade — Data Analyst & Web Developer" },
      { property: "og:description", content: "Turning raw data into actionable insights. Portfolio of Aladesuyi Praise Kolade — Data Analyst, Computer Engineer, and modern web developer based in Ibadan, Nigeria." },
    ],
  }),
  component: Portfolio,
});

const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function Portfolio() {
  const [scrolled, setScrolled] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrolled(pct);
      setShowTop(h.scrollTop > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip text-foreground">
      <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
        <div className="h-full btn-primary-grad transition-[width] duration-150" style={{ width: `${scrolled}%` }} />
      </div>

      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#2563EB]/25 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full bg-[#38BDF8]/20 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[#081C3A]/40 blur-3xl animate-blob" style={{ animationDelay: "-12s" }} />
      </div>

      <Header />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full glass hover:scale-110 transition"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]">
          <a href="#top" className="flex items-center gap-2 font-display font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg btn-primary-grad text-sm">A</span>
            <span className="hidden sm:inline">Aladesuyi<span className="text-[color:var(--cyan)]">.</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden sm:inline-flex items-center gap-2 rounded-xl btn-primary-grad px-4 py-2 text-sm font-medium">
              Hire me <ArrowRight className="h-4 w-4" />
            </a>
            <button onClick={() => setOpen(v => !v)} className="md:hidden grid h-9 w-9 place-items-center rounded-lg glass" aria-label="Menu">
              <div className="space-y-1.5">
                <span className="block h-0.5 w-4 bg-foreground" />
                <span className="block h-0.5 w-4 bg-foreground" />
              </div>
            </button>
          </div>
        </div>
        {open && (
          <div className="glass mt-2 rounded-2xl p-2 md:hidden animate-rise">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-white/5">{n.label}</a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-16 pb-24 sm:pt-24 sm:pb-32" style={{ backgroundImage: "var(--gradient-hero)" }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 lg:grid-cols-[1.15fr_1fr]">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-[color:var(--cyan)] shadow-[0_0_10px_var(--cyan)]" />
            Available for new projects
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Turning Data Into <br />
            <span className="gradient-text">Actionable Insights.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            I'm <span className="text-foreground font-medium">Aladesuyi Praise Kolade</span>, a Data Analyst and Computer Engineer helping businesses transform raw data into decisions through analytics, visualization, and intelligent tooling.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-xl btn-primary-grad px-5 py-3 text-sm font-semibold">
              View Portfolio <ArrowRight className="h-4 w-4" />
            </a>
            <a href={resumeUrl} download="ALADESUYI_PRAISE_CV.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm font-semibold hover:bg-white/10 transition">
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition">
              Contact Me
            </a>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {[
              { k: "2+", v: "Years experience" },
              { k: "4", v: "Featured projects" },
              { k: "10+", v: "Tools mastered" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-2xl p-4">
                <dt className="text-2xl font-bold gradient-text">{s.k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="glow-ring relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] glass">
            <img
              src={profileImg}
              alt="Aladesuyi Praise Kolade portrait"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent" />
          </div>

          <FloatCard className="-top-4 -left-6 sm:-left-10" icon={<BarChart3 className="h-4 w-4" />} title="Power BI" subtitle="Dashboards" delay="0s" />
          <FloatCard className="top-1/3 -right-4 sm:-right-8" icon={<Database className="h-4 w-4" />} title="SQL & Python" subtitle="Analytics" delay="-2s" />
          <FloatCard className="-bottom-4 left-4 sm:left-8" icon={<Trophy className="h-4 w-4" />} title="Sports Analytics" subtitle="Football insights" delay="-4s" />

          <div className="absolute -bottom-8 right-2 sm:right-0 glass rounded-2xl p-3 animate-float" style={{ animationDelay: "-3s" }}>
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><LineChart className="h-3.5 w-3.5 text-[color:var(--cyan)]" /> Revenue ↑ 34%</div>
            <svg viewBox="0 0 100 30" className="mt-1 h-8 w-32">
              <polyline fill="none" stroke="url(#g)" strokeWidth="2" points="0,22 12,18 24,20 36,12 48,15 60,8 72,10 84,4 100,6" />
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stopColor="#2563EB" />
                  <stop offset="1" stopColor="#38BDF8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatCard({ className = "", icon, title, subtitle, delay = "0s" }: { className?: string; icon: React.ReactNode; title: string; subtitle: string; delay?: string }) {
  return (
    <div className={`absolute glass rounded-2xl px-3 py-2.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] animate-float ${className}`} style={{ animationDelay: delay }}>
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-xl btn-primary-grad">{icon}</span>
        <div>
          <div className="text-xs font-semibold">{title}</div>
          <div className="text-[10px] text-muted-foreground">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
        <Sparkles className="h-3 w-3 text-[color:var(--cyan)]" /> {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeader eyebrow="About" title="Engineer by training, analyst by craft." subtitle="I love the moment raw numbers turn into a story leaders can act on." />
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="glass rounded-3xl p-8">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I'm a Computer Engineering graduate obsessed with solving real business problems using data. My work spans <span className="text-foreground">analytics, business intelligence, sports analytics,</span> and building modern web applications that ship. I care about clarity, speed, and decisions — not just charts.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Brain, label: "Analytics" },
              { icon: BarChart3, label: "BI" },
              { icon: Trophy, label: "Sports" },
              { icon: Code2, label: "Web" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center hover:border-[color:var(--cyan)]/40 transition">
                <Icon className="mx-auto h-5 w-5 text-[color:var(--cyan)]" />
                <div className="mt-2 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-8">
          <h3 className="flex items-center gap-2 text-lg font-semibold"><GraduationCap className="h-5 w-5 text-[color:var(--cyan)]" /> Education</h3>
          <ol className="mt-6 space-y-6 border-l border-white/10 pl-6">
            <TimelineItem title="B.Eng, Computer Engineering" org="Federal University Oye-Ekiti" time="Graduated 2025" />
            <TimelineItem title="Certificate of Achievement" org="ALX Africa" time="2026" />
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ title, org, time, children }: { title: string; org: string; time: string; children?: React.ReactNode }) {
  return (
    <li className="relative">
      <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full btn-primary-grad ring-4 ring-[#050816]" />
      <div className="text-sm text-[color:var(--cyan)]">{time}</div>
      <div className="mt-1 font-semibold">{title}</div>
      <div className="text-sm text-muted-foreground">{org}</div>
      {children && <div className="mt-3 text-sm text-muted-foreground">{children}</div>}
    </li>
  );
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeader eyebrow="Experience" title="A short but focused journey." />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl p-8 hover:-translate-y-1 transition">
          <div className="flex items-center gap-3 text-[color:var(--cyan)] text-xs uppercase tracking-widest"><Briefcase className="h-4 w-4" /> July 2026 – Present</div>
          <h3 className="mt-3 text-2xl font-bold">Data Analyst</h3>
          <div className="text-muted-foreground">Cloudware Technologies</div>
          <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
            {["Data cleaning and modeling","SQL analysis at scale","Python analytics (Pandas/NumPy)","Power BI dashboards","Excel reporting","Business insights & storytelling"].map(x => (
              <li key={x} className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--cyan)]" /> {x}</li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-3xl p-8 hover:-translate-y-1 transition">
          <div className="flex items-center gap-3 text-[color:var(--cyan)] text-xs uppercase tracking-widest"><Briefcase className="h-4 w-4" /> April 2024 – August 2024</div>
          <h3 className="mt-3 text-2xl font-bold">ICT Intern</h3>
          <div className="text-muted-foreground">ICT Unit — Federal University Oye-Ekiti</div>
          <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
            {["Technical support","Hardware troubleshooting","Software installation","Network support"].map(x => (
              <li key={x} className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--cyan)]" /> {x}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const skillGroups = [
  {
    icon: BarChart3, name: "Analytics",
    items: [
      { k: "Data Analysis", v: 92 },
      { k: "Data Cleaning", v: 90 },
      { k: "Statistics", v: 82 },
      { k: "Dashboard Development", v: 88 },
      { k: "Data Visualization", v: 90 },
    ],
  },
  {
    icon: Cpu, name: "Tools",
    items: [
      { k: "Excel", v: 95 },
      { k: "SQL", v: 88 },
      { k: "Power BI", v: 90 },
      { k: "Python (Pandas, NumPy, Matplotlib)", v: 85 },
    ],
  },
  {
    icon: MessageSquare, name: "Soft Skills",
    items: [
      { k: "Communication", v: 92 },
      { k: "Problem Solving", v: 94 },
      { k: "Critical Thinking", v: 90 },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeader eyebrow="Skills" title="The stack behind the insights." />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <div key={g.name} className="glass rounded-3xl p-7 hover:-translate-y-1 transition">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl btn-primary-grad"><g.icon className="h-5 w-5" /></span>
              <h3 className="text-lg font-semibold">{g.name}</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {g.items.map((it) => (
                <li key={it.k}>
                  <div className="flex items-center justify-between text-sm">
                    <span>{it.k}</span>
                    <span className="text-muted-foreground">{it.v}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full btn-primary-grad bar-grow" style={{ width: `${it.v}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

const services = [
  { icon: BarChart3, title: "Data Analysis", desc: "Transform raw datasets into actionable business insights — from cleaning to storytelling." },
  { icon: Trophy, title: "Sports Data Analysis", desc: "Football and sports performance analytics using player metrics, models, and visualization." },
  { icon: Code2, title: "Web Development", desc: "Responsive, fast, modern websites and dashboards built with React, HTML, CSS, and JavaScript." },
];

function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeader eyebrow="Services" title="What I can build for you." />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="group relative overflow-hidden glass rounded-3xl p-7 hover:-translate-y-1 transition">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[color:var(--cyan)]/10 blur-2xl group-hover:bg-[color:var(--cyan)]/25 transition" />
            <span className="grid h-12 w-12 place-items-center rounded-2xl btn-primary-grad"><s.icon className="h-6 w-6" /></span>
            <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            <div className="mt-6 inline-flex items-center gap-1 text-sm text-[color:var(--cyan)]">Learn more <ArrowRight className="h-4 w-4" /></div>
          </div>
        ))}
      </div>
    </section>
  );
}

const projects = [
  {
    title: "Premier League Analytics Dashboard",
    desc: "Football analytics dashboard: team performance, player stats, and league trends via interactive visualizations.",
    tags: ["Python", "SQL", "Power BI"],
    accent: "from-[#2563EB] to-[#38BDF8]",
    icon: Trophy,
  },
  {
    title: "Sales Performance Dashboard",
    desc: "Interactive Power BI dashboard monitoring KPIs, sales trends, and business performance in real time.",
    tags: ["Power BI", "Excel"],
    accent: "from-[#0EA5E9] to-[#22D3EE]",
    icon: BarChart3,
  },
  {
    title: "HarvestHub Website",
    desc: "A responsive agri-tech marketplace connecting farmers and buyers through a modern web platform.",
    tags: ["React", "HTML", "CSS", "JavaScript"],
    accent: "from-[#22D3EE] to-[#2563EB]",
    icon: Code2,
  },
  {
    title: "Pulse Gym Website",
    desc: "Modern fitness website with membership features, class schedules, and responsive design.",
    tags: ["React", "HTML", "CSS", "JavaScript"],
    accent: "from-[#38BDF8] to-[#2563EB]",
    icon: Code2,
  },
];

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeader eyebrow="Featured Projects" title="Selected work." subtitle="A mix of analytics dashboards and modern web builds." />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <article key={p.title} className="group relative overflow-hidden glass rounded-3xl p-6 hover:-translate-y-1 transition">
            <div className={`relative h-44 overflow-hidden rounded-2xl bg-gradient-to-br ${p.accent}`}>
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)", backgroundSize: "24px 24px, 32px 32px" }} />
              <MockChart />
              <p.icon className="absolute right-4 top-4 h-6 w-6 text-white/90" />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <div className="flex gap-2 shrink-0">
                <a href="#" aria-label="Live demo" className="grid h-9 w-9 place-items-center rounded-lg glass hover:bg-white/10 transition"><ExternalLink className="h-4 w-4" /></a>
                <a href="https://github.com/Aladesuyi20" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-lg glass hover:bg-white/10 transition"><Github className="h-4 w-4" /></a>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MockChart() {
  const bars = [45, 62, 38, 78, 55, 88, 70, 92];
  return (
    <div className="absolute bottom-4 left-4 right-4 flex h-24 items-end gap-1.5">
      {bars.map((b, i) => (
        <div key={i} className="flex-1 rounded-t-md bg-white/70 backdrop-blur" style={{ height: `${b}%` }} />
      ))}
    </div>
  );
}

const testimonials = [
  { name: "Team Lead", role: "Cloudware Technologies", quote: "Praise transformed our reporting stack. Dashboards that used to take weeks now take days — and they actually get used." },
  { name: "Project Manager", role: "Agri-tech Startup", quote: "Shipped clean, fast, and pixel-perfect. Rare combination of analytical mind and product taste." },
  { name: "Faculty Supervisor", role: "FUOYE", quote: "One of the most self-driven engineers I've worked with. Turns questions into decisions, quickly." },
];

function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeader eyebrow="Testimonials" title="Kind words." />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="glass rounded-3xl p-7 hover:-translate-y-1 transition">
            <Quote className="h-6 w-6 text-[color:var(--cyan)]" />
            <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.quote}"</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full btn-primary-grad text-sm font-bold">{t.name[0]}</div>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setErrorMsg("");
    try {
      const fd = new FormData(form);
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: String(fd.get("name") ?? ""),
          from_email: String(fd.get("email") ?? ""),
          subject: String(fd.get("subject") ?? "Portfolio contact"),
          message: String(fd.get("message") ?? ""),
          reply_to: String(fd.get("email") ?? ""),
          to_email: "praisealadesuyi@gmail.com",
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  }

  const contacts = [
    { icon: Mail, label: "Email", value: "praisealadesuyi@gmail.com", href: "mailto:praisealadesuyi@gmail.com" },
    { icon: Phone, label: "Phone", value: "+234 903 764 4116", href: "tel:+2349037644116" },
    { icon: MapPin, label: "Location", value: "Ibadan, Oyo State, Nigeria" },
  ];
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeader eyebrow="Contact" title="Let's build something meaningful." subtitle="Have a dataset that needs a story, or a product that needs shipping? Say hello." />
      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="glass rounded-3xl p-8">
          <h3 className="text-lg font-semibold">Get in touch</h3>
          <ul className="mt-6 space-y-4">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl glass"><Icon className="h-4 w-4 text-[color:var(--cyan)]" /></span>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
                  {href ? <a href={href} className="text-sm hover:text-[color:var(--cyan)] break-all">{value}</a> : <div className="text-sm">{value}</div>}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-2">
            <SocialLink href="https://www.linkedin.com/in/aladesuyi-kolade-957b70189" label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialLink>
            <SocialLink href="https://github.com/Aladesuyi20" label="GitHub"><Github className="h-4 w-4" /></SocialLink>
            <SocialLink href="https://x.com/codewithperry" label="X"><Twitter className="h-4 w-4" /></SocialLink>
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass rounded-3xl p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your full name" required />
            <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
          </div>
          <Field label="Subject" name="subject" placeholder="What's this about?" className="mt-4" />
          <div className="mt-4">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
            <textarea required rows={5} name="message" placeholder="Tell me a bit about the project..." className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-[color:var(--cyan)]/60 focus:ring-2 focus:ring-[color:var(--cyan)]/20 transition" />
          </div>
          <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex items-center gap-2 rounded-xl btn-primary-grad px-5 py-3 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed">
            {status === "sending" && "Sending..."}
            {status === "sent" && "Message sent ✓"}
            {status === "error" && "Try again"}
            {status === "idle" && (<>Send message <Send className="h-4 w-4" /></>)}
          </button>
          {status === "error" && (
            <p className="mt-3 text-sm text-red-400">{errorMsg}</p>
          )}
          {status === "sent" && (
            <p className="mt-3 text-sm text-[color:var(--cyan)]">Thanks! I'll get back to you soon.</p>
          )}
        </form>
      </div>
    </section>
  );
}


function Field({ label, className = "", ...props }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input required {...props} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-[color:var(--cyan)]/60 focus:ring-2 focus:ring-[color:var(--cyan)]/20 transition" />
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-xl glass hover:bg-white/10 hover:-translate-y-0.5 transition">{children}</a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 mt-10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2 font-display font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg btn-primary-grad text-sm">A</span>
            aladesuyikolade.dev
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-foreground transition">{n.label}</a>
            ))}
          </nav>
          <div className="flex gap-2">
            <SocialLink href="https://www.linkedin.com/in/aladesuyi-kolade-957b70189" label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialLink>
            <SocialLink href="https://github.com/Aladesuyi20" label="GitHub"><Github className="h-4 w-4" /></SocialLink>
            <SocialLink href="https://x.com/codewithperry" label="X"><Twitter className="h-4 w-4" /></SocialLink>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Designed & Built by <span className="gradient-text font-semibold">ALADESUYI PRAISE KOLADE</span> © 2026
        </p>
      </div>
    </footer>
  );
}
