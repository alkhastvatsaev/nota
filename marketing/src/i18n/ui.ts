import type { Locale } from "./types";

type UiDict = {
  openNota: string;
  openNotaTitle: string;
  openNotaAria: string;
  skipToContent: string;
  noAccountAccess: string;
  openNotaNow: string;
  noSignupNoWait: string;
  home: string;
  about: string;
  faqTitle: string;
  footerNoEmail: string;
  footerAccess: string;
  langFr: string;
  langEn: string;
  langSwitchAria: string;
  heroSub: string;
  heroSr: string;
  hookLine1: string;
  hookLine2: string;
  hookAria: string;
  journeyAria: string;
  journey: { title: string; line: string }[];
  productHeading: string;
  productStages: string[];
  midCta: string;
  midCtaAria: string;
  seoIntroHeading: string;
  seoIntroBodyBefore: string;
  seoIntroBodyAfter: string;
  seoIntroMeta: string;
  siteLabel: string;
  appLabel: string;
  founderLabel: string;
  builtBy: string;
  galleryTitle: string;
  galleryLead: string;
  galleryShots: { src: string; alt: string; caption: string }[];
  faqHeading: string;
  loading: string;
  goFurther: string;
  linkFieldSoftware: string;
  linkJobMgmt: string;
  linkSectors: string;
  linkExcelGuide: string;
  linkCrmNoSignup: string;
  linkFieldJobs: string;
  homeBreadcrumb: string;
  notFoundEyebrow: string;
  notFoundTitle: string;
  notFoundLead: string;
  notFoundSeoTitle: string;
  notFoundSeoDesc: string;
  openNotaBottom: string;
  orgDescription: string;
  softwareDescription: string;
  offerDescription: string;
};

export const UI: Record<Locale, UiDict> = {
  fr: {
    openNota: "Ouvrir Nota",
    openNotaTitle: "Ouvrir l’application CRM Nota",
    openNotaAria: "Ouvrir Nota — ouvrir l’application CRM",
    skipToContent: "Aller au contenu",
    noAccountAccess: "Sans compte · Accès immédiat",
    openNotaNow: "Ouvrez Nota maintenant",
    noSignupNoWait: "Sans inscription. Sans attente.",
    home: "Accueil",
    about: "À propos",
    faqTitle: "Une question ?",
    footerNoEmail: "Pas d’email collecté sur ce site.",
    footerAccess: "Accès direct à l’app.",
    langFr: "FR",
    langEn: "EN",
    langSwitchAria: "Choisir la langue",
    heroSub: "Carte, techniciens, dossiers — pour vos missions sur site.",
    heroSr: "CRM — logiciel d’interventions terrain pour entreprises à équipes mobiles",
    hookLine1: "Excel, WhatsApp, post-its…",
    hookLine2: "Nota rassemble tout ça pour vous.",
    hookAria: "Promesse Nota",
    journeyAria: "Comment Nota fonctionne",
    journey: [
      { title: "Noter", line: "Ce qu’ils vous disent, gardé." },
      { title: "Suivre", line: "Vous voyez où en est chaque affaire." },
      { title: "Rappeler", line: "Vous savez qui relancer, et quand." },
    ],
    productHeading: "Vos affaires, étape par étape.",
    productStages: ["Prospect", "Échange", "Offre", "Signé"],
    midCta: "C’est à vous.",
    midCtaAria: "Accéder à Nota",
    seoIntroHeading: "CRM pour entreprises à interventions sur site",
    seoIntroBodyBefore: "Nota CRM",
    seoIntroBodyAfter:
      " réunit carte des missions, dossiers clients, hub technicien mobile (photos, signature) et facturation — maintenance, installation, services, dépannage : toute équipe qui intervient chez le client.",
    seoIntroMeta: "Créateur",
    siteLabel: "Site",
    appLabel: "App",
    founderLabel: "Créateur",
    builtBy: "Développé par",
    galleryTitle: "L’application en images",
    galleryLead: "Captures réelles de l’application Nota — carte, dossiers et facturation.",
    galleryShots: [
      {
        src: "/product/carte.png",
        alt: "Carte des interventions Nota — vue des missions sur le terrain",
        caption: "Carte des missions",
      },
      {
        src: "/product/interventions.png",
        alt: "Liste et dossiers d’interventions Nota",
        caption: "Dossiers interventions",
      },
      {
        src: "/product/facturation.png",
        alt: "Hub facturation Nota lié aux interventions",
        caption: "Facturation",
      },
    ],
    faqHeading: "Questions fréquentes",
    loading: "Chargement…",
    goFurther: "Aller plus loin :",
    linkFieldSoftware: "Logiciel interventions terrain",
    linkJobMgmt: "Gestion d’interventions",
    linkSectors: "Secteurs concernés",
    linkExcelGuide: "Guide Excel → logiciel",
    linkCrmNoSignup: "CRM sans inscription",
    linkFieldJobs: "Interventions terrain",
    homeBreadcrumb: "Accueil",
    notFoundEyebrow: "404",
    notFoundTitle: "Page introuvable",
    notFoundLead: "Cette URL n’existe pas. Revenez à l’accueil ou ouvrez Nota.",
    notFoundSeoTitle: "Page introuvable — Nota",
    notFoundSeoDesc: "Cette page n’existe pas. Revenez à l’accueil Nota ou ouvrez l’application.",
    openNotaBottom: "Ouvrir Nota",
    orgDescription: "Nota CRM — interventions terrain : carte, techniciens mobile, facturation.",
    softwareDescription:
      "Nota CRM : carte des interventions, hub technicien, dossiers et facturation pour les entreprises à missions sur site. Accès direct sur heynota.app / app.heynota.app.",
    offerDescription: "Accès direct à Nota, sans inscription",
  },
  en: {
    openNota: "Open Nota",
    openNotaTitle: "Open the Nota CRM app",
    openNotaAria: "Open Nota — open the CRM application",
    skipToContent: "Skip to content",
    noAccountAccess: "No account · Instant access",
    openNotaNow: "Open Nota now",
    noSignupNoWait: "No sign-up. No waiting.",
    home: "Home",
    about: "About",
    faqTitle: "Questions?",
    footerNoEmail: "No email is collected on this site.",
    footerAccess: "Direct access to the app.",
    langFr: "FR",
    langEn: "EN",
    langSwitchAria: "Choose language",
    heroSub: "Map, technicians, case files — for on-site jobs.",
    heroSr: "CRM — field service software for companies with mobile teams",
    hookLine1: "Spreadsheets, WhatsApp, sticky notes…",
    hookLine2: "Nota brings it all together.",
    hookAria: "Nota promise",
    journeyAria: "How Nota works",
    journey: [
      { title: "Capture", line: "What they tell you, saved." },
      { title: "Track", line: "See where every job stands." },
      { title: "Follow up", line: "Know who to call, and when." },
    ],
    productHeading: "Your pipeline, step by step.",
    productStages: ["Lead", "Talk", "Quote", "Won"],
    midCta: "Your move.",
    midCtaAria: "Go to Nota",
    seoIntroHeading: "CRM for companies with on-site work",
    seoIntroBodyBefore: "Nota CRM",
    seoIntroBodyAfter:
      " brings together a live job map, client files, a mobile technician hub (photos, signature) and billing — maintenance, install, service, repair: any team that works at the customer site.",
    seoIntroMeta: "Founder",
    siteLabel: "Site",
    appLabel: "App",
    founderLabel: "Founder",
    builtBy: "Built by",
    galleryTitle: "The app in pictures",
    galleryLead: "Real screenshots of the Nota app — map, cases and billing.",
    galleryShots: [
      {
        src: "/product/carte.png",
        alt: "Nota job map — live field missions",
        caption: "Job map",
      },
      {
        src: "/product/interventions.png",
        alt: "Nota intervention list and case files",
        caption: "Job files",
      },
      {
        src: "/product/facturation.png",
        alt: "Nota billing hub linked to jobs",
        caption: "Billing",
      },
    ],
    faqHeading: "FAQ",
    loading: "Loading…",
    goFurther: "Go further:",
    linkFieldSoftware: "Field service software",
    linkJobMgmt: "Job management",
    linkSectors: "Industries",
    linkExcelGuide: "Excel → software guide",
    linkCrmNoSignup: "CRM without sign-up",
    linkFieldJobs: "Field jobs",
    homeBreadcrumb: "Home",
    notFoundEyebrow: "404",
    notFoundTitle: "Page not found",
    notFoundLead: "This URL does not exist. Go back home or open Nota.",
    notFoundSeoTitle: "Page not found — Nota",
    notFoundSeoDesc: "This page does not exist. Go back to Nota home or open the app.",
    openNotaBottom: "Open Nota",
    orgDescription: "Nota CRM — field service: map, mobile technicians, billing.",
    softwareDescription:
      "Nota CRM: job map, technician hub, case files and billing for companies with on-site work. Direct access on heynota.app / app.heynota.app.",
    offerDescription: "Direct access to Nota, no sign-up",
  },
};
