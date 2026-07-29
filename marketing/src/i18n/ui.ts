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
  linkChecklist: string;
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
  contact: string;
  contactEyebrow: string;
  contactTitle: string;
  contactLead: string;
  contactName: string;
  contactEmail: string;
  contactMessage: string;
  contactSend: string;
  contactSending: string;
  contactSuccess: string;
  contactError: string;
  contactErrorConfig: string;
  contactOrMail: string;
  contactDirect: string;
  footerPrivacy: string;
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
    footerNoEmail: "Contact via le formulaire ou l’email affiché. Pas de newsletter.",
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
      { title: "Demande", line: "Le besoin client, capturé au bureau." },
      { title: "Mission", line: "Technicien sur le terrain, dossier à jour." },
      { title: "Facture", line: "Devis et facture liés à la mission close." },
    ],
    productHeading: "Carte, mobile, facturation.",
    productStages: ["Carte", "Technicien", "Dossiers", "Facture"],
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
    linkChecklist: "Checklist terrain 2026",
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
    contact: "Contact",
    contactEyebrow: "Contact",
    contactTitle: "Contacter Nota",
    contactLead: "Une question sur Nota CRM ? Envoyez un message — on vous répond rapidement.",
    contactName: "Nom",
    contactEmail: "Email",
    contactMessage: "Message",
    contactSend: "Envoyer",
    contactSending: "Envoi…",
    contactSuccess: "Message envoyé. Merci — je vous réponds dès que possible.",
    contactError: "Envoi impossible. Réessayez ou écrivez directement par email.",
    contactErrorConfig: "Formulaire temporairement indisponible. Utilisez l’email ci-dessous.",
    contactOrMail: "Ou écrivez directement :",
    contactDirect: "Email direct",
    footerPrivacy: "Contact via le formulaire ou l’email affiché. Pas de newsletter.",
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
    footerNoEmail: "Contact via the form or the email shown. No newsletter.",
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
      { title: "Request", line: "Customer need, captured at the office." },
      { title: "Job", line: "Technician on site, case file up to date." },
      { title: "Invoice", line: "Quote and invoice tied to the closed job." },
    ],
    productHeading: "Map, mobile, billing.",
    productStages: ["Map", "Technician", "Cases", "Invoice"],
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
    linkChecklist: "2026 field checklist",
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
    contact: "Contact",
    contactEyebrow: "Contact",
    contactTitle: "Contact Nota",
    contactLead: "A question about Nota CRM? Send a message — we’ll get back to you quickly.",
    contactName: "Name",
    contactEmail: "Email",
    contactMessage: "Message",
    contactSend: "Send",
    contactSending: "Sending…",
    contactSuccess: "Message sent. Thanks — I’ll reply as soon as I can.",
    contactError: "Could not send. Try again or email me directly.",
    contactErrorConfig: "Form temporarily unavailable. Use the email below.",
    contactOrMail: "Or email directly:",
    contactDirect: "Direct email",
    footerPrivacy: "Contact via the form or the email shown. No newsletter.",
  },
};
