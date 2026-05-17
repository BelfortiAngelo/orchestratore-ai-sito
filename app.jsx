const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#4ade80",
  "glow": 1,
  "grain": true,
  "headingFont": "Space Grotesk"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = ["#4ade80", "#a78bfa", "#38bdf8", "#f472b6"];
const FONT_OPTIONS = ["Space Grotesk", "Sora", "Manrope"];

// ----- Welcome Gate -----
function WelcomeGate({ onEnter }) {
  const [name, setName] = useState("");
  const [phase, setPhase] = useState("input"); // input | cheer

  const fireConfetti = () => {
    if (!window.confetti) return;
    window.confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.55 },
      colors: ["#facc15", "#f97316", "#4ade80", "#f472b6", "#a78bfa", "#ffffff"],
    });
    setTimeout(() => {
      window.confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.6 }, colors: ["#facc15", "#f97316", "#4ade80"] });
      window.confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.6 }, colors: ["#facc15", "#f97316", "#4ade80"] });
    }, 180);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalName = name.trim() || null;
    fireConfetti();
    setPhase("cheer");
    setTimeout(() => onEnter(finalName), 2400);
  };

  return (
    <div className={"welcome-gate" + (phase === "cheer" ? " welcome-gate-cheer" : "")}>
      <div className="welcome-inner">
        {phase === "input" ? (
          <>
            <div className="welcome-logo-mark" aria-hidden="true">
              <span className="nav-logo-dot" />
              <span className="nav-logo-dot" />
              <span className="nav-logo-dot" />
            </div>
            <h2 className="welcome-ask">Aspetta, prima dimmi come ti chiami!</h2>
            <p className="welcome-hint">Ti prometto che non lo dimentico.</p>
            <form className="welcome-form" onSubmit={handleSubmit}>
              <input
                className="welcome-input"
                type="text"
                placeholder="Il tuo nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                maxLength={40}
              />
              <button className="welcome-btn" type="submit">Entra</button>
            </form>
            <button className="welcome-skip" type="button" onClick={() => onEnter(null)}>
              salta
            </button>
          </>
        ) : (
          <div className="welcome-cheer">
            <div className="welcome-cheer-emoji">🎉</div>
            <h2 className="welcome-cheer-title">
              {name.trim() ? `Ciao ${name.trim()}!` : "Benvenuto!"}
            </h2>
            <p className="welcome-cheer-sub">Siediti, ho tanto da raccontarti.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ----- Ambient background -----
function AmbientBackground({ intensity, grain }) {
  return (
    <div className="ambient" aria-hidden="true" style={{ opacity: 0.35 + intensity * 0.45 }}>
      <div className="ambient-blob ambient-blob-a" />
      <div className="ambient-blob ambient-blob-b" />
      <div className="ambient-blob ambient-blob-c" />
      <div className="ambient-grid" />
      {grain ? <div className="ambient-grain" /> : null}
    </div>
  );
}

// ----- Nav -----
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={"nav" + (scrolled ? " nav-scrolled" : "")}>
      <a className="nav-logo" href="#top">
        <span className="nav-logo-mark" aria-hidden="true">
          <span className="nav-logo-dot" />
          <span className="nav-logo-dot" />
          <span className="nav-logo-dot" />
        </span>
        <span className="nav-logo-text">
          Orchestratore<span className="nav-logo-accent">AI</span>
        </span>
      </a>
      <div className="nav-right">
        <a className="nav-link" href="#guide">Guide</a>
        <a className="nav-link" href="#kit">Starter Kit</a>
        <a className="nav-cta" href="https://www.linkedin.com/in/angelo-belforti-6a31891a8/" target="_blank" rel="noreferrer noopener">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
          </svg>
          <span>LinkedIn</span>
        </a>
      </div>
    </nav>
  );
}

// ----- Hero -----
function Hero({ visitorName }) {
  return (
    <header className="hero" id="top">
      {visitorName && (
        <p className="hero-personal">Ciao {visitorName},</p>
      )}
      <div className="hero-eyebrow">
        <span className="pulse-dot" />
        <span>Work in public · Documentando in tempo reale</span>
      </div>
      <h1 className="hero-title">
        Da <span className="word-strike">esploratore</span><br />
        ad <span className="word-accent">orchestratore</span>.
      </h1>
      <p className="hero-sub">
        Sono Angelo. Non scrivo codice, ma costruisco con Claude Code e una manciata di tool AI.
        Qui condivido il percorso. Esperimenti, processi, e gli errori che mi hanno insegnato di più.
      </p>
      <div className="hero-ctas">
        <a className="btn btn-primary" href="#guide">
          <span>Esplora le guide</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
        <a className="btn btn-ghost" href="#kit">
          <span>Scarica lo Starter Kit</span>
        </a>
      </div>
      <div className="hero-meta">
        <div className="hero-meta-item">
          <span className="hero-meta-num">3</span>
          <span className="hero-meta-label">guide pubblicate</span>
        </div>
        <span className="hero-meta-sep" />
        <div className="hero-meta-item">
          <span className="hero-meta-num">0</span>
          <span className="hero-meta-label">righe di codice scritte a mano</span>
        </div>
      </div>
    </header>
  );
}

// ----- Guide grid -----
const GUIDES = [
  {
    cat: "Sicurezza",
    title: "Come mettere le guardie al terminale e perche farlo subito",
    href: "guida-sicurezza.html",
    desc: "Claude puo eseguire comandi reali sul tuo computer. Prima che succeda qualcosa di brutto: due script PowerShell che bloccano reset --hard, push force e accesso ai file .env. Su Windows il sandbox non esiste ancora — gli hook sono la prima linea di difesa.",
    chips: ["Hook PowerShell", "settings.json", "Windows"],
    swatch: "swatch-green",
    live: true,
  },
  {
    cat: "Setup",
    title: "2 ore per trovare un file JSON in una cartella senza nome",
    href: "guida-manifest.html",
    desc: "Stavo cercando di aggiungere comandi personalizzati a Claude. La documentazione diceva una cosa, la realta un'altra. I comandi non apparivano. Ho riletto tutto, provato tre formati diversi. Poi ho aperto AppData a mano e ho trovato un manifest.json in una cartella con un UUID a caso. Quello e il posto reale.",
    chips: ["AppData", "manifest.json", "Claude Desktop"],
    swatch: "swatch-violet",
    live: true,
  },
  {
    cat: "Tool",
    title: "55.000 parole prima di iniziare a lavorare",
    href: "guida-mcp-vs-cli.html",
    desc: "Ho collegato Claude a GitHub in 15 minuti. Nel pomeriggio ho scoperto che ogni sessione parte con 55.000 parole di manuale in memoria, prima ancora di fare qualcosa. Cosa significa MCP, quando non vale il costo, e quando usare la CLI invece. Spiegato da chi non viene dal codice.",
    chips: ["GitHub MCP", "CLI", "Token"],
    swatch: "swatch-blue",
    live: true,
  },
  {
    cat: "Prossimamente",
    title: "Partire caldo ogni mattina senza rispiegare nulla",
    desc: "Ogni sessione ricominciava da zero. 10 minuti di setup al giorno, ogni giorno. Ho risolto con 48 righe in un file di testo che Claude legge all'avvio. Zero rispiegazioni, zero contesto perso. Il template che uso e come costruirlo da zero.",
    chips: ["CLAUDE.md", "Memoria", "Template"],
    swatch: "swatch-pink",
    live: false,
  },
  {
    cat: "Prossimamente",
    title: "Strutturare i progetti con il metodo PARA",
    desc: "Cartelle sparse, file senza nome, stati persi tra una sessione e l'altra. Come ho organizzato tutto in 4 categorie — Projects, Areas, Resources, Archive — e perche adesso Claude sa sempre dove siamo e cosa manca.",
    chips: ["PARA", "STATUS.md", "Workflow"],
    swatch: "swatch-green",
    live: false,
  },
  {
    cat: "Prossimamente",
    title: "Lo stack che uso davvero. Senza classifiche.",
    desc: "Niente affiliate, niente sponsorship. Claude Code, qualche MCP, un file di testo. Lo stack reale di chi orchestra senza scrivere una riga di codice. Quello che tengo aperto ogni giorno e perche. Aggiornato ogni mese.",
    chips: ["Claude Code", "MCP", "Stack"],
    swatch: "swatch-violet",
    live: false,
  },
];

function GuideCard({ guide, index }) {
  const Tag = guide.live && guide.href ? "a" : "article";
  const props = guide.live && guide.href ? { href: guide.href } : {};
  return (
    <Tag className={"guide-card" + (!guide.live ? " guide-card-muted" : "")} style={{ "--i": index }} {...props}>
      <div className={"guide-visual " + guide.swatch} aria-hidden="true">
        <div className="guide-visual-grid" />
        <div className="guide-visual-orb" />
        <div className="guide-visual-tag">
          <span className="guide-visual-dot" />
          <span>{guide.cat}</span>
        </div>
        <div className="guide-visual-num">{String(index + 1).padStart(2, "0")}</div>
      </div>
      <div className="guide-body">
        <h3 className="guide-title">{guide.title}</h3>
        <p className="guide-desc">{guide.desc}</p>
        <div className="guide-chips">
          {guide.chips.map((c) => (
            <span className="chip" key={c}>{c}</span>
          ))}
        </div>
        {guide.live ? (
          <div className="guide-foot">
            <span className="guide-read">Leggi la guida</span>
            <span className="guide-arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </span>
          </div>
        ) : (
          <div className="guide-foot">
            <span className="guide-read" style={{ opacity: 0.4 }}>In arrivo</span>
          </div>
        )}
      </div>
    </Tag>
  );
}

function GuideSection() {
  return (
    <section className="section" id="guide">
      <div className="section-head">
        <div className="section-eyebrow">// guide</div>
        <h2 className="section-title">Il percorso, una guida alla volta.</h2>
        <p className="section-sub">
          Niente corso, niente formula. Solo quello che ho fatto la settimana scorsa, raccontato bene.
        </p>
      </div>
      <div className="guide-grid">
        {GUIDES.map((g, i) => <GuideCard key={g.title} guide={g} index={i} />)}
      </div>
    </section>
  );
}

// ----- Email capture -----
function StarterKit() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const onSubmit = (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("sending");
    setTimeout(() => setState("done"), 700);
  };
  return (
    <section className="section section-kit" id="kit">
      <div className="kit-card">
        <div className="kit-glow" aria-hidden="true" />
        <div className="kit-left">
          <div className="section-eyebrow">// starter kit</div>
          <h2 className="kit-title">Il kit di partenza che avrei voluto al giorno uno.</h2>
          <p className="kit-sub">
            Quello che ho costruito nelle prime settimane, pulito e pronto da usare.
            Non un corso, non un PDF pieno di teoria. Tre file concreti e una struttura che funziona.
          </p>
          <ul className="kit-list">
            <li><span className="kit-check" aria-hidden="true">✓</span> Template CLAUDE.md — chi sei, i tuoi progetti, le regole operative</li>
            <li><span className="kit-check" aria-hidden="true">✓</span> Struttura PARA per organizzare i progetti con Claude</li>
            <li><span className="kit-check" aria-hidden="true">✓</span> 3 skill base: apri sessione, chiudi sessione, bozza LinkedIn</li>
            <li><span className="kit-check" aria-hidden="true">✓</span> Aggiornamenti via email, non piu di uno al mese</li>
          </ul>
        </div>
        <div className="kit-right">
          <form className="kit-form" onSubmit={onSubmit} noValidate>
            <label className="kit-label" htmlFor="kit-email">La tua email</label>
            <div className={"kit-input-wrap" + (state === "error" ? " is-error" : "")}>
              <input
                id="kit-email"
                className="kit-input"
                type="email"
                placeholder="nome@tuodominio.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
                disabled={state === "sending" || state === "done"}
                autoComplete="email"
              />
              <button className="kit-submit" type="submit" disabled={state === "sending" || state === "done"}>
                {state === "done" ? "Iscritto" : state === "sending" ? "Invio..." : "Avvisami quando esce"}
              </button>
            </div>
            <div className="kit-foot">
              {state === "error" ? (
                <span className="kit-foot-error">Email non valida. Riprova.</span>
              ) : state === "done" ? (
                <span className="kit-foot-ok">Controlla la posta. Arriva entro un minuto.</span>
              ) : (
                <span className="kit-foot-muted">Niente spam. Cancellazione in un click.</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// ----- Footer -----
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row">
        <div className="footer-brand">
          <span className="nav-logo-mark" aria-hidden="true">
            <span className="nav-logo-dot" />
            <span className="nav-logo-dot" />
            <span className="nav-logo-dot" />
          </span>
          <span>OrchestratoreAI</span>
        </div>
        <div className="footer-meta">
          <span>2026 Angelo Belforti</span>
          <span className="footer-sep" />
          <a href="https://www.linkedin.com/in/angelo-belforti-6a31891a8/" target="_blank" rel="noreferrer noopener">LinkedIn</a>
          <span className="footer-sep" />
          <a href="mailto:angelobelfo@gmail.com">Email</a>
        </div>
      </div>
      <div className="footer-fine">
        Costruito senza scrivere una riga di codice a mano. Con Claude Code e tanta pazienza.
      </div>
    </footer>
  );
}

// ----- Tweaks -----
function Tweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Accent">
        <TweakColor
          label="Colore principale"
          value={tweaks.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak("accent", v)}
        />
      </TweakSection>
      <TweakSection title="Atmosfera">
        <TweakSlider
          label="Intensita glow"
          min={0} max={1.6} step={0.05}
          value={tweaks.glow}
          onChange={(v) => setTweak("glow", v)}
        />
        <TweakToggle
          label="Grana / rumore"
          value={tweaks.grain}
          onChange={(v) => setTweak("grain", v)}
        />
      </TweakSection>
      <TweakSection title="Tipografia">
        <TweakSelect
          label="Font titoli"
          value={tweaks.headingFont}
          options={FONT_OPTIONS}
          onChange={(v) => setTweak("headingFont", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ----- App -----
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [visitorName, setVisitorName] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("oai_visitor_name");
    if (saved) {
      setVisitorName(saved || null);
    } else {
      const t = setTimeout(() => setShowWelcome(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const handleWelcomeEnter = (name) => {
    if (name) {
      localStorage.setItem("oai_visitor_name", name);
      setVisitorName(name);
    } else {
      localStorage.setItem("oai_visitor_name", "");
    }
    setShowWelcome(false);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", tweaks.accent);
    root.style.setProperty("--accent-soft", tweaks.accent + "33");
    root.style.setProperty("--accent-glow", tweaks.accent + "66");
    root.style.setProperty("--heading-font", `"${tweaks.headingFont}", "Space Grotesk", sans-serif`);
  }, [tweaks.accent, tweaks.headingFont]);

  return (
    <div className="page">
      {showWelcome && <WelcomeGate onEnter={handleWelcomeEnter} />}
      <AmbientBackground intensity={tweaks.glow} grain={tweaks.grain} />
      <Nav />
      <main>
        <Hero visitorName={visitorName} />
        <GuideSection />
        <StarterKit />
      </main>
      <Footer />
      <Tweaks tweaks={tweaks} setTweak={setTweak} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
