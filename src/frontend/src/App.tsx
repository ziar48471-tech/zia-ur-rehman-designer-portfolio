import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Figma,
  Instagram,
  Layout,
  Linkedin,
  Loader2,
  Mail,
  Menu,
  Monitor,
  Palette,
  Send,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiBehance } from "react-icons/si";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

// ── Animation variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Scroll-aware section wrapper ───────────────────────────
function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Nav ──────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-[0_1px_30px_oklch(0.05_0_0/0.5)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group"
          aria-label="Go to top"
        >
          <div className="w-10 h-10 rounded-xl gradient-violet-border flex items-center justify-center glow-violet-sm">
            <span className="font-display font-black text-sm text-white tracking-tight">
              ZR
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="font-heading font-bold text-sm text-foreground leading-tight">
              Zia ur Rehman
            </p>
            <p className="font-body text-[11px] text-muted-foreground leading-tight">
              Designer
            </p>
          </div>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-surface-2"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={() => scrollTo("#contact")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold text-sm px-5 py-2 rounded-xl glow-violet-sm transition-all duration-300 hover:shadow-glow"
          >
            Hire Me
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-surface-2 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border"
          >
            <ul className="container px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="w-full text-left px-4 py-3 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-surface-2 flex items-center justify-between"
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  onClick={() => scrollTo("#contact")}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold rounded-xl"
                >
                  Hire Me
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── Hero ─────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const stats = [
    { value: "4+", label: "Years Experience" },
    { value: "100+", label: "Projects Completed" },
    { value: "50+", label: "Happy Clients" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center mesh-bg noise-overlay overflow-hidden pt-20">
      {/* Decorative orbs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.24 295) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.2 250) 0%, transparent 70%)",
        }}
      />

      <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col items-center gap-6"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp}>
            <span className="section-label inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-DEFAULT/30 bg-violet-DEFAULT/10">
              ✦ Available for Freelance
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-foreground max-w-3xl"
          >
            Hi, I'm <span className="text-gradient-violet">Zia ur Rehman</span>{" "}
            — <span className="block sm:inline">Graphic & UI/UX Designer</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            I create visually powerful designs and user-focused digital
            experiences that help brands grow.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              onClick={() => scrollTo("#portfolio")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold text-base px-8 py-6 rounded-xl glow-violet shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_oklch(0.65_0.28_290/0.5)]"
            >
              View My Work
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => scrollTo("#contact")}
              size="lg"
              variant="outline"
              className="font-heading font-bold text-base px-8 py-6 rounded-xl border-border hover:border-violet-DEFAULT/50 hover:bg-surface-2 transition-all duration-300 hover:scale-105"
            >
              Hire Me
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col items-center gap-1 p-4 rounded-2xl surface-card"
            >
              <span className="stat-num text-gradient-violet">
                {stat.value}
              </span>
              <span className="font-body text-xs sm:text-sm text-muted-foreground text-center leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-violet-DEFAULT/50 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}

// ── About ────────────────────────────────────────────────────
function About() {
  const highlights = [
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Brand Storytelling",
      desc: "Crafting identities that resonate",
    },
    {
      icon: <Layout className="w-5 h-5" />,
      title: "UI Excellence",
      desc: "Pixel-perfect digital interfaces",
    },
    {
      icon: <Figma className="w-5 h-5" />,
      title: "Figma Expert",
      desc: "Full design system workflows",
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      title: "High Conversion",
      desc: "Design that drives results",
    },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Section header */}
        <FadeInSection className="text-center mb-16">
          <span className="section-label">About Me</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl mt-3 text-foreground">
            Designing the Future,{" "}
            <span className="text-gradient-violet">One Pixel at a Time</span>
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Bio */}
          <FadeInSection>
            <div className="space-y-6">
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                With{" "}
                <strong className="text-foreground font-semibold">
                  4+ years of experience
                </strong>{" "}
                crafting compelling visual narratives, I specialise in bridging
                the gap between aesthetics and functionality. Every project I
                take on is driven by a deep understanding of user psychology and
                brand identity.
              </p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                From bold logo systems to seamless mobile app interfaces, I
                bring a precision-first mindset to every deliverable. My work
                spans{" "}
                <strong className="text-foreground font-semibold">
                  branding, social media design, YouTube thumbnails, website UI,
                  landing pages,
                </strong>{" "}
                and{" "}
                <strong className="text-foreground font-semibold">
                  mobile app design
                </strong>
                .
              </p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                My focus is always on{" "}
                <strong className="text-foreground font-semibold">
                  clean, modern, high-converting design
                </strong>{" "}
                that doesn't just look good — it performs.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  "Figma",
                  "Adobe Illustrator",
                  "Photoshop",
                  "After Effects",
                  "Framer",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 text-xs font-body font-medium rounded-full border border-border bg-surface-2 text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Right: Highlight cards */}
          <FadeInSection delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-2xl surface-card border border-border hover:border-violet-DEFAULT/40 transition-all duration-300 hover:shadow-card-hover group cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-DEFAULT/15 flex items-center justify-center text-violet-bright mb-4 group-hover:bg-violet-DEFAULT/25 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-heading font-bold text-sm text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ── Skills ───────────────────────────────────────────────────
function Skills() {
  const categories = [
    {
      title: "Graphic Design",
      icon: <Palette className="w-6 h-6" />,
      skills: [
        "Logo Design",
        "Social Media Posts",
        "YouTube Thumbnails",
        "Branding",
        "Ad Creatives",
      ],
      color: "from-violet-DEFAULT/20 to-electric-blue/10",
    },
    {
      title: "UI/UX Design",
      icon: <Figma className="w-6 h-6" />,
      skills: [
        "Website UI Design",
        "Landing Pages",
        "Mobile App UI",
        "Dashboard Design",
        "Wireframing & Prototyping",
      ],
      color: "from-electric-blue/20 to-violet-DEFAULT/10",
    },
  ];

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-surface-1/50">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 30% 50%, oklch(0.68 0.24 295 / 0.06) 0%, transparent 60%)",
        }}
      />
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <FadeInSection className="text-center mb-16">
          <span className="section-label">My Skills</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl mt-3 text-foreground">
            Crafted with <span className="text-gradient-violet">Expertise</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
            A full-stack creative toolkit spanning brand identity to interactive
            digital experiences.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <FadeInSection key={cat.title} delay={idx * 0.15}>
              <div
                className={`relative overflow-hidden rounded-2xl p-8 border border-border bg-gradient-to-br ${cat.color} hover:border-violet-DEFAULT/40 transition-all duration-300 hover:shadow-card-hover group`}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl gradient-violet-border flex items-center justify-center text-white glow-violet-sm">
                    {cat.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills as tags */}
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-xl text-sm font-body font-medium bg-surface-1/80 border border-border text-foreground hover:border-violet-DEFAULT/50 hover:bg-violet-DEFAULT/10 hover:text-violet-bright transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Portfolio ─────────────────────────────────────────────────
type Category = "All" | "Graphic Design" | "UI/UX";

const projects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "UI/UX" as const,
    image: "/assets/generated/portfolio-ux-dashboard.dim_800x600.jpg",
    tags: ["Dashboard", "UI Design"],
  },
  {
    id: 2,
    title: "Brand Identity System",
    category: "Graphic Design" as const,
    image: "/assets/generated/portfolio-branding.dim_800x600.jpg",
    tags: ["Branding", "Logo"],
  },
  {
    id: 3,
    title: "ShopEase Mobile App",
    category: "UI/UX" as const,
    image: "/assets/generated/portfolio-mobile-app.dim_800x600.jpg",
    tags: ["Mobile", "UI/UX"],
  },
  {
    id: 4,
    title: "Tech Review Thumbnail",
    category: "Graphic Design" as const,
    image: "/assets/generated/portfolio-thumbnail.dim_800x600.jpg",
    tags: ["Thumbnail", "YouTube"],
  },
  {
    id: 5,
    title: "CloudFlow Landing Page",
    category: "UI/UX" as const,
    image: "/assets/generated/portfolio-landing-page.dim_800x600.jpg",
    tags: ["Landing Page", "SaaS"],
  },
  {
    id: 6,
    title: "FitLife Social Campaign",
    category: "Graphic Design" as const,
    image: "/assets/generated/portfolio-social-media.dim_800x600.jpg",
    tags: ["Social Media", "Branding"],
  },
];

function PortfolioCard({ project }: { project: (typeof projects)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative group rounded-2xl overflow-hidden surface-card border border-border hover:border-violet-DEFAULT/40 hover:shadow-card-hover transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.button
                type="button"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary font-heading font-bold text-sm text-primary-foreground glow-violet-sm hover:shadow-glow transition-all"
              >
                View Project
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display font-bold text-base text-foreground leading-tight">
            {project.title}
          </h3>
          <Badge
            variant="secondary"
            className="shrink-0 text-xs font-body bg-violet-DEFAULT/15 text-violet-bright border-violet-DEFAULT/30"
          >
            {project.category}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs font-body text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const categories: Category[] = ["All", "Graphic Design", "UI/UX"];

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 md:py-32">
      <div className="container max-w-6xl mx-auto px-6">
        <FadeInSection className="text-center mb-12">
          <span className="section-label">My Work</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl mt-3 text-foreground">
            Selected <span className="text-gradient-violet">Projects</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
            A curated selection of client work spanning graphic design and
            digital UI/UX.
          </p>
        </FadeInSection>

        {/* Filter tabs */}
        <FadeInSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-heading font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "gradient-violet-border text-white glow-violet-sm shadow-glow"
                    : "border border-border text-muted-foreground hover:border-violet-DEFAULT/40 hover:text-foreground hover:bg-surface-2"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeInSection>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ── Testimonials ─────────────────────────────────────────────
const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Director",
    avatar: "SM",
    text: "Zia transformed our brand identity completely. His attention to detail and creative vision are unmatched. The designs he delivered exceeded every expectation.",
    company: "BrandLift Agency",
  },
  {
    name: "Ahmed Khan",
    role: "Startup Founder",
    avatar: "AK",
    text: "Working with Zia was a game-changer. He understood our vision instantly and delivered stunning UI designs that our users absolutely love.",
    company: "TechVentures",
  },
  {
    name: "Emma Rodriguez",
    role: "E-commerce Owner",
    avatar: "ER",
    text: "Zia's social media designs increased our engagement by 300%. He's professional, fast, and incredibly talented. Highly recommend!",
    company: "StyleBoutique",
  },
];

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 bg-surface-1/50"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 70% 50%, oklch(0.68 0.2 250 / 0.06) 0%, transparent 60%)",
        }}
      />
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <FadeInSection className="text-center mb-16">
          <span className="section-label">Testimonials</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl mt-3 text-foreground">
            What Clients <span className="text-gradient-violet">Say</span>
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <FadeInSection key={t.name} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="p-8 rounded-2xl surface-card border border-border hover:border-violet-DEFAULT/40 hover:shadow-card-hover transition-all duration-300 flex flex-col gap-6 h-full"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {["s1", "s2", "s3", "s4", "s5"].map((sk) => (
                    <Star
                      key={sk}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-body text-muted-foreground leading-relaxed flex-1">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-violet-border flex items-center justify-center">
                    <span className="font-heading font-bold text-xs text-white">
                      {t.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-foreground">
                      {t.name}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────
function Contact() {
  const { actor } = useActor();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email address";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await actor?.submitMessage(form.name, form.email, form.message);
      setSubmitted(true);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const socialLinks = [
    {
      label: "Email",
      value: "zia.designer@email.com",
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:zia.designer@email.com",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/zia-designer",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com",
    },
    {
      label: "Behance",
      value: "behance.net/zia-designer",
      icon: <SiBehance className="w-5 h-5" />,
      href: "https://behance.net",
    },
    {
      label: "Instagram",
      value: "@zia.designer",
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com",
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-DEFAULT/30 to-transparent"
      />
      <div className="container max-w-6xl mx-auto px-6">
        <FadeInSection className="text-center mb-16">
          <span className="section-label">Contact</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl mt-3 text-foreground">
            Let's Work <span className="text-gradient-violet">Together</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's create something amazing.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Contact info */}
          <FadeInSection>
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Get in Touch
                </h3>
                <p className="font-body text-muted-foreground">
                  I'm currently available for freelance projects and full-time
                  opportunities. Let's discuss your next project.
                </p>
              </div>

              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={
                      link.href.startsWith("mailto") ? undefined : "_blank"
                    }
                    rel="noopener noreferrer"
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 p-4 rounded-2xl surface-card border border-border hover:border-violet-DEFAULT/40 hover:bg-surface-2 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-violet-DEFAULT/15 flex items-center justify-center text-violet-bright group-hover:bg-violet-DEFAULT/25 transition-colors shrink-0">
                      {link.icon}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                        {link.label}
                      </p>
                      <p className="font-body text-sm text-foreground">
                        {link.value}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Right: Contact form */}
          <FadeInSection delay={0.15}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center h-full min-h-[400px] p-8 rounded-2xl surface-card border border-violet-DEFAULT/30 glow-violet"
                >
                  <div className="w-16 h-16 rounded-2xl gradient-violet-border flex items-center justify-center mb-6 glow-violet">
                    <Send className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                    Message Sent!
                  </h3>
                  <p className="font-body text-muted-foreground mb-6">
                    Thank you for reaching out. I'll get back to you within 24
                    hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="rounded-xl border-violet-DEFAULT/40 hover:bg-surface-2"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5 p-8 rounded-2xl surface-card border border-border"
                >
                  {/* Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="font-heading font-semibold text-sm text-foreground"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="John Smith"
                      className={`rounded-xl bg-surface-2 border-border focus:border-violet-DEFAULT/60 focus:ring-violet-DEFAULT/30 transition-colors ${
                        errors.name ? "border-destructive" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive font-body">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="font-heading font-semibold text-sm text-foreground"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="john@example.com"
                      className={`rounded-xl bg-surface-2 border-border focus:border-violet-DEFAULT/60 focus:ring-violet-DEFAULT/30 transition-colors ${
                        errors.email ? "border-destructive" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive font-body">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="font-heading font-semibold text-sm text-foreground"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      placeholder="Tell me about your project..."
                      rows={5}
                      className={`rounded-xl bg-surface-2 border-border focus:border-violet-DEFAULT/60 focus:ring-violet-DEFAULT/30 transition-colors resize-none ${
                        errors.message ? "border-destructive" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive font-body">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold rounded-xl py-6 glow-violet-sm hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  const navLinks = ["About", "Skills", "Portfolio", "Testimonials", "Contact"];
  const scrollTo = (id: string) =>
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative border-t border-border bg-surface-1/80 backdrop-blur-sm">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-violet-border flex items-center justify-center">
              <span className="font-display font-black text-xs text-white">
                ZR
              </span>
            </div>
            <span className="font-heading font-bold text-sm text-foreground">
              Zia ur Rehman
            </span>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link)}
                    className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <p className="font-body text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Zia ur Rehman. All rights reserved.
          </p>
        </div>

        {/* Caffeine attribution */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="font-body text-xs text-muted-foreground/60">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-bright transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  // Set dark mode class on html
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Portfolio />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
