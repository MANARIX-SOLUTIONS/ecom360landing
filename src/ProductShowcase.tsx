import type { CSSProperties } from "react";
import {
  ArrowRight,
  Package,
  Receipt,
  Smartphone,
  TrendingUp,
  Wallet,
} from "lucide-react";

function revealDelay(ms: number): CSSProperties {
  return { ["--reveal-delay" as string]: `${ms}ms` } as CSSProperties;
}

export function ProductShowcase() {
  return (
    <section
      id="apercu"
      className="product-showcase"
      aria-labelledby="product-showcase-heading"
    >
      <div className="section-header" data-reveal>
        <p className="section-label">Aperçu produit</p>
        <h2 id="product-showcase-heading" className="display-heading">
          Pas une démo figée — voici l&apos;interface qui vous attend
        </h2>
        <p>
          Des écrans conçus pour le terrain : encaisser vite, voir le stock, et
          finir la journée sans recalculer vos chiffres à la main.
        </p>
      </div>

      <div className="product-showcase-grid">
        <article
          className="product-mockup product-mockup--hero"
          data-reveal
          style={revealDelay(0)}
        >
          <div className="mockup-chrome" aria-hidden>
            <span className="mockup-chrome-dots">
              <span />
              <span />
              <span />
            </span>
            <span className="mockup-chrome-url">app.ecom360.app / pos</span>
          </div>
          <div className="mockup-body mockup-pos">
            <header className="mockup-pos-top">
              <div>
                <p className="mockup-kicker">Boutique Plateau</p>
                <p className="mockup-title">Nouvelle vente</p>
              </div>
              <span className="mockup-pill mockup-pill--live">
                <span className="mockup-pulse" aria-hidden />
                POS en ligne
              </span>
            </header>
            <ul className="mockup-lines" aria-label="Lignes de panier exemple">
              <li>
                <span>Riz parfumé 5 kg</span>
                <span className="mockup-num">×2</span>
                <span className="mockup-num">18 000</span>
              </li>
              <li>
                <span>Huile 2 L</span>
                <span className="mockup-num">×1</span>
                <span className="mockup-num">4 500</span>
              </li>
              <li>
                <span>Eau minérale pack</span>
                <span className="mockup-num">×3</span>
                <span className="mockup-num">3 750</span>
              </li>
            </ul>
            <div className="mockup-pos-total">
              <span>Total TTC</span>
              <strong>26 250 FCFA</strong>
            </div>
            <div className="mockup-pay-row" aria-hidden>
              <span className="mockup-pay mockup-pay--wave">
                <Wallet size={16} aria-hidden /> Wave
              </span>
              <span className="mockup-pay mockup-pay--orange">OM</span>
              <span className="mockup-pay mockup-pay--cash">Espèces</span>
            </div>
            <p className="mockup-foot">
              <Receipt size={14} aria-hidden /> Reçu SMS ou imprimé —
              traçabilité instantanée
            </p>
          </div>
          <p className="product-mockup-caption">
            <strong>Caisse tactile</strong>
            <span>
              Recherche produit, panier, paiements locaux sur un seul écran.
            </span>
          </p>
        </article>

        <article
          className="product-mockup product-mockup--stock"
          data-reveal
          style={revealDelay(70)}
        >
          <div className="mockup-chrome" aria-hidden>
            <span className="mockup-chrome-dots">
              <span />
              <span />
              <span />
            </span>
            <span className="mockup-chrome-url">app.ecom360.app / stocks</span>
          </div>
          <div className="mockup-body mockup-stock">
            <div className="mockup-stock-head">
              <Package size={20} strokeWidth={2} aria-hidden />
              <div>
                <p className="mockup-kicker">Inventaire</p>
                <p className="mockup-title">Alertes &amp; seuils</p>
              </div>
            </div>
            <table className="mockup-table">
              <thead>
                <tr>
                  <th scope="col">Produit</th>
                  <th scope="col">Qté</th>
                  <th scope="col">Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lait 1 L</td>
                  <td>42</td>
                  <td>
                    <span className="mockup-badge mockup-badge--ok">OK</span>
                  </td>
                </tr>
                <tr>
                  <td>Savon</td>
                  <td>8</td>
                  <td>
                    <span className="mockup-badge mockup-badge--warn">Bas</span>
                  </td>
                </tr>
                <tr>
                  <td>Riz 25 kg</td>
                  <td>0</td>
                  <td>
                    <span className="mockup-badge mockup-badge--crit">
                      Rupture
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="mockup-stock-hint">
              <ArrowRight size={14} aria-hidden /> Réassort suggéré pour 2
              articles
            </p>
          </div>
          <p className="product-mockup-caption">
            <strong>Stocks synchronisés</strong>
            <span>
              Moins de ruptures, moins de surestimation : le stock suit chaque
              vente.
            </span>
          </p>
        </article>

        <article
          className="product-mockup product-mockup--phone"
          data-reveal
          style={revealDelay(140)}
        >
          <div className="mockup-phone-frame" aria-hidden>
            <div className="mockup-phone-notch" />
            <div className="mockup-phone-screen">
              <div className="mockup-mobile-top">
                <Smartphone size={18} aria-hidden />
                <span>Tableau du jour</span>
              </div>
              <div className="mockup-mobile-metric">
                <span className="mockup-mobile-label">Encaissements</span>
                <span className="mockup-mobile-value">127 450 FCFA</span>
                <span className="mockup-mobile-trend">
                  <TrendingUp size={14} aria-hidden /> +18 % vs hier
                </span>
              </div>
              <div className="mockup-mobile-bars" aria-hidden>
                <span style={{ height: "40%" }} />
                <span style={{ height: "65%" }} />
                <span style={{ height: "52%" }} />
                <span style={{ height: "88%" }} />
                <span style={{ height: "72%" }} />
                <span style={{ height: "95%" }} />
                <span style={{ height: "61%" }} />
              </div>
              <p className="mockup-mobile-note">
                Consultable hors comptoir — vous gardez le contrôle entre deux
                clients.
              </p>
            </div>
          </div>
          <p className="product-mockup-caption">
            <strong>Mobile &amp; terrain</strong>
            <span>
              Vos indicateurs suivent où vous êtes : magasin, entrepôt ou
              déplacement.
            </span>
          </p>
        </article>
      </div>
    </section>
  );
}
