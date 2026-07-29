import type { Locale } from "./types";

type UiDict = {
  openNota: string;
  heroCta: string;
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
  productLead: string;
  productStages: string[];
  productDemoLines: string[][];
  midCta: string;
  midCtaLead: string;
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
  featuresHeading: string;
  featuresLead: string;
  audienceHeading: string;
  audienceBody: string;
  featureCards: { title: string; body: string; img: string; alt: string }[];
};

export const UI: Record<Locale, UiDict> = {
  fr: {
    heroCta: "Voir mes missions",
    openNota: "Voir mes missions",
    openNotaTitle: "Ouvrir l’application Nota — sans inscription sur ce site",
    openNotaAria: "Ouvrir Nota — accéder à l’application",
    skipToContent: "Aller au contenu",
    noAccountAccess: "Sans compte. Accès immédiat à l’app.",
    openNotaNow: "Prêt à retrouver le fil de vos missions ?",
    noSignupNoWait: "Pas de formulaire ici. Une ouverture, et vous y êtes.",
    home: "Accueil",
    about: "À propos",
    faqTitle: "Une question ?",
    footerNoEmail: "Contact via le formulaire ou l’email affiché. Pas de newsletter.",
    footerAccess: "Accès direct à l’app.",
    langFr: "FR",
    langEn: "EN",
    langSwitchAria: "Choisir la langue",
    heroSub:
      "Vous envoyez des techniciens chez vos clients ? Nota réunit carte, mobile et facturation — pour que toute l’équipe voie la même chose.",
    heroSr: "Logiciel d’interventions terrain : carte des missions, hub technicien et facturation",
    hookLine1: "Excel ici. WhatsApp là. Personne n’a la même info.",
    hookLine2: "Nota vous remet tout le monde sur la même page.",
    hookAria: "Le problème que Nota résout",
    journeyAria: "Votre journée avec Nota",
    journey: [
      {
        title: "Le client appelle",
        line: "Vous notez l’adresse et le besoin une seule fois — tout le monde le voit.",
      },
      {
        title: "Le technicien part",
        line: "Il ouvre sa mission sur téléphone, photos et signature sur place.",
      },
      {
        title: "Vous facturez",
        line: "Devis et facture suivent la mission close — sans ressaisie.",
      },
    ],
    productHeading: "Ce que vous voyez, concrètement",
    productLead: "Pas un schéma abstrait : le fil réel de vos missions, de la carte à la facture.",
    productStages: ["Carte", "Terrain", "Bureau", "Facture"],
    productDemoLines: [
      ["Mission Dupont — en route", "Chaudière — sur place"],
      ["Photos avant / après", "Signature client"],
      ["Dossier partagé", "Statut à jour"],
      ["Devis lié", "Facture prête"],
    ],
    midCta: "Essayez avec vos vraies missions",
    midCtaLead: "Ouvrez l’app maintenant — sans créer de compte sur ce site.",
    midCtaAria: "Accéder à Nota",
    seoIntroHeading: "Vous méritez une vue claire de vos interventions",
    seoIntroBodyBefore: "Nota",
    seoIntroBodyAfter:
      " est pensé pour vous : carte des missions, dossiers clients, téléphone technicien (photos, signature) et facturation — pour les équipes qui travaillent chez le client.",
    seoIntroMeta: "Créateur",
    siteLabel: "Site",
    appLabel: "App",
    founderLabel: "Créateur",
    builtBy: "Développé par",
    galleryTitle: "L’app, telle que vous la verrez",
    galleryLead: "Captures réelles — carte, dossiers, facturation.",
    galleryShots: [
      {
        src: "/product/carte.png",
        alt: "Carte des interventions Nota — vue des missions sur le terrain",
        caption: "Votre carte du jour",
      },
      {
        src: "/product/interventions.png",
        alt: "Liste et dossiers d’interventions Nota",
        caption: "Vos dossiers",
      },
      {
        src: "/product/facturation.png",
        alt: "Hub facturation Nota lié aux interventions",
        caption: "Votre facturation",
      },
    ],
    faqHeading: "Questions que l’on nous pose souvent",
    loading: "Chargement…",
    goFurther: "Pour aller plus loin :",
    linkFieldSoftware: "Logiciel interventions terrain",
    linkJobMgmt: "Gestion d’interventions",
    linkSectors: "Pour qui",
    linkExcelGuide: "Guide Excel → logiciel",
    linkCrmNoSignup: "CRM sans inscription",
    linkFieldJobs: "Interventions terrain",
    linkChecklist: "Checklist terrain",
    homeBreadcrumb: "Accueil",
    notFoundEyebrow: "404",
    notFoundTitle: "Page introuvable",
    notFoundLead: "Cette URL n’existe pas. Revenez à l’accueil ou ouvrez Nota.",
    notFoundSeoTitle: "Page introuvable — Nota",
    notFoundSeoDesc: "Cette page n’existe pas. Revenez à l’accueil Nota ou ouvrez l’application.",
    openNotaBottom: "Ouvrir Nota",
    orgDescription: "Nota — interventions terrain : carte, techniciens mobile, facturation.",
    softwareDescription:
      "Nota : carte des interventions, hub technicien, dossiers et facturation pour les entreprises à missions sur site.",
    offerDescription: "Accès direct à Nota, sans inscription sur ce site",
    contact: "Contact",
    contactEyebrow: "On vous écoute",
    contactTitle: "Dites-nous ce qui coince sur le terrain",
    contactLead:
      "Une question, un doute, un besoin précis ? Écrivez — on vous répond rapidement, sans jargon.",
    contactName: "Votre nom",
    contactEmail: "Votre email",
    contactMessage: "Votre message",
    contactSend: "Envoyer",
    contactSending: "Envoi…",
    contactSuccess: "Message reçu. Merci — on vous répond dès que possible.",
    contactError: "Envoi impossible. Réessayez ou écrivez directement par email.",
    contactErrorConfig: "Formulaire temporairement indisponible. Utilisez l’email ci-dessous.",
    contactOrMail: "Ou écrivez directement :",
    contactDirect: "Email direct",
    footerPrivacy: "Contact via le formulaire ou l’email affiché. Pas de newsletter.",
    featuresHeading: "Trois endroits où vous gagnez du temps",
    featuresLead:
      "Une idée simple : moins de courses après l’info, plus de missions terminées. Trois vues réelles de l’app.",
    audienceHeading: "Si vous vous reconnaissez ici",
    audienceBody:
      "Maintenance, installation, dépannage, services récurrents, IT sur site, property management — toute équipe qui envoie des techniciens chez le client et en a assez d’Excel + messagerie.",
    featureCards: [
      {
        title: "Vous voyez où en est chaque mission",
        body: "Carte et statuts partagés : qui est assigné, où, et ce qu’il reste à faire — sans relancer WhatsApp.",
        img: "/product/carte.png",
        alt: "Carte des interventions Nota",
      },
      {
        title: "Votre technicien a tout sur le téléphone",
        body: "Mission, photos avant/après, signature, hors-ligne si le réseau coupe — puis synchro au retour.",
        img: "/product/interventions.png",
        alt: "Hub technicien Nota",
      },
      {
        title: "Vous facturez sans ressaisir",
        body: "Devis et factures suivent la mission close. Moins d’oublis, un fil du chantier au paiement.",
        img: "/product/facturation.png",
        alt: "Facturation Nota",
      },
    ],
  },
  en: {
    heroCta: "See my jobs",
    openNota: "See my jobs",
    openNotaTitle: "Open the Nota app — no sign-up on this site",
    openNotaAria: "Open Nota — go to the application",
    skipToContent: "Skip to content",
    noAccountAccess: "No account. Instant access to the app.",
    openNotaNow: "Ready to get your jobs in one place?",
    noSignupNoWait: "No form here. Open the app and you’re in.",
    home: "Home",
    about: "About",
    faqTitle: "Questions?",
    footerNoEmail: "Contact via the form or the email shown. No newsletter.",
    footerAccess: "Direct access to the app.",
    langFr: "FR",
    langEn: "EN",
    langSwitchAria: "Choose language",
    heroSub:
      "You send technicians to customer sites? Nota brings map, mobile and billing together — so the whole team sees the same truth.",
    heroSr: "Field service software: job map, technician hub and billing",
    hookLine1: "Spreadsheet here. WhatsApp there. Nobody has the same info.",
    hookLine2: "Nota puts everyone on the same page.",
    hookAria: "The problem Nota solves",
    journeyAria: "Your day with Nota",
    journey: [
      {
        title: "The customer calls",
        line: "You capture the address and need once — everyone sees it.",
      },
      {
        title: "The technician leaves",
        line: "They open the job on their phone, photos and signature on site.",
      },
      {
        title: "You invoice",
        line: "Quote and invoice follow the closed job — no retyping.",
      },
    ],
    productHeading: "What you’ll actually see",
    productLead: "Not an abstract diagram: the real thread of your jobs, from map to invoice.",
    productStages: ["Map", "Field", "Office", "Invoice"],
    productDemoLines: [
      ["Dupont job — en route", "Boiler — on site"],
      ["Before / after photos", "Customer signature"],
      ["Shared case file", "Live status"],
      ["Linked quote", "Invoice ready"],
    ],
    midCta: "Try it with your real jobs",
    midCtaLead: "Open the app now — no account on this site.",
    midCtaAria: "Go to Nota",
    seoIntroHeading: "You deserve a clear view of your field jobs",
    seoIntroBodyBefore: "Nota",
    seoIntroBodyAfter:
      " is built for you: live job map, client files, technician phone (photos, signature) and billing — for teams that work at the customer site.",
    seoIntroMeta: "Founder",
    siteLabel: "Site",
    appLabel: "App",
    founderLabel: "Founder",
    builtBy: "Built by",
    galleryTitle: "The app as you’ll use it",
    galleryLead: "Real screenshots — map, cases, billing.",
    galleryShots: [
      {
        src: "/product/carte.png",
        alt: "Nota job map — live field missions",
        caption: "Your day map",
      },
      {
        src: "/product/interventions.png",
        alt: "Nota intervention list and case files",
        caption: "Your case files",
      },
      {
        src: "/product/facturation.png",
        alt: "Nota billing hub linked to jobs",
        caption: "Your billing",
      },
    ],
    faqHeading: "Questions people ask us",
    loading: "Loading…",
    goFurther: "Go further:",
    linkFieldSoftware: "Field service software",
    linkJobMgmt: "Job management",
    linkSectors: "Who it’s for",
    linkExcelGuide: "Excel → software guide",
    linkCrmNoSignup: "CRM without sign-up",
    linkFieldJobs: "Field jobs",
    linkChecklist: "Field checklist",
    homeBreadcrumb: "Home",
    notFoundEyebrow: "404",
    notFoundTitle: "Page not found",
    notFoundLead: "This URL does not exist. Go back home or open Nota.",
    notFoundSeoTitle: "Page not found — Nota",
    notFoundSeoDesc: "This page does not exist. Go back to Nota home or open the app.",
    openNotaBottom: "Open Nota",
    orgDescription: "Nota — field service: map, mobile technicians, billing.",
    softwareDescription:
      "Nota: job map, technician hub, case files and billing for companies with on-site work.",
    offerDescription: "Direct access to Nota, no sign-up on this site",
    contact: "Contact",
    contactEyebrow: "We’re listening",
    contactTitle: "Tell us what’s hard in the field",
    contactLead:
      "A question, a doubt, a specific need? Write — we’ll reply quickly, without jargon.",
    contactName: "Your name",
    contactEmail: "Your email",
    contactMessage: "Your message",
    contactSend: "Send",
    contactSending: "Sending…",
    contactSuccess: "Message received. Thanks — we’ll reply as soon as we can.",
    contactError: "Could not send. Try again or email us directly.",
    contactErrorConfig: "Form temporarily unavailable. Use the email below.",
    contactOrMail: "Or email directly:",
    contactDirect: "Direct email",
    footerPrivacy: "Contact via the form or the email shown. No newsletter.",
    featuresHeading: "Three places you save time",
    featuresLead:
      "One simple idea: less chasing information, more jobs finished. Three real views of the app.",
    audienceHeading: "If this sounds like you",
    audienceBody:
      "Maintenance, install, repair, recurring services, on-site IT, property management — any team that sends technicians to customers and is tired of spreadsheets + messaging.",
    featureCards: [
      {
        title: "You see where every job stands",
        body: "Shared map and statuses: who’s assigned, where, what’s left — without chasing WhatsApp.",
        img: "/product/carte.png",
        alt: "Nota job map",
      },
      {
        title: "Your technician has everything on the phone",
        body: "Job, before/after photos, signature, offline if the network drops — then sync when back.",
        img: "/product/interventions.png",
        alt: "Nota technician hub",
      },
      {
        title: "You invoice without retyping",
        body: "Quotes and invoices follow the closed job. Fewer forgotten bills, one thread from site to payment.",
        img: "/product/facturation.png",
        alt: "Nota billing",
      },
    ],
  },
};
