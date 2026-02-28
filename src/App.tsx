import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  CreditCard,
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
} from "lucide-react";
import { Analytics, track } from "@vercel/analytics/react";
import "./App.css";
import "./Landing.css";

const APP_URL = import.meta.env.VITE_APP_URL || "http://localhost:5173";
const WHATSAPP_DEMO = import.meta.env.VITE_WHATSAPP_DEMO || "221778000000";
const WHATSAPP_DEMO_TEXT = "Bonjour, je souhaite demander une démo de Ecom 360 PME.";
const DEMO_WHATSAPP_URL = `https://wa.me/${WHATSAPP_DEMO}?text=${encodeURIComponent(WHATSAPP_DEMO_TEXT)}`;

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
    a: "Oui ! Chaque nouveau compte bénéficie de 30 jours d'essai gratuit du plan Pro. Aucune carte bancaire requise pour commencer.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Absolument. Toutes les données sont chiffrées (SSL/TLS), sauvegardées automatiquement chaque jour, et stockées sur des serveurs sécurisés.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, sans engagement. Vous pouvez annuler à tout moment. En cas d'annulation, vous conservez l'accès jusqu'à la fin de la période payée.",
  },
  {
    q: "Comment payer ? Wave, Orange Money ?",
    a: "Nous acceptons Wave, Orange Money et carte bancaire. Choisissez la méthode qui vous convient.",
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
    ],
    cta: "Essai gratuit 30 jours",
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

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [yearlyBilling, setYearlyBilling] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Analytics />
      {/* Header */}
      <header className={`landing-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner container">
          <a href="/" className="logo">
            <Store size={28} strokeWidth={2} />
            <span>Ecom 360 PME</span>
          </a>
          <nav className="header-nav">
            <div className="nav-links">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>
                Fonctionnalités
              </a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>
                Tarifs
              </a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </a>
            </div>
            <div className="nav-actions">
              <a 
              href={`${APP_URL}/login`} 
              target="_blank"
              rel="noopener noreferrer"
              className="nav-login"
              onClick={() => track("landing_login_click", { location: "header" })}
              >
                Connexion
              </a>
              <a
                href={DEMO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-demo"
                onClick={() => track("landing_demo_click", { location: "header" })}
              >
                <MessageCircle size={18} /> Démo
              </a>
              <a
                href={`${APP_URL}/register`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                onClick={() => track("landing_signup_click", { location: "header" })}
              >
                Essai gratuit
              </a>
            </div>
          </nav>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer" : "Menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>
              Fonctionnalités
            </a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>
              Tarifs
            </a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </a>
            <a
              href={`${APP_URL}/login`}
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
                href={`${APP_URL}/register`}
                className="btn btn-primary"
                onClick={() => {
                  track("landing_signup_click", { location: "mobile_menu" });
                  setMobileMenuOpen(false);
                }}
              >
                Essai gratuit
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner container">
          <div className="hero-content">
            <p className="hero-eyebrow">
              La solution tout-en-un pour les commerces africains
            </p>
            <h1>
              Vendez plus, gérez mieux.
              <br />
              <span className="highlight">Sans perdre de temps.</span>
            </h1>
            <p>
              POS tactile, stocks en temps réel, Wave & Orange Money, rapports
              automatiques — tout ce dont vous avez besoin pour faire grandir
              votre commerce.
            </p>
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
                href={`${APP_URL}/register`}
                className="btn btn-primary"
                onClick={() => track("landing_signup_click", { location: "hero" })}
              >
                Démarrer 30 jours gratuits
              </a>
              <a
                href={DEMO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-demo"
                onClick={() => track("landing_demo_click", { location: "hero" })}
              >
                <MessageCircle size={18} /> Demander une démo
              </a>
              <a
                href="#pricing"
                className="btn btn-secondary"
                onClick={() => track("landing_pricing_click", { location: "hero" })}
              >
                Voir les tarifs
              </a>
            </div>
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
            <div className="hero-card">
              <div className="hero-card-header">
                <BarChart3 size={24} color="var(--color-primary)" />
                <h3>Tableau de bord — Aujourd'hui</h3>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <span>127 450 F</span>
                  <small>Ventes</small>
                </div>
                <div className="hero-stat">
                  <span>23</span>
                  <small>Transactions</small>
                </div>
                <div className="hero-stat">
                  <span>12</span>
                  <small>Produits vendus</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Social proof */}
      <section className="stats-bar">
        <div className="stats-inner container">
          <div className="stat-item">
            <span className="stat-value">500+</span>
            <span className="stat-label">Commerces actifs</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">2M+</span>
            <span className="stat-label">Transactions traitées</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">4.8/5</span>
            <span className="stat-label">Satisfaction client</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">&lt; 5 min</span>
            <span className="stat-label">Pour démarrer</span>
          </div>
        </div>
      </section>

      {/* Pain points / Benefits */}
      <section className="benefits">
        <div className="section-header">
          <h2>Vous perdez du temps et de l'argent ?</h2>
          <p>
            Les carnets et Excel, c'est fini. Ecom 360 PME vous fait gagner des
            heures chaque semaine.
          </p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">❌</div>
            <h3>Avant</h3>
            <ul>
              <li>Erreurs de calcul à la caisse</li>
              <li>Stock inconnu ou obsolète</li>
              <li>Crédits clients oubliés</li>
              <li>Rapports faits à la main</li>
            </ul>
          </div>
          <div className="benefit-arrow">→</div>
          <div className="benefit-card highlight">
            <div className="benefit-icon">✅</div>
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

      {/* Features */}
      <section id="features" className="features">
        <div className="section-header">
          <h2>Tout ce dont vous avez besoin</h2>
          <p>
            Une solution complète pensée pour les commerces africains :
            multi-boutiques, paiements locaux, rôles et crédits clients.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <ShoppingCart size={24} />
            </div>
            <h3>Point de vente (POS)</h3>
            <p>
              Interface tactile optimisée mobile et desktop. Recherche rapide,
              panier modifiable, reçus instantanés.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Package size={24} />
            </div>
            <h3>Stocks & inventaire</h3>
            <p>
              Alertes stock bas, mouvements par boutique, seuils
              personnalisables. Gardez le contrôle de vos produits.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Users size={24} />
            </div>
            <h3>Clients & crédits</h3>
            <p>
              Fiches clients, historique d'achats, gestion des crédits et
              paiements partiels.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <BarChart3 size={24} />
            </div>
            <h3>Rapports & export</h3>
            <p>
              Ventes par jour/semaine/mois, top produits, export PDF et Excel
              pour votre comptable.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <CreditCard size={24} />
            </div>
            <h3>Paiements locaux</h3>
            <p>
              Espèces, Wave, Orange Money. Toutes les méthodes de paiement
              adaptées au marché africain.
            </p>
          </div>
          <div className="feature-card">
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

      {/* How it works */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>Démarrez en 3 étapes</h2>
          <p>
            Aucune formation nécessaire. Vous êtes opérationnel en quelques
            minutes.
          </p>
        </div>
        <div className="steps">
          <div className="step">
            <span className="step-num">1</span>
            <h3>Créez votre compte</h3>
            <p>
              Email, mot de passe — c'est tout. Pas de carte bancaire pour
              l'essai.
            </p>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <h3>Ajoutez vos produits</h3>
            <p>
              Importez ou saisissez vos articles. Définissez vos prix et stocks.
            </p>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <h3>Vendez !</h3>
            <p>Utilisez le POS, enregistrez vos ventes, suivez vos rapports.</p>
          </div>
        </div>
        <div className="steps-cta">
          <a
            href={`${APP_URL}/register`}
            className="btn btn-primary"
            onClick={() => track("landing_signup_click", { location: "how_it_works" })}
          >
            Commencer maintenant — C'est gratuit
          </a>
          <a
            href={DEMO_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-demo"
            onClick={() => track("landing_demo_click", { location: "how_it_works" })}
          >
            <MessageCircle size={18} /> Demander une démo
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-header">
          <h2>Ils ont choisi Ecom 360 PME</h2>
          <p>Des commerçants comme vous qui ont simplifié leur quotidien.</p>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card">
              <Quote size={24} className="testimonial-quote" />
              <p className="testimonial-text">"{t.quote}"</p>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof - Payment methods */}
      <section className="social-proof">
        <div className="payment-section-inner">
          <h3 className="payment-methods-title">Paiements acceptés</h3>
          <p className="payment-methods-subtitle">
            Payez et encaissez comme vos clients préfèrent
          </p>
          <div className="payment-methods">
            <div
              className="payment-method payment-method-featured"
              title="Wave"
            >
              <div className="payment-method-img">
                <img
                  src="/images/payments/wave.png"
                  alt="Wave - Mobile Money"
                />
              </div>
              <span>Wave</span>
            </div>
            <div
              className="payment-method payment-method-featured"
              title="Orange Money"
            >
              <div className="payment-method-img">
                <img
                  src="/images/payments/orange-money.png"
                  alt="Orange Money"
                />
              </div>
              <span>Orange Money</span>
            </div>
            {/* <div
              className="payment-method payment-method-featured"
              title="Carte bancaire"
            >
              <div className="payment-method-img">
                <img
                  src="/images/payments/credit-card.svg"
                  alt="Carte bancaire"
                />
              </div>
              <span>Carte bancaire</span>
            </div> */}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing">
        <div className="section-header">
          <h2>Des tarifs adaptés à votre croissance</h2>
          <p>
            Sans engagement. Essai gratuit 30 jours. Économisez en payant à
            l'année.
          </p>
        </div>
        <div className="pricing-billing-toggle">
          <button
            type="button"
            className={`pricing-billing-btn ${!yearlyBilling ? "active" : ""}`}
            onClick={() => setYearlyBilling(false)}
          >
            Mensuel
          </button>
          <button
            type="button"
            className={`pricing-billing-btn ${yearlyBilling ? "active" : ""}`}
            onClick={() => setYearlyBilling(true)}
          >
            Annuel
            <span className="pricing-billing-badge">-17%</span>
          </button>
        </div>
        <div className="pricing-grid">
          {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((key) => {
            const plan = PLANS[key];
            const price = yearlyBilling ? plan.yearly : plan.monthly;
            const period = yearlyBilling ? " / an" : " / mois";
            const formattedPrice = new Intl.NumberFormat("fr-FR").format(price);
            return (
              <div
                key={key}
                className={`pricing-card ${plan.popular ? "popular" : ""}`}
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
        <div className="section-header">
          <h2>Questions fréquentes</h2>
          <p>Tout ce que vous devez savoir avant de vous lancer.</p>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${openFaq === i ? "open" : ""}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="faq-question">
                <span>{item.q}</span>
                {openFaq === i ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
              {openFaq === i && <div className="faq-answer">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-inner">
          <h2>Rejoignez 500+ commerces qui font confiance à Ecom 360 PME</h2>
          <p>
            30 jours d'essai gratuit. Aucune carte bancaire. Opérationnel en
            moins de 5 minutes.
          </p>
          <div className="cta-buttons">
            <a
              href={`${APP_URL}/register`}
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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner container">
          <div className="footer-logo">Ecom 360 PME</div>
          <div className="footer-links">
            <a href="#features">Fonctionnalités</a>
            <a href="#pricing">Tarifs</a>
            <a href="#faq">FAQ</a>
            <a href={`${APP_URL}/login`}>Connexion</a>
          </div>
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
