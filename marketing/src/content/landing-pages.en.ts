import { FOUNDER_FULL_NAME, FOUNDER_PROFILE_PATH } from "../config/founder";
import type { LandingPageContent } from "./landing-types";

export const LANDING_PAGES_EN: LandingPageContent[] = [
  {
    path: "/logiciel-interventions-terrain",
    eyebrow: "On-site work",
    title: "Field service software: map, mobile, billing",
    lead: "Nota brings together a live job map, client files, team planning and billing — for any company that sends technicians to customer sites.",
    showProductGallery: true,
    sections: [
      {
        h2: "Clients, jobs and team — without Excel or WhatsApp threads",
        paragraphs: [
          "Calls, addresses, who to assign, photos, quotes, invoices: everything moves at once.",
          "Nota puts jobs, clients and your team on a map and a mobile app — you see who is in the field and where each case stands.",
        ],
      },
      {
        h2: "What Nota does for you",
        bullets: [
          "Live map of interventions",
          "Company hub: cases, geolocation, client portal",
          "Technician hub: jobs, before/after photos, signature",
          "Billing and commercial follow-up built in",
          "Offline mode (PWA): sync when the network returns",
          "Direct app access — no sign-up on this site",
        ],
      },
      {
        h2: "Who it’s for",
        paragraphs: [
          "Maintenance, install, repair, residential or B2B services, property management, on-site IT, cleaning, light construction… Any SMB with work at the customer site.",
        ],
      },
      {
        h2: "Compare with how you work today",
        bullets: [
          "You track jobs in Excel or Google Sheets",
          "Technicians send photos or updates by SMS / WhatsApp",
          "Nobody at the office shares the same overview",
          "Billing happens later, with re-typing",
        ],
        paragraphs: [
          "If two or more apply, field software like Nota will save you time — see our guide",
          "“From Excel to field service software” in the footer menu.",
        ],
      },
      {
        h2: "Start in a few minutes",
        ordered: [
          "Open Nota from this site",
          "Create a job or your active cases",
          "Assign a technician and follow on the map",
        ],
      },
    ],
    faq: [
      {
        question: "Does Nota fit my trade?",
        answer:
          "If you schedule on-site visits, assign technicians and need to bill the work done — yes, whatever your sector.",
      },
      {
        question: "Do I need a credit card to try?",
        answer: "No. Open the app directly — no form on heynota.app.",
      },
      {
        question: "Can technicians work offline?",
        answer: "The app is a PWA and syncs automatically when connectivity returns.",
      },
    ],
  },
  {
    path: "/interventions-terrain",
    eyebrow: "Field",
    title: "Run your field jobs day to day",
    lead: "Centralise planning, cases and team. A map view for the office, a clear app for people on site.",
    sections: [
      {
        h2: "Why a tool built for field jobs",
        bullets: [
          "See the next job at a glance",
          "Several technicians = shared assignment and statuses",
          "Photos and signatures attached to the right case",
        ],
      },
      {
        h2: "Office and field aligned",
        paragraphs: [
          "Managers follow the map and cases; technicians see their jobs, document on site and get the client signature.",
          "No more proof lost in a chat thread.",
        ],
      },
    ],
    faq: [
      {
        question: "Does Nota replace our work WhatsApp group?",
        answer:
          "For structured job tracking, yes: each intervention has its own case — not a message buried in chat.",
      },
    ],
  },
  {
    path: "/gestion-interventions",
    eyebrow: "Job management",
    title: "Job management: map, statuses and case files",
    lead: "Follow every job from first contact to close — history, timeline and documents.",
    sections: [
      {
        h2: "One intervention = one living case",
        bullets: [
          "Clear statuses for the whole team",
          "CRM event timeline",
          "Client and address on the map",
        ],
      },
      {
        h2: "Visibility to decide fast",
        paragraphs: [
          "Filter by date, technician or area. Open a case from the map or the list — same data, two views.",
        ],
      },
    ],
    faq: [],
  },
  {
    path: "/planning-techniciens",
    eyebrow: "Technician planning",
    title: "Technician planning and jobs on mobile",
    lead: "Assign jobs, see who is on the way, and give each technician their day list on a phone.",
    sections: [
      {
        h2: "Assignment without back-and-forth",
        paragraphs: [
          "From the company hub, you assign a job to the right person. They see it in their dedicated technician hub.",
        ],
        bullets: [
          "Load and activity per technician",
          "Today’s jobs on the go",
          "Photos and signature in the case file",
        ],
      },
    ],
    faq: [],
  },
  {
    path: "/facturation-interventions",
    eyebrow: "Billing",
    title: "Billing tied to your field jobs",
    lead: "From job to invoice: keep the link between work on site and what you bill the client.",
    sections: [
      {
        h2: "Fewer gaps between field and finance",
        bullets: [
          "Billing hub inside the CRM",
          "Data already in the intervention case",
          "Less re-typing from a spreadsheet",
        ],
      },
    ],
    faq: [],
  },
  {
    path: "/pour-qui",
    eyebrow: "Who it’s for",
    title: "Who is Nota for?",
    lead: "For companies that send teams to clients and want a simple tool — not a factory ERP.",
    sections: [
      {
        h2: "Example sectors",
        bullets: [
          "Maintenance and after-sales (multi-trade, HVAC, electrical, plumbing…)",
          "Install and repair for homes or businesses",
          "Recurring services (cleaning, checks, on-site audits)",
          "Property management and building interventions",
          "IT and telecoms (on-site visits)",
          "Multi-tech SMBs leaving Excel or WhatsApp",
        ],
      },
      {
        h2: "What Nota is not",
        paragraphs: [
          "It is not an industrial ERP or shop-floor production tool: it is a field CRM with map, technician mobile and billing for on-site missions.",
        ],
      },
    ],
    faq: [],
  },
  {
    path: FOUNDER_PROFILE_PATH,
    eyebrow: "Founder",
    title: FOUNDER_FULL_NAME,
    lead: "Creator of Nota CRM. I built software for companies that send technicians to their customers.",
    sections: [
      {
        h2: "Who I am",
        paragraphs: [
          "My name is Alkhast Vatsaev. I created Nota CRM to replace Excel / WhatsApp chaos with a clear tool: jobs on a map, team tracking, billing.",
        ],
      },
      {
        h2: "What I build",
        paragraphs: [
          "Nota CRM serves field teams — maintenance, install, repair, recurring services. The app combines a job map, a mobile technician hub and billing.",
          "The marketing site is heynota.app. The Nota CRM app is at app.heynota.app.",
        ],
      },
      {
        h2: "Try Nota CRM",
        paragraphs: [
          "Open the app directly from heynota.app. No sign-up form is required on this marketing site.",
        ],
      },
    ],
    faq: [],
  },
  {
    path: "/a-propos",
    eyebrow: "About",
    title: "About Nota",
    lead: "Nota helps field-service companies track jobs, technicians and billing in one place.",
    sections: [
      {
        h2: "Founder",
        paragraphs: [
          "Nota is created by Alkhast Vatsaev — product, engineering and user experience.",
        ],
      },
      {
        h2: "Our goal",
        paragraphs: [
          "A readable tool for the field: job map, aligned team, less friction than a generic SaaS poorly suited to on-site work.",
        ],
      },
      {
        h2: "In the field",
        paragraphs: [
          "“We wanted to stop chasing info in WhatsApp. The map and technician mobile were what we used most from week one.” — Operations lead, maintenance SMB (beta, France).",
        ],
      },
      {
        h2: "Access & hosting",
        paragraphs: [
          "This site collects no email. To use Nota, open the app. Cloud hosting (Vercel, Firebase); business data stays in your company workspace.",
        ],
      },
    ],
    faq: [],
  },
  {
    path: "/excel-vs-logiciel-interventions",
    eyebrow: "Excel vs software",
    title: "Excel or software to track field jobs?",
    lead: "A spreadsheet is fine at first. Once several technicians and jobs pile up, you miss the map, statuses and mobile.",
    sections: [
      {
        h2: "Limits of Excel in the field",
        bullets: [
          "No native map or geolocation",
          "Sharing and multiple versions",
          "No technician hub or on-site signature",
        ],
      },
      {
        h2: "What Nota adds",
        paragraphs: [
          "Jobs on a map, shared cases, field app. Start with active cases — no full migration on day one.",
        ],
      },
    ],
    faq: [],
  },
  {
    path: "/installer-nota",
    eyebrow: "Mobile & PWA",
    title: "Install Nota on your phone (PWA)",
    lead: "Nota is a progressive web app: add it to your home screen for quick access, like a native app.",
    sections: [
      {
        h2: "On iPhone (Safari)",
        ordered: [
          "Open app.heynota.app in Safari",
          "Share → “Add to Home Screen”",
          "Confirm: the Nota icon appears on your screen",
        ],
      },
      {
        h2: "On Android (Chrome)",
        ordered: [
          "Open app.heynota.app in Chrome",
          "Menu ⋮ → “Install app” or “Add to Home screen”",
        ],
      },
      {
        h2: "Offline",
        paragraphs: [
          "Technician data syncs when the network returns — useful in basements, car parks or low-coverage areas.",
        ],
      },
    ],
    faq: [],
  },
];
