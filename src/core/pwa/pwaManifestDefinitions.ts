import {
  PWA_ADMIN_MOBILE_MANIFEST_ICONS,
  PWA_ADMIN_MOBILE_SHORT_NAME,
  PWA_ADMIN_MOBILE_TITLE,
  PWA_ADMIN_SHORT_NAME,
  PWA_ADMIN_TITLE,
  PWA_DEMANDE_MANIFEST_ICONS,
  PWA_DEMANDE_SHORT_NAME,
  PWA_DEMANDE_TITLE,
  PWA_MANIFEST_ICONS,
  PWA_TECHNICIAN_MANIFEST_ICONS,
  PWA_TECHNICIAN_SHORT_NAME,
  PWA_TECHNICIAN_TITLE,
  PWA_THEME_COLOR,
} from "@/core/pwa/pwaSatelliteManifests";

export type PwaManifestDefinition = {
  filename: string;
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  scope: string;
  /** Identifiant opaque — requis pour plusieurs PWA sur la même origine (Chrome Android). */
  id: string;
  icons: readonly {
    src: string;
    sizes: string;
    type: string;
    purpose: string;
  }[];
};

/** Manifests statiques (`public/manifest*.json`) — source unique pour éviter les dérives. */
export const PWA_MANIFEST_DEFINITIONS = [
  {
    filename: "manifest.json",
    name: PWA_ADMIN_TITLE,
    short_name: PWA_ADMIN_SHORT_NAME,
    description: "Dispatcher et pilotage NOTA",
    start_url: "/",
    scope: "/",
    id: "nota-pwa-admin",
    icons: PWA_MANIFEST_ICONS,
  },
  {
    filename: "manifest-admin-mobile.json",
    name: PWA_ADMIN_MOBILE_TITLE,
    short_name: PWA_ADMIN_MOBILE_SHORT_NAME,
    description: "Inbox et missions du jour NOTA",
    start_url: "/m/admin",
    scope: "/m/admin",
    id: "nota-pwa-inbox",
    icons: PWA_ADMIN_MOBILE_MANIFEST_ICONS,
  },
  {
    filename: "manifest-demande.json",
    name: PWA_DEMANDE_TITLE,
    short_name: PWA_DEMANDE_SHORT_NAME,
    description: "Formulaire et suivi client NOTA",
    start_url: "/m/demande",
    scope: "/m/demande",
    id: "nota-pwa-demande",
    icons: PWA_DEMANDE_MANIFEST_ICONS,
  },
  {
    filename: "manifest-technician.json",
    name: PWA_TECHNICIAN_TITLE,
    short_name: PWA_TECHNICIAN_SHORT_NAME,
    description: "Missions et clôture technicien NOTA",
    start_url: "/m/technician",
    scope: "/m/technician",
    id: "nota-pwa-technician",
    icons: PWA_TECHNICIAN_MANIFEST_ICONS,
  },
] as const satisfies readonly PwaManifestDefinition[];

export function buildPwaManifestJson(definition: PwaManifestDefinition): string {
  return `${JSON.stringify(
    {
      name: definition.name,
      short_name: definition.short_name,
      description: definition.description,
      start_url: definition.start_url,
      scope: definition.scope,
      display: "standalone",
      orientation: "portrait-primary",
      lang: "fr",
      dir: "ltr",
      id: definition.id,
      background_color: PWA_THEME_COLOR,
      theme_color: PWA_THEME_COLOR,
      icons: definition.icons.map((icon) => ({ ...icon })),
    },
    null,
    2
  )}\n`;
}
