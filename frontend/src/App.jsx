
import { useState } from "react";
import Admin from "./Admin";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  ArrowUpRight,
  Menu,
  X,
  Globe,
  Workflow,
  TrendingUp,
  Code2,
  Check,
  MoveRight,
  Sparkles,
  ShieldCheck,
  Zap,
  MessageCircle,
} from "lucide-react";
import "./index.css";

const services = [
  {
    icon: Globe,
    number: "01",
    title: "Websites that win trust",
    description:
      "Fast, thoughtful websites that turn your first impression into a lasting business relationship.",
    tags: ["Web Design", "Development", "E-commerce"],
  },
  {
    icon: Workflow,
    number: "02",
    title: "Automation that frees you",
    description:
      "Connect your tools, simplify repetitive work and give your team more time to focus on growth.",
    tags: ["AI Workflows", "Integrations", "Automation"],
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Growth that compounds",
    description:
      "Build a stronger digital presence with better discoverability and customer journeys.",
    tags: ["SEO", "Conversion", "Strategy"],
  },
  {
    icon: Code2,
    number: "04",
    title: "Technology built around you",
    description:
      "Purpose-built web applications designed around your business processes and real needs.",
    tags: ["Web Apps", "APIs", "Custom Tools"],
  },
];

const projects = [
  {
    number: "01",
    category: "D2C · E-COMMERCE",
    title: "A better way to shop online.",
    description:
      "A concept storefront focused on clear product discovery and a frictionless shopping journey.",
    className: "project-red",
    label: "Commerce, reimagined",
  },
  {
    number: "02",
    category: "SERVICES · AUTOMATION",
    title: "Less busywork. More business.",
    description:
      "A concept workflow that brings incoming enquiries and follow-ups into one simple system.",
    className: "project-dark",
    label: "Work, simplified",
  },
  {
    number: "03",
    category: "STARTUPS · DIGITAL",
    title: "An idea ready for the world.",
    description:
      "A concept digital experience for a growing startup with a clear story and focused calls to action.",
    className: "project-lime",
    label: "Built to move forward",
  },
];

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link
          to="/"
          className="brand"
          aria-label="Ethixweb home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">e.</span>
          <span>ethixweb<span className="brand-period">.</span></span>
        </Link>

        <nav className={`nav-links ${open ? "nav-open" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={location.pathname === link.to ? "nav-active" : ""}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="button button-red nav-mobile-cta"
            onClick={() => setOpen(false)}
          >
            Start a project <ArrowUpRight size={16} />
          </Link>
        </nav>

        <Link to="/contact" className="button button-red nav-cta">
          Let's talk <ArrowUpRight size={16} />
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark">e.</span>
            <span>ethixweb<span className="brand-period">.</span></span>
          </Link>
          <p className="footer-description">
            Thoughtful digital experiences for ambitious businesses.
            Built with purpose, wherever you are.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span className="footer-label">EXPLORE</span>
            <Link to="/services">Services</Link>
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
  <span className="footer-label">LET'S CONNECT</span>
  <Link to="/contact">
    Start a project <ArrowUpRight size={14} />
  </Link>
  <Link to="/admin">Admin Login</Link>
</div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Ethixweb. All rights reserved.</span>
        <span>Made for what comes next.</span>
      </div>
    </footer>
  );
}

function CTA({ title = "Have a good idea? Let's make it real." }) {
  return (
    <section className="cta-section">
      <div className="cta-inner">
        <span className="eyebrow eyebrow-light">
          <Sparkles size={14} /> YOUR NEXT CHAPTER STARTS HERE
        </span>
        <h2>{title}</h2>
        <p>
          Tell us where you want to go. Let's figure out the right way to get
          there, together.
        </p>
        <Link to="/contact" className="button button-light">
          Tell us about your project <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="cta-decoration" aria-hidden="true">e.</div>
    </section>
  );
}

function Home() {
  return (
    <>
      <main>
        <section className="hero section-shell">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="status-dot" /> DIGITAL PARTNER FOR AMBITIOUS TEAMS
            </span>
            <h1>
              Good business deserves <span className="text-red">better</span>{" "}
              digital.
            </h1>
            <p className="hero-description">
              We turn complicated challenges into clear digital experiences,
              smarter workflows and technology that moves your business forward.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="button button-red">
                Let's build something <ArrowUpRight size={17} />
              </Link>
              <Link to="/services" className="text-link">
                Explore our services <MoveRight size={17} />
              </Link>
            </div>
            <div className="hero-note">
              <span className="note-icon"><Check size={15} /></span>
              Strategy first. Thoughtful design. Technology with purpose.
            </div>
          </div>

          <div className="hero-art" aria-label="Abstract digital design illustration">
            <div className="art-grid" />
            <div className="art-circle art-circle-one" />
            <div className="art-circle art-circle-two" />
            <div className="art-orbit" />
            <div className="art-core">e<span>.</span></div>
            <div className="art-card art-card-top">
              <span className="mini-icon"><Zap size={15} /></span>
              <span><strong>Make it simpler.</strong><small>Less friction, more flow</small></span>
            </div>
            <div className="art-card art-card-bottom">
              <span className="mini-icon mini-icon-dark"><TrendingUp size={15} /></span>
              <span><strong>Built for growth.</strong><small>Ready for what's next</small></span>
              <ArrowUpRight size={16} className="art-card-arrow" />
            </div>
            <div className="art-caption">IDEAS INTO IMPACT <span>↗</span></div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="section-shell trust-inner">
            <span>BUILT AROUND YOUR BUSINESS</span>
            <span><Check size={15} /> People-first thinking</span>
            <span><Check size={15} /> Performance-minded</span>
            <span><Check size={15} /> Clear communication</span>
          </div>
        </section>

        <section className="section section-shell" id="services">
          <div className="section-heading">
            <div>
              <span className="eyebrow">WHAT WE DO</span>
              <h2>Make technology<br />work <span className="text-red">for you.</span></h2>
            </div>
            <div className="heading-side">
              <p>
                You don't need more digital noise. You need the right
                solutions, thoughtfully designed around the way you work.
              </p>
              <Link to="/services" className="text-link">
                All services <MoveRight size={17} />
              </Link>
            </div>
          </div>

          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service-card" key={service.number}>
                  <div className="service-top">
                    <span className="service-icon"><Icon size={23} /></span>
                    <span className="service-number">{service.number}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="tag-list">
                    {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <Link to="/services" className="card-arrow" aria-label={`Explore ${service.title}`}>
                    <ArrowUpRight size={19} />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="work-section">
          <div className="section-shell section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">A FEEL FOR WHAT'S POSSIBLE</span>
                <h2>Good ideas.<br /><span className="text-red">Thoughtfully built.</span></h2>
              </div>
              <div className="heading-side">
                <p>
                  A glimpse at the kinds of digital experiences and systems
                  we love to create.
                </p>
              </div>
            </div>

            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.number}>
                  <div className={`project-visual ${project.className}`}>
                    <span className="project-visual-label">{project.label}</span>
                    <span className="project-visual-number">{project.number}</span>
                    <div className="project-shape" aria-hidden="true">
                      {project.number === "01" ? "shop." : project.number === "02" ? "flow." : "next."}
                    </div>
                    <ArrowUpRight size={22} className="project-visual-arrow" />
                  </div>
                  <div className="project-info">
                    <span className="eyebrow">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <span className="concept-note">Concept project · Illustrative work</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-shell process-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A CLEARER WAY FORWARD</span>
              <h2>Good work comes<br />from a <span className="text-red">good process.</span></h2>
            </div>
            <div className="heading-side">
              <p>
                No unnecessary complexity. Just a collaborative process
                that keeps your goals at the centre.
              </p>
            </div>
          </div>
          <div className="process-grid">
            {[
              ["01", "Discover", "Understand your business, customers, goals and the challenge worth solving."],
              ["02", "Design", "Shape the right approach and create an experience with clarity and intent."],
              ["03", "Build", "Turn the plan into a responsive, reliable and thoughtfully tested solution."],
              ["04", "Improve", "Launch, learn from real use and identify what will make the next version better."],
            ].map(([number, title, description]) => (
              <article className="process-step" key={number}>
                <span className="process-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="why-section">
          <div className="section-shell why-grid">
            <div>
              <span className="eyebrow eyebrow-light">WHY ETHIXWEB</span>
              <h2>Not just a vendor.<br />A partner who <span>gets it.</span></h2>
              <p className="why-intro">
                Great technology starts with understanding people. We bring
                practical thinking and considered execution to every challenge.
              </p>
              <Link to="/about" className="button button-light">
                Get to know us <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="why-points">
              <article><span><MessageCircle size={21} /></span><div><h3>Clarity over complexity</h3><p>Understand the plan, the priorities and what happens next.</p></div></article>
              <article><span><ShieldCheck size={21} /></span><div><h3>Built with care</h3><p>Thoughtful decisions, reliable foundations and attention to detail.</p></div></article>
              <article><span><Zap size={21} /></span><div><h3>Progress you can see</h3><p>Practical milestones and solutions designed around real needs.</p></div></article>
            </div>
          </div>
        </section>

        <CTA />
      </main>
    </>
  );
}

function PageIntro({ eyebrow, title, description }) {
  return (
    <section className="page-intro section-shell">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}

function Services() {
  return (
    <main>
      <PageIntro
        eyebrow="OUR SERVICES"
        title={<>The right tools.<br /><span className="text-red">The right direction.</span></>}
        description="Digital solutions should solve real problems, not add new ones. Here's how we help businesses move forward."
      />
      <section className="section section-shell inner-services">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article className="inner-service" key={service.number}>
              <span className="service-icon"><Icon size={25} /></span>
              <span className="service-number">{service.number}</span>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <div className="tag-list">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <Link to="/contact" className="text-link">Discuss your project <MoveRight size={17} /></Link>
            </article>
          );
        })}
      </section>
      <CTA title="Not sure what you need yet? Let's talk." />
    </main>
  );
}

function About() {
  return (
    <main>
      <PageIntro
        eyebrow="ABOUT ETHIXWEB"
        title={<>Technology should make<br /><span className="text-red">business feel simpler.</span></>}
        description="We believe good digital work begins with listening, clear thinking and a genuine understanding of the people behind a business."
      />
      <section className="section section-shell about-story">
        <div className="about-statement">
          <span className="eyebrow">OUR POINT OF VIEW</span>
          <h2>Built for ambition.<br />Grounded in <span className="text-red">real life.</span></h2>
        </div>
        <div className="about-copy">
          <p>
            India's business landscape is full of people building, adapting
            and finding new ways to serve their customers. The digital tools
            supporting them should feel like an advantage, not another obstacle.
          </p>
          <p>
            Our India-focused approach puts mobile experiences, straightforward
            communication, practical workflows and meaningful business outcomes
            at the centre of the work.
          </p>
          <p>
            We aim to make every project a thoughtful partnership: understand
            the challenge, agree on the priorities, build with care and keep
            improving.
          </p>
        </div>
      </section>
      <section className="about-values">
        <div className="section-shell section">
          <span className="eyebrow">WHAT GUIDES US</span>
          <div className="values-grid">
            <article><span>01</span><h3>People first</h3><p>Technology works best when it respects the people using it.</p></article>
            <article><span>02</span><h3>Purpose in every detail</h3><p>Every feature and design decision should have a reason.</p></article>
            <article><span>03</span><h3>Built to move forward</h3><p>Flexible foundations make it easier to learn, adapt and grow.</p></article>
          </div>
        </div>
      </section>
      <CTA title="Let's build something meaningful." />
    </main>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState("idle");

  function updateForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your enquiry.");
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
        website: "",
      });
    } catch (error) {
      console.error("Enquiry submission failed:", error);
      setStatus("error");
    }
  }

  return (
    <main>
      <PageIntro
        eyebrow="LET'S TALK"
        title={<>Tell us what you're<br /><span className="text-red">working towards.</span></>}
        description="Have a project in mind, a problem to solve or just a few questions? Start the conversation here."
      />
      <section className="section section-shell contact-layout">
        <div className="contact-aside">
          <span className="eyebrow">START A CONVERSATION</span>
          <h2>Good things start with a simple hello.</h2>
          <p>Share a little about your business and what you'd like to improve. We'll take it from there.</p>
          <div className="contact-promise"><Check size={17} /> A clear, thoughtful first conversation</div>
          <div className="contact-promise"><Check size={17} /> Solutions shaped around your goals</div>
          <div className="contact-promise"><Check size={17} /> No pressure to have every answer yet</div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <span className="eyebrow">YOUR PROJECT</span>
            <h2>Let's get to know it.</h2>
          </div>

          <div className="form-row">
            <label>
              Your name *
              <input name="name" value={form.name} onChange={updateForm} required minLength={2} maxLength={80} placeholder="Enter your name" autoComplete="name" />
            </label>
            <label>
              Work email *
              <input name="email" type="email" value={form.email} onChange={updateForm} required maxLength={254} placeholder="you@company.com" autoComplete="email" />
            </label>
          </div>

          <label>
            Business / company
            <input name="company" value={form.company} onChange={updateForm} maxLength={120} placeholder="Your company name" autoComplete="organization" />
          </label>

          <label>
            What can we help with? *
            <select name="service" value={form.service} onChange={updateForm} required>
              <option value="">Select a service</option>
              <option value="Web Design & Development">Web design & development</option>
              <option value="AI & Automation">AI & automation</option>
              <option value="SEO & Growth">SEO & growth</option>
              <option value="Custom Web Application">Custom web application</option>
              <option value="Other">Something else</option>
            </select>
          </label>

          <label>
            Tell us a little about your project *
            <textarea name="message" value={form.message} onChange={updateForm} required minLength={10} maxLength={3000} rows={5} placeholder="What's the challenge, idea or opportunity on your mind?" />
          </label>

          <label className="honeypot" aria-hidden="true">
            Leave this field empty
            <input name="website" value={form.website} onChange={updateForm} tabIndex={-1} autoComplete="off" />
          </label>

          {status === "success" && <p className="form-message success-message">Thank you! Your enquiry has been submitted.</p>}
          {status === "error" && <p className="form-message error-message">We couldn't submit your enquiry. Please try again in a moment.</p>}

          <button type="submit" className="button button-red form-submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send your enquiry"}
            <ArrowUpRight size={17} />
          </button>
          <p className="form-privacy">Your details will only be used to respond to your enquiry.</p>
        </form>
      </section>
    </main>
  );
}

function NotFound() {
  return (
    <main className="not-found section-shell">
      <span className="eyebrow">404 · PAGE NOT FOUND</span>
      <h1>Looks like this page took a different route.</h1>
      <Link to="/" className="button button-red">Back to home <ArrowUpRight size={17} /></Link>
    </main>
  );
}

function AppLayout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
