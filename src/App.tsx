import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Store,
  Check,
  Smartphone,
  Wallet,
  Shield,
  Zap,
  ChevronDown,
  ChevronUp,
  Quote,
  MessageCircle,
  Receipt,
  XCircle,
  CheckCircle2,
  Star,
  Gift,
  Sparkles,
  Headphones,
  TrendingUp,
  Lock,
  Database,
  Cloud,
  Clock,
  LineChart,
  HeartHandshake,
  RefreshCw,
} from "lucide-react";
import { Analytics, track } from "@vercel/analytics/react";
import "./App.css";
import "./Landing.css";
import {
  trialAccrocheEssaiAccompagnement,
  trialCtaCommencerMaintenant,
  trialCtaCommencerOfferts,
  trialCtaEssaiGratuitPlan,
  trialCtaEssaiOffert,
  trialFaqPeutEssayerReponse,
  trialHeadingPendantEssai,
  trialLabelJours,
  trialSansEngagementPricing,
  trialStickyCourt,
} from "./trial";
import { ProductShowcase } from "./ProductShowcase";

const APP_URL = import.meta.env.VITE_APP_URL || "http://localhost:5173";
const WHATSAPP_DEMO = import.meta.env.VITE_WHATSAPP_DEMO || "221778000000";
const WHATSAPP_DEMO_TEXT =
  "Bonjour, je souhaite demander une démo de Ecom 360 PME.";
const DEMO_WHATSAPP_URL = `https://wa.me/${WHATSAPP_DEMO}?text=${encodeURIComponent(WHATSAPP_DEMO_TEXT)}`;

const FIRST_VISIT_PROMISES = [
  {
    icon: Gift,
    title: "0 FCFA pour commencer",
    hint: "Pas de carte bancaire à l'inscription.",
  },
  {
    icon: Shield,
    title: "Données protégées",
    hint: "Sauvegardes automatiques & chiffrement.",
  },
  {
    icon: Headphones,
    title: "Humain à l'écoute",
    hint: "On vous aide à configurer pendant l'essai.",
  },
] as const;

const COMPARISON_ROWS = [
  {
    aspect: "Stock & inventaire",
    manual: "Inventaire approximatif, erreurs fréquentes",
    ecom: "Mise à jour en temps réel, alertes automatiques",
  },
  {
    aspect: "Mobile Money",
    manual: "Relevés manuels, risque d'oubli",
    ecom: "Wave & Orange Money enregistrés avec chaque vente",
  },
  {
    aspect: "Fin de journée",
    manual: "Addition longue, doutes sur la recette",
    ecom: "Un tableau de bord : ventes, encaissements, tendances",
  },
] as const;

const RETENTION_PILLARS = [
  {
    icon: Clock,
    title: "Le temps retrouvé",
    text: "Moins de paperasse et de recalculs : vous restez avec vos clients pendant que la caisse et les stocks se mettent à jour.",
  },
  {
    icon: LineChart,
    title: "Des décisions plus sereines",
    text: "Vos chiffres sont là quand vous en avez besoin — pour négocier, réapprovisionner ou ouvrir un second point de vente.",
  },
  {
    icon: HeartHandshake,
    title: "Un partenaire, pas un simple outil",
    text: "Accompagnement pendant l'essai et support quand votre commerce évolue (multi-boutiques, nouveaux collaborateurs…).",
  },
  {
    icon: RefreshCw,
    title: "Une base qui grandit avec vous",
    text: "Vos historiques et réglages restent utilisables quand vous changez de formule — pas besoin de tout reconstruire.",
  },
] as const;

const TRUST_TECH_ITEMS = [
  {
    icon: Lock,
    title: "Connexion sécurisée",
    hint: "Chiffrement SSL/TLS",
  },
  {
    icon: Database,
    title: "Sauvegardes auto",
    hint: "Données protégées et historisées",
  },
  {
    icon: Cloud,
    title: "Accessible partout",
    hint: "Mobile, tablette ou ordinateur",
  },
] as const;

const TRUST_SECTORS = [
  "Alimentation",
  "Prêt-à-porter",
  "Cosmétiques",
  "Pharmacies",
  "Quincaillerie",
  "Électronique",
  "Téléphonie",
  "Librairie & papeterie",
];

function revealDelay(ms: number): CSSProperties {
  return { ["--reveal-delay" as string]: `${ms}ms` } as CSSProperties;
}

function avatarInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last =
    parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : (parts[0][1] ?? "");
  return (first + last).toUpperCase();
}

function formatStatMillions(n: number): string {
  if (n < 0.08) return "0";
  if (n >= 1.995) return "2M+";
  const formatted = n.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
  return `${formatted}M+`;
}

function formatStatRating(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

const TESTIMONIALS = [
  {
    quote:
      "Avant Ecom 360 PME, je perdais des heures à tout noter à la main. Maintenant je vois mes ventes en temps réel et mes clients paient en Wave. Un vrai gain de temps.",
    name: "Mamadou Diallo",
    role: "Commerçant, Dakar",
  },
  {
    quote:
      "La gestion des crédits clients a changé ma vie. Je sais exactement qui me doit quoi, et les rapports m'aident à prendre les bonnes décisions.",
    name: "Fatou Ndiaye",
    role: "Boutique multi-produits, Thiès",
  },
  {
    quote:
      "Simple, rapide, adapté à l'Afrique. Mes 3 boutiques sont synchronisées et je contrôle tout depuis mon téléphone.",
    name: "Ibrahima Sow",
    role: "Propriétaire de chaîne, Saint-Louis",
  },
];

const FAQ_ITEMS = [
  {
    q: "Puis-je essayer gratuitement ?",
    a: trialFaqPeutEssayerReponse(),
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Absolument. Toutes les données sont chiffrées (SSL/TLS), sauvegardées automatiquement chaque jour, et stockées sur des serveurs sécurisés au niveau international.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, sans engagement. Vous pouvez annuler à tout moment. En cas d'annulation, vous conservez l'accès jusqu'à la fin de la période payée.",
  },
  {
    q: "Comment payer ? Wave, Orange Money ?",
    a: "Nous acceptons Wave et Orange Money. Choisissez la méthode qui vous convient.",
  },
];

const PLANS = {
  starter: {
    name: "Starter",
    target: "Petit commerce",
    monthly: 15000,
    yearly: 120000,
    features: [
      "2 utilisateur(s)",
      "1 boutique(s)",
      "Ventes : 500/mois",
      "Produits : 100",
      "POS complet",
      "Reçus de vente",
    ],
    cta: "Commencer",
    ctaHref: "login",
    ctaDemo: false,
    popular: false,
  },
  pro: {
    name: "Pro",
    target: "Commerce en croissance",
    monthly: 35000,
    yearly: 350000,
    features: [
      "5 utilisateur(s)",
      "3 boutique(s)",
      "Ventes : 2 000/mois",
      "Produits : 500",
      "Suivi des dépenses",
      "Rapports & analytics",
      "Paiement multi-méthodes (Wave, Orange Money)",
      "Export PDF & Excel",
      "Crédits clients",
      "Suivi fournisseurs",
      "Gestion des livreurs (livraison)",
      "Onboarding accompagné pendant l'essai",
    ],
    cta: trialCtaEssaiGratuitPlan(),
    ctaHref: "login",
    ctaDemo: false,
    popular: true,
  },
  business: {
    name: "Business",
    target: "Multi-boutiques",
    monthly: 75000,
    yearly: 750000,
    features: [
      "Illimité utilisateur(s)",
      "Illimité boutique(s)",
      "Ventes : Illimité",
      "Produits : Illimité",
      "Suivi des dépenses",
      "Rapports & analytics",
      "Paiement multi-méthodes",
      "Export PDF & Excel",
      "Crédits clients",
      "Suivi fournisseurs",
      "Gestion des livreurs (livraison)",
      "Gestion des rôles",
      "API & intégrations",
      "Support prioritaire",
      "Account manager dédié",
      "Personnalisation (logo)",
    ],
    cta: "Demander une démo",
    ctaHref: "demo",
    ctaDemo: true,
    popular: false,
  },
};

const WELCOME_SESSION_KEY = "ecom360_welcome_tip_seen";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [yearlyBilling, setYearlyBilling] = useState(false);
  const [showWelcomeTip, setShowWelcomeTip] = useState(false);
  const statsBarRef = useRef<HTMLElement | null>(null);
  const [statsPlayed, setStatsPlayed] = useState(false);
  const [statCounts, setStatCounts] = useState({
    stores: 0,
    millions: 0,
    rating: 0,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const root = document.documentElement;
      const scrollable = root.scrollHeight - root.clientHeight;
      setScrollProgress(
        scrollable > 0 ? Math.min(100, (root.scrollTop / scrollable) * 100) : 0,
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.classList.add("js-reveal");
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(WELCOME_SESSION_KEY) !== "1") {
        setShowWelcomeTip(true);
      }
    } catch {
      setShowWelcomeTip(true);
    }
  }, []);

  const dismissWelcomeTip = () => {
    try {
      sessionStorage.setItem(WELCOME_SESSION_KEY, "1");
    } catch {
      /* private mode */
    }
    setShowWelcomeTip(false);
  };

  const featuredTestimonial = TESTIMONIALS[0];
  const otherTestimonials = TESTIMONIALS.slice(1);

  useEffect(() => {
    const el = statsBarRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStatsPlayed(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!statsPlayed) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setStatCounts({ stores: 500, millions: 2, rating: 4.8 });
      return;
    }
    const targets = { stores: 500, millions: 2, rating: 4.8 };
    const duration = 1450;
    let start: number | null = null;
    let rafId = 0;
    const ease = (t: number) => 1 - (1 - t) ** 2.8;
    const tick = (now: number) => {
      if (start === null) start = now;
      const p = ease(Math.min((now - start) / duration, 1));
      setStatCounts({
        stores: Math.round(targets.stores * p),
        millions: Math.round(targets.millions * p * 10) / 10,
        rating: Math.round(targets.rating * p * 10) / 10,
      });
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [statsPlayed]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = document.querySelectorAll("[data-reveal]");
    const revealAll = () => {
      nodes.forEach((el) => el.classList.add("is-visible"));
    };

    if (mq.matches) {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Analytics />
      <a href="#main" className="skip-link">
        Aller au contenu
      </a>
      <div className="scroll-progress-track" aria-hidden>
        <div
          className="scroll-progress-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      {/* Header */}
      <header className={`landing-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner container">
          <a href="/" className="logo">
            <Store size={28} strokeWidth={2} />
            <span>Ecom 360 PME</span>
          </a>
          <nav className="header-nav">
            <div className="nav-links">
              <a
                href="#features"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Fonctionnalités
              </a>
              <a
                href="#apercu"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Aperçu
              </a>
              <a
                href="#comparaison"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Comparatif
              </a>
              <a
                href="#pricing"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tarifs
              </a>
              <a
                href="#faq"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
            </div>
            <div className="nav-actions">
              <a
                href={`${APP_URL}/login`}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-login"
                onClick={() =>
                  track("landing_login_click", { location: "header" })
                }
              >
                Connexion
              </a>
              <a
                href={DEMO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-demo"
                onClick={() =>
                  track("landing_demo_click", { location: "header" })
                }
              >
                <MessageCircle size={18} /> Démo
              </a>
              <a
                href={`${APP_URL}/demo-request`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                onClick={() =>
                  track("landing_signup_click", { location: "header" })
                }
              >
                {trialCtaEssaiOffert()}
              </a>
            </div>
          </nav>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu" id="mobile-nav-panel">
            <a
              href="#features"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fonctionnalités
            </a>
            <a
              href="#apercu"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Aperçu
            </a>
            <a
              href="#comparaison"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Comparatif
            </a>
            <a
              href="#pricing"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tarifs
            </a>
            <a
              href="#faq"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a
              href={`${APP_URL}/login`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Connexion
            </a>
            <div className="mobile-menu-actions">
              <a
                href={DEMO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-demo"
                onClick={() => {
                  track("landing_demo_click", { location: "mobile_menu" });
                  setMobileMenuOpen(false);
                }}
              >
                <MessageCircle size={18} /> Demander une démo
              </a>
              <a
                href={`${APP_URL}/demo-request`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                onClick={() => {
                  track("landing_signup_click", { location: "mobile_menu" });
                  setMobileMenuOpen(false);
                }}
              >
                {trialCtaEssaiOffert()}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="hero" id="main">
        <div className="hero-noise" aria-hidden />
        <div className="hero-inner container">
          {showWelcomeTip && (
            <div
              className="first-visit-banner"
              role="region"
              aria-label="Conseil pour nouveaux visiteurs"
            >
              <div className="first-visit-banner-inner">
                <span className="first-visit-banner-icon" aria-hidden>
                  <Sparkles size={20} strokeWidth={2} />
                </span>
                <div className="first-visit-banner-copy">
                  <strong>Première visite ?</strong>{" "}
                  <span>
                    Voici en quelques minutes comment remplacer carnet, tableur
                    et caisse improvisée par une gestion claire — sans rien
                    payer pendant {trialLabelJours()}.
                  </span>
                </div>
                <a
                  href="#features"
                  className="first-visit-banner-cta"
                  onClick={dismissWelcomeTip}
                >
                  Voir ce que vous gagnez
                </a>
                <button
                  type="button"
                  className="first-visit-banner-dismiss"
                  onClick={dismissWelcomeTip}
                  aria-label="Masquer ce message"
                >
                  <X size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
          )}
          <div className="hero-content">
            <p className="hero-eyebrow">
              <span className="hero-eyebrow-pill">
                Tout-en-un pour la caisse
              </span>
              <span className="hero-eyebrow-text">
                Pense pour les commerces africains qui veulent avancer vite
              </span>
            </p>
            <h1 className="display-heading">
              Vendez plus vite,
              <br />
              <span className="highlight">
                sachant toujours où va votre argent.
              </span>
            </h1>
            <p className="hero-lead">
              Dès votre première connexion : encaissements Wave & Orange Money,
              stocks à jour et tableau de bord comme si vous aviez déjà un
              responsable de magasin numérique.
            </p>
            <p className="hero-body">
              Fini les doutes sur la fin de journée — tout est centralisé sur
              téléphone ou ordinateur, sans installation compliquée.
            </p>
            <div
              className="hero-rating"
              aria-label="Appréciation moyenne 4,8 sur 5, plus de 500 commerces"
            >
              <span className="hero-rating-stars" aria-hidden>
                {Array.from({ length: 5 }).map((_, ri) => (
                  <Star
                    key={ri}
                    size={15}
                    fill="currentColor"
                    strokeWidth={0}
                    className="hero-rating-star"
                  />
                ))}
              </span>
              <span className="hero-rating-score">4,8/5</span>
              <span className="hero-rating-dot" aria-hidden>
                ·
              </span>
              <span className="hero-rating-count">500+ commerces</span>
              <span className="hero-rating-dot" aria-hidden>
                ·
              </span>
              <span className="hero-rating-region">Sénégal & Afrique</span>
            </div>
            <div className="hero-badges">
              <span className="badge">
                <Smartphone size={16} />
                POS tactile
              </span>
              <span className="badge">
                <Wallet size={16} />
                Wave & Orange Money
              </span>
              <span className="badge">
                <BarChart3 size={16} />
                Rapports en temps réel
              </span>
            </div>
            <div className="hero-actions">
              <a
                href={`${APP_URL}/demo-request`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-hero-primary"
                onClick={() =>
                  track("landing_signup_click", { location: "hero" })
                }
              >
                {trialCtaCommencerOfferts()}
              </a>
              <a
                href={DEMO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-demo"
                onClick={() =>
                  track("landing_demo_click", { location: "hero" })
                }
              >
                <MessageCircle size={18} /> Parler à un conseiller
              </a>
              <a
                href="#pricing"
                className="btn btn-tertiary"
                onClick={() =>
                  track("landing_pricing_click", { location: "hero" })
                }
              >
                Tarifs <span className="btn-tertiary-arrow">→</span>
              </a>
            </div>
            <p className="hero-microcopy">
              Inscription en ~2 min · Plan Pro inclus pendant l&apos;essai ·
              Résiliable quand vous voulez
            </p>
            <div className="hero-trust">
              <span>
                <Shield size={16} /> Données sécurisées
              </span>
              <span>
                <Zap size={16} /> Sans engagement
              </span>
              <span>
                <Check size={16} /> Support inclus
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card-glow" aria-hidden />
            <div className="hero-float-chip hero-float-chip--pay" aria-hidden>
              <span className="hero-float-chip-dot" />
              Paiement Wave validé
            </div>
            <div className="hero-float-chip hero-float-chip--trend" aria-hidden>
              <TrendingUp size={14} strokeWidth={2.5} />
              +18 % vs hier
            </div>
            <div className="hero-card">
              <div className="hero-card-badge" aria-hidden>
                Aperçu — comme dans l&apos;app
              </div>
              <div className="hero-card-header">
                <BarChart3 size={24} color="var(--color-primary)" />
                <h3>Tableau de bord — Aujourd'hui</h3>
              </div>
              <div className="hero-stats">
                <div className="hero-stat hero-stat--lead">
                  <div className="hero-stat-metric">
                    <span className="hero-stat-icon" aria-hidden>
                      <Wallet size={20} strokeWidth={2} />
                    </span>
                    <div
                      className="hero-stat-money-inner"
                      aria-label="127 450 francs CFA"
                    >
                      <span className="hero-stat-amount">127 450</span>
                      <span className="hero-stat-currency">FCFA</span>
                    </div>
                  </div>
                  <small className="hero-stat-label">Ventes</small>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-metric">
                    <span className="hero-stat-icon" aria-hidden>
                      <Receipt size={20} strokeWidth={2} />
                    </span>
                    <span className="hero-stat-value">23</span>
                  </div>
                  <small className="hero-stat-label">Transactions</small>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-metric">
                    <span className="hero-stat-icon" aria-hidden>
                      <Package size={20} strokeWidth={2} />
                    </span>
                    <span className="hero-stat-value">12</span>
                  </div>
                  <small className="hero-stat-label">Produits vendus</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="#trust-strip" className="hero-scroll-hint">
          <span className="hero-scroll-hint-text">Découvrir la suite</span>
          <ChevronDown
            className="hero-scroll-hint-icon"
            size={22}
            strokeWidth={2}
            aria-hidden
          />
        </a>
      </section>

      {/* Stats - Social proof */}
      <section
        ref={statsBarRef}
        id="stats-bar"
        className="stats-bar"
        aria-label="Chiffres clés"
      >
        <div className="stats-inner container">
          <div
            className="stat-item"
            data-reveal
            style={revealDelay(0)}
            aria-label="Plus de 500 commerces actifs"
          >
            <span className="stat-value">{statCounts.stores}+</span>
            <span className="stat-label">Commerces actifs</span>
          </div>
          <div
            className="stat-item"
            data-reveal
            style={revealDelay(70)}
            aria-label="Plus de 2 millions de transactions traitées"
          >
            <span className="stat-value">
              {formatStatMillions(statCounts.millions)}
            </span>
            <span className="stat-label">Transactions traitées</span>
          </div>
          <div
            className="stat-item"
            data-reveal
            style={revealDelay(140)}
            aria-label="Note moyenne 4,8 sur 5"
          >
            <span className="stat-value">
              {formatStatRating(statCounts.rating)}/5
            </span>
            <span className="stat-label">Satisfaction client</span>
          </div>
          <div
            className="stat-item"
            data-reveal
            style={revealDelay(210)}
            aria-label="Moins de 5 minutes pour démarrer"
          >
            <span className="stat-value">&lt; 5 min</span>
            <span className="stat-label">Pour démarrer</span>
          </div>
        </div>
        <div className="trust-tech">
          <div className="trust-tech-inner container">
            {TRUST_TECH_ITEMS.map((row, i) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.title}
                  className="trust-tech-item"
                  data-reveal
                  style={revealDelay(280 + i * 50)}
                >
                  <Icon
                    size={20}
                    strokeWidth={2}
                    className="trust-tech-icon"
                    aria-hidden
                  />
                  <div className="trust-tech-text">
                    <span className="trust-tech-title">{row.title}</span>
                    <span className="trust-tech-hint">{row.hint}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="promise-bar"
        aria-label="Ce qui vous attend dès le départ"
      >
        <div className="promise-bar-inner container">
          {FIRST_VISIT_PROMISES.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="promise-item"
                data-reveal
                style={revealDelay(i * 75)}
              >
                <div className="promise-item-icon" aria-hidden>
                  <Icon size={22} strokeWidth={2} />
                </div>
                <div className="promise-item-text">
                  <strong>{item.title}</strong>
                  <span>{item.hint}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="trust-strip"
        className="trust-strip"
        aria-label="Types de commerces"
      >
        <div className="trust-strip-inner container">
          <p className="trust-strip-label" data-reveal>
            Une plateforme pensée pour le terrain
          </p>
          <p
            className="trust-strip-heading"
            data-reveal
            style={revealDelay(60)}
          >
            Du détaillant au multi-magasins : tous les secteurs du quotidien.
          </p>
          <div className="trust-strip-pills" role="list">
            {TRUST_SECTORS.map((sector, i) => (
              <span
                key={sector}
                role="listitem"
                className="trust-pill"
                data-reveal
                style={revealDelay(100 + i * 35)}
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ProductShowcase />

      {/* Pain points / Benefits */}
      <section className="benefits">
        <div className="section-header" data-reveal>
          <p className="section-label">Pourquoi changer</p>
          <h2 className="display-heading">
            Vous perdez du temps et de l'argent ?
          </h2>
          <p>
            Les carnets et Excel, c'est fini. Ecom 360 PME vous fait gagner des
            heures chaque semaine.
          </p>
        </div>
        <div className="benefits-grid">
          <div
            className="benefit-card benefit-card--before"
            data-reveal
            style={revealDelay(0)}
          >
            <div className="benefit-icon benefit-icon--muted" aria-hidden>
              <XCircle size={28} strokeWidth={1.75} />
            </div>
            <h3>Avant</h3>
            <ul>
              <li>Erreurs de calcul à la caisse</li>
              <li>Stock inconnu ou obsolète</li>
              <li>Crédits clients oubliés</li>
              <li>Rapports faits à la main</li>
            </ul>
          </div>
          <div
            className="benefit-arrow"
            data-reveal
            style={revealDelay(120)}
            aria-hidden
          >
            →
          </div>
          <div
            className="benefit-card highlight"
            data-reveal
            style={revealDelay(200)}
          >
            <div className="benefit-icon benefit-icon--accent" aria-hidden>
              <CheckCircle2 size={28} strokeWidth={1.75} />
            </div>
            <h3>Avec Ecom 360 PME</h3>
            <ul>
              <li>Calculs automatiques, zéro erreur</li>
              <li>Stock en temps réel, alertes bas</li>
              <li>Soldes clients toujours à jour</li>
              <li>Rapports PDF/Excel en 1 clic</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="comparaison"
        className="comparison"
        aria-label="Comparatif gestion manuelle et Ecom 360"
      >
        <div className="section-header" data-reveal>
          <p className="section-label">En un coup d&apos;œil</p>
          <h2 className="display-heading">
            Pourquoi passer du carnet à une vraie gestion ?
          </h2>
          <p>
            Même sérieux au comptoir — tout change quand vos outils suivent le
            rythme de la journée.
          </p>
        </div>
        <div
          className="comparison-table-wrap"
          data-reveal
          style={revealDelay(80)}
        >
          <table className="comparison-table">
            <caption className="visually-hidden">
              Comparaison entre gestion manuelle et Ecom 360 PME
            </caption>
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">Carnet, Excel…</th>
                <th scope="col" className="comparison-th-highlight">
                  Ecom 360 PME
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.aspect}>
                  <th scope="row">{row.aspect}</th>
                  <td>{row.manual}</td>
                  <td className="comparison-td-highlight">
                    <Check size={18} className="comparison-check" aria-hidden />
                    {row.ecom}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="comparison-cta" data-reveal style={revealDelay(160)}>
          <a
            href={`${APP_URL}/demo-request`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            onClick={() =>
              track("landing_signup_click", { location: "comparison" })
            }
          >
            Essayer sur ma vraie boutique — {trialLabelJours()}
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features">
        <div className="section-header" data-reveal>
          <p className="section-label">Fonctionnalités</p>
          <h2 className="display-heading">Tout ce dont vous avez besoin</h2>
          <p>
            Une solution complète pensée pour les commerces africains :
            multi-boutiques, paiements locaux, rôles et crédits clients.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card" data-reveal style={revealDelay(0)}>
            <div className="feature-icon">
              <ShoppingCart size={24} />
            </div>
            <h3>Point de vente (POS)</h3>
            <p>
              Interface tactile optimisée mobile et desktop. Recherche rapide,
              panier modifiable, reçus instantanés.
            </p>
          </div>
          <div className="feature-card" data-reveal style={revealDelay(55)}>
            <div className="feature-icon">
              <Package size={24} />
            </div>
            <h3>Stocks & inventaire</h3>
            <p>
              Alertes stock bas, mouvements par boutique, seuils
              personnalisables. Gardez le contrôle de vos produits.
            </p>
          </div>
          <div className="feature-card" data-reveal style={revealDelay(110)}>
            <div className="feature-icon">
              <Users size={24} />
            </div>
            <h3>Clients & crédits</h3>
            <p>
              Fiches clients, historique d'achats, gestion des crédits et
              paiements partiels.
            </p>
          </div>
          <div className="feature-card" data-reveal style={revealDelay(165)}>
            <div className="feature-icon">
              <BarChart3 size={24} />
            </div>
            <h3>Rapports & export</h3>
            <p>
              Ventes par jour/semaine/mois, top produits, export PDF et Excel
              pour votre comptable.
            </p>
          </div>
          <div className="feature-card" data-reveal style={revealDelay(220)}>
            <div className="feature-icon">
              <Wallet size={24} />
            </div>
            <h3>Paiements locaux</h3>
            <p>
              Espèces, Wave, Orange Money. Toutes les méthodes de paiement
              adaptées au marché africain.
            </p>
          </div>
          <div className="feature-card" data-reveal style={revealDelay(275)}>
            <div className="feature-icon">
              <Store size={24} />
            </div>
            <h3>Multi-boutiques</h3>
            <p>
              Gérez plusieurs magasins, basculez entre eux, rapports consolidés.
              Idéal pour les chaînes.
            </p>
          </div>
        </div>
      </section>

      <section className="mid-cta" aria-label="Passer à l'action">
        <div className="mid-cta-inner container" data-reveal>
          <div className="mid-cta-copy">
            <p className="mid-cta-eyebrow">Une question avant de continuer ?</p>
            <h2 className="display-heading mid-cta-title">
              Si vous hésitez encore, testez gratuitement : vous verrez vos
              premières ventes dans l&apos;app, pas sur une démo figée.
            </h2>
            <p className="mid-cta-sub">
              Les commerçants qui restent sont ceux qui ont pris 10 minutes pour
              importer leurs produits — puis n&apos;ont plus voulu revenir en
              arrière.
            </p>
          </div>
          <div className="mid-cta-actions">
            <a
              href={`${APP_URL}/demo-request`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              onClick={() =>
                track("landing_signup_click", { location: "mid_cta" })
              }
            >
              Ouvrir mon essai gratuit
            </a>
            <a
              href={DEMO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-demo"
              onClick={() =>
                track("landing_demo_click", { location: "mid_cta" })
              }
            >
              <MessageCircle size={18} /> Poser une question sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <div className="section-header" data-reveal>
          <p className="section-label">Simplicité</p>
          <h2 className="display-heading">Démarrez en 3 étapes</h2>
          <p>
            Aucune formation nécessaire. Vous êtes opérationnel en quelques
            minutes.
          </p>
        </div>
        <div className="steps">
          <div className="step" data-reveal style={revealDelay(0)}>
            <span className="step-num">1</span>
            <h3>Créez votre compte</h3>
            <p>
              Email, mot de passe — c'est tout. L'essai est gratuit, sans
              paiement à l'inscription.
            </p>
          </div>
          <div className="step" data-reveal style={revealDelay(90)}>
            <span className="step-num">2</span>
            <h3>Ajoutez vos produits</h3>
            <p>
              Importez ou saisissez vos articles. Définissez vos prix et stocks.
            </p>
          </div>
          <div className="step" data-reveal style={revealDelay(180)}>
            <span className="step-num">3</span>
            <h3>Vendez !</h3>
            <p>Utilisez le POS, enregistrez vos ventes, suivez vos rapports.</p>
          </div>
        </div>
        <div className="steps-cta" data-reveal style={revealDelay(270)}>
          <a
            href={`${APP_URL}/demo-request`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            onClick={() =>
              track("landing_signup_click", { location: "how_it_works" })
            }
          >
            {trialCtaCommencerMaintenant()}
          </a>
          <a
            href={DEMO_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-demo"
            onClick={() =>
              track("landing_demo_click", { location: "how_it_works" })
            }
          >
            <MessageCircle size={18} /> Demander une démo
          </a>
        </div>
      </section>

      {/* Free trial value */}
      <section className="trial-value">
        <div className="section-header section-header--on-dark" data-reveal>
          <p className="section-label section-label--muted">Essai gratuit</p>
          <h2 className="display-heading">{trialHeadingPendantEssai()}</h2>
          <p>
            L'objectif n'est pas seulement de tester le logiciel, mais de mettre
            en place une vraie routine de gestion qui vous fera gagner du temps
            chaque semaine.
          </p>
        </div>
        <div className="steps trial-steps">
          <div className="step step--dark" data-reveal style={revealDelay(0)}>
            <span className="step-num step-num--outline">A</span>
            <h3 className="step-title">Mise en place guidée</h3>
            <p>
              Nous vous aidons à configurer vos boutiques, vos catégories et vos
              moyens d'encaissement pour que tout soit prêt rapidement.
            </p>
          </div>
          <div className="step step--dark" data-reveal style={revealDelay(100)}>
            <span className="step-num step-num--outline">B</span>
            <h3 className="step-title">Import de vos données clés</h3>
            <p>
              Ajoutez vos produits et vos principaux clients pour démarrer avec
              des données réalistes, pas une simple démo vide.
            </p>
          </div>
          <div className="step step--dark" data-reveal style={revealDelay(200)}>
            <span className="step-num step-num--outline">C</span>
            <h3 className="text-white">Suivi de vos premiers résultats</h3>
            <p>
              Suivez vos premières journées de ventes dans les rapports et voyez
              concrètement l'impact sur vos chiffres.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-header" data-reveal>
          <p className="section-label">Témoignages</p>
          <h2 className="display-heading">Ils nous font confiance</h2>
          <p>
            Des retours concrets de commerces qui utilisent Ecom 360 au
            quotidien — et pourquoi ils recommandent.
          </p>
        </div>
        <div className="testimonial-spotlight" data-reveal>
          <div className="testimonial-spotlight-badge">Témoignage</div>
          <div className="testimonial-stars" aria-label="5 sur 5">
            {Array.from({ length: 5 }).map((_, si) => (
              <Star
                key={si}
                size={18}
                className="testimonial-star"
                fill="currentColor"
                strokeWidth={0}
              />
            ))}
          </div>
          <Quote size={32} className="testimonial-spotlight-quote" />
          <blockquote className="testimonial-spotlight-text">
            &ldquo;{featuredTestimonial.quote}&rdquo;
          </blockquote>
          <div className="testimonial-spotlight-author">
            <div
              className="testimonial-avatar testimonial-avatar--lg"
              aria-hidden
            >
              {avatarInitials(featuredTestimonial.name)}
            </div>
            <div>
              <strong>{featuredTestimonial.name}</strong>
              <span>{featuredTestimonial.role}</span>
            </div>
          </div>
        </div>
        <div className="testimonials-grid testimonials-grid--rest">
          {otherTestimonials.map((t, i) => (
            <div
              key={t.name}
              className="testimonial-card"
              data-reveal
              style={revealDelay(80 + i * 70)}
            >
              <div className="testimonial-stars" aria-label="5 sur 5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    size={16}
                    className="testimonial-star"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <Quote size={24} className="testimonial-quote" />
              <p className="testimonial-text">&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden>
                  {avatarInitials(t.name)}
                </div>
                <div className="testimonial-author-text">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="retention" aria-label="Pourquoi les clients restent">
        <div className="section-header" data-reveal>
          <p className="section-label">Fidélité</p>
          <h2 className="display-heading">
            Pourquoi les commerçants restent sur Ecom 360
          </h2>
          <p>
            Au-delà du logiciel : des habitudes qui collent parce qu&apos;elles
            vous font gagner de l&apos;argent et du sommeil.
          </p>
        </div>
        <div className="retention-grid">
          {RETENTION_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="retention-card"
                data-reveal
                style={revealDelay(i * 65)}
              >
                <div className="retention-icon" aria-hidden>
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Social proof - Payment methods */}
      <section className="social-proof">
        <div className="payment-section-inner">
          <p className="section-label" data-reveal>
            Encaissement
          </p>
          <h3
            className="payment-methods-title display-heading"
            data-reveal
            style={revealDelay(40)}
          >
            Paiements acceptés
          </h3>
          <p
            className="payment-methods-subtitle"
            data-reveal
            style={revealDelay(90)}
          >
            Payez et encaissez comme vos clients préfèrent
          </p>
          <div className="payment-methods">
            <div
              className="payment-method payment-method-featured"
              title="Wave"
              data-reveal
              style={revealDelay(140)}
            >
              <div className="payment-method-img">
                <img
                  src="/images/payments/wave.png"
                  alt=""
                  width={64}
                  height={64}
                />
              </div>
              <span>Wave</span>
            </div>
            <div
              className="payment-method payment-method-featured"
              title="Orange Money"
              data-reveal
              style={revealDelay(220)}
            >
              <div className="payment-method-img">
                <img
                  src="/images/payments/orange-money.png"
                  alt=""
                  width={64}
                  height={64}
                />
              </div>
              <span>Orange Money</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing">
        <div className="section-header" data-reveal>
          <p className="section-label">Tarifs</p>
          <h2 className="display-heading">
            Des formules adaptées à votre croissance
          </h2>
          <p>{trialSansEngagementPricing()}</p>
        </div>
        <div
          className="pricing-billing-toggle"
          data-reveal
          style={revealDelay(60)}
        >
          <button
            type="button"
            className={`pricing-billing-btn ${!yearlyBilling ? "active" : ""}`}
            onClick={() => setYearlyBilling(false)}
            aria-pressed={!yearlyBilling}
          >
            Mensuel
          </button>
          <button
            type="button"
            className={`pricing-billing-btn ${yearlyBilling ? "active" : ""}`}
            onClick={() => setYearlyBilling(true)}
            aria-pressed={yearlyBilling}
          >
            Annuel
            <span className="pricing-billing-badge">-17%</span>
          </button>
        </div>
        <div className="pricing-grid">
          {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((key, pi) => {
            const plan = PLANS[key];
            const price = yearlyBilling ? plan.yearly : plan.monthly;
            const period = yearlyBilling ? " / an" : " / mois";
            const formattedPrice = new Intl.NumberFormat("fr-FR").format(price);
            return (
              <div
                key={key}
                className={`pricing-card ${plan.popular ? "popular" : ""}`}
                data-reveal
                style={revealDelay(pi * 100)}
              >
                <h3>{plan.name}</h3>
                <p className="target">{plan.target}</p>
                <div className="price">
                  {formattedPrice} F <span>{period}</span>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <Check size={18} /> {f}
                    </li>
                  ))}
                </ul>
                {plan.ctaDemo ? (
                  <a
                    href={DEMO_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-demo"
                    style={{ width: "100%" }}
                    onClick={() =>
                      track("landing_demo_click", {
                        location: "pricing",
                        plan: plan.name,
                      })
                    }
                  >
                    <MessageCircle size={18} /> {plan.cta}
                  </a>
                ) : (
                  <a
                    href={`${APP_URL}/${plan.ctaHref}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      plan.popular ? "btn btn-primary" : "btn btn-secondary"
                    }
                    style={{ width: "100%" }}
                    onClick={() =>
                      track("landing_signup_click", {
                        location: "pricing",
                        plan: plan.name,
                      })
                    }
                  >
                    {plan.cta}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq">
        <div className="section-header" data-reveal>
          <p className="section-label">FAQ</p>
          <h2 className="display-heading">Questions fréquentes</h2>
          <p>Tout ce que vous devez savoir avant de vous lancer.</p>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${openFaq === i ? "open" : ""}`}
              data-reveal
              style={revealDelay(i * 45)}
            >
              <button
                type="button"
                className="faq-question"
                aria-expanded={openFaq === i}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{item.q}</span>
                {openFaq === i ? (
                  <ChevronUp size={20} aria-hidden />
                ) : (
                  <ChevronDown size={20} aria-hidden />
                )}
              </button>
              {openFaq === i && (
                <div
                  className="faq-answer"
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                >
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-inner" data-reveal>
          <h2 className="display-heading cta-title">
            Rejoignez 500+ commerces qui pilotent leur activité avec Ecom 360
            PME
          </h2>
          <p>
            {trialAccrocheEssaiAccompagnement()}
            Sans engagement. Opérationnel en moins de 5 minutes.
          </p>
          <div className="cta-buttons">
            <a
              href={`${APP_URL}/demo-request`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-cta"
              onClick={() => track("landing_signup_click", { location: "cta" })}
            >
              Démarrer gratuitement — Sans engagement
            </a>
            <a
              href={DEMO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-cta-demo"
              onClick={() => track("landing_demo_click", { location: "cta" })}
            >
              <MessageCircle size={20} /> Demander une démo
            </a>
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA — conversion without cluttering desktop */}
      <div
        className="mobile-sticky-cta"
        role="region"
        aria-label="Actions rapides"
      >
        <a
          href={`${APP_URL}/demo-request`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mobile-sticky-cta-primary"
          onClick={() =>
            track("landing_signup_click", { location: "mobile_sticky" })
          }
        >
          {trialStickyCourt()}
        </a>
        <a
          href={DEMO_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-demo mobile-sticky-cta-secondary"
          onClick={() =>
            track("landing_demo_click", { location: "mobile_sticky" })
          }
        >
          <MessageCircle size={18} aria-hidden />
          Démo
        </a>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner container">
          <div className="footer-brand">
            <div className="footer-logo">
              <Store size={22} strokeWidth={2} aria-hidden />
              <span>Ecom 360 PME</span>
            </div>
            <p className="footer-tagline">
              POS, stocks et paiements mobiles — une seule plateforme.
            </p>
          </div>
          <nav className="footer-links" aria-label="Pied de page">
            <a href="#features">Fonctionnalités</a>
            <a href="#apercu">Aperçu</a>
            <a href="#comparaison">Comparatif</a>
            <a href="#pricing">Tarifs</a>
            <a href="#faq">FAQ</a>
            <a
              href={`${APP_URL}/login`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connexion
            </a>
          </nav>
          <div className="footer-bottom">
            <div className="footer-copy">
              © 2026 Ecom 360 PME — Sénégal & Afrique
            </div>
            <div className="footer-powered">
              Powered by{" "}
              <span className="footer-powered-name">Manarix Solutions</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
