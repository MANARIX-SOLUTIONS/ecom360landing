/**
 * Durée d'essai gratuite sur la landing et le plan Pro à l'inscription.
 * Doit rester alignée avec le backend :
 * ecom360be/src/main/java/.../SubscriptionService.java — TRIAL_DAYS.
 *
 * Surcharge au build : VITE_TRIAL_DAYS=14
 */
const raw = Number(import.meta.env.VITE_TRIAL_DAYS);

export const TRIAL_DAYS =
  Number.isFinite(raw) && raw >= 1 ? Math.min(365, Math.floor(raw)) : 14;

/** Ex. "1 jour" ou "14 jours" */
export function trialLabelJours(): string {
  return TRIAL_DAYS === 1 ? "1 jour" : `${TRIAL_DAYS} jours`;
}

/** "1 jour offert" / "14 jours offerts" — accords pour CTA */
export function trialOffertsAccord(): string {
  return TRIAL_DAYS === 1 ? "1 jour offert" : `${trialLabelJours()} offerts`;
}

export function trialHeadingPendantEssai(): string {
  if (TRIAL_DAYS === 1) return "Pendant votre jour d'essai";
  return `Pendant vos ${trialLabelJours()} d'essai`;
}

export function trialCtaEssaiOffert(): string {
  return `Essai ${trialLabelJours()} offert`;
}

export function trialCtaCommencerOfferts(): string {
  return `Commencer — ${trialOffertsAccord()}`;
}

export function trialCtaCommencerMaintenant(): string {
  return `Commencer maintenant — ${trialOffertsAccord()}`;
}

export function trialCtaEssaiGratuitPlan(): string {
  return `Essai gratuit ${trialLabelJours()}`;
}

export function trialFaqPeutEssayerReponse(): string {
  return `Oui ! Chaque nouveau compte bénéficie de ${trialLabelJours()} d'essai gratuit du plan Pro. Inscription immédiate, sans frais pendant l'essai, et vous choisissez ensuite le plan qui vous convient sans perdre vos données ni vos réglages.`;
}

export function trialSansEngagementPricing(): string {
  return `Sans engagement. ${trialCtaEssaiGratuitPlan()} avec accompagnement pour bien configurer votre boutique. Économisez en payant à l'année.`;
}

/** Phrase pour bloc CTA final (sous le titre) */
export function trialAccrocheEssaiAccompagnement(): string {
  if (TRIAL_DAYS === 1) {
    return "1 jour d'essai gratuit avec accompagnement pour vos premiers pas.";
  }
  return `${TRIAL_DAYS} jours d'essai gratuit avec accompagnement pour vos premiers pas.`;
}

/** Barre mobile : court */
export function trialStickyCourt(): string {
  return `Essai ${trialLabelJours()}`;
}
