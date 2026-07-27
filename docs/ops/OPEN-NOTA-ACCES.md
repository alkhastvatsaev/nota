# Accès « Ouvrir Nota » (app.heynota.app)

Parcours marketing : clic **Ouvrir Nota** → CRM sans écran login (Firebase anonyme) → rattachement à la société démo.

## Variables Vercel (projet `nota`, pas `heynota`)

| Variable                                       | Rôle                                                              |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_CLIENT_PORTAL_DEFAULT_COMPANY_ID` | ID document `companies/{id}` — **obligatoire**                    |
| `NEXT_PUBLIC_FRICTIONLESS_AUTH`                | `true` explicite, ou **omis** si société démo définie (auto)      |
| `ALLOW_OPEN_STAFF_JOIN`                        | `true` force l’API join ; sinon **auto** quand frictionless actif |

Firebase Console : **Authentication → Sign-in method → Anonymous** activé.

## Chaîne technique

1. `CrmEmailLoginGate` → `ensureSilentStaffAuth` + `POST /api/company/join-default`
2. `useCompanyWorkspaceJoin` → membership Firestore + refresh claims
3. `CompanyWorkspaceBootstrapOverlay` → erreur / chargement visibles si échec
4. `rejectAnonymousInProduction` (API) et join-default autorisés si `isFrictionlessAuthEnabled()`

## Symptômes courants

| Symptôme                    | Cause probable                                                          |
| --------------------------- | ----------------------------------------------------------------------- |
| Écran login                 | Frictionless off + pas d’utilisateur                                    |
| Dashboard vide / API 403    | join-default bloqué (prod sans frictionless ni `ALLOW_OPEN_STAFF_JOIN`) |
| Carte sans données          | `isTenantUser` false — join échoué ou mauvais `companyId`               |
| Redirection `/m/technician` | Frictionless off + rôle tech sans tenant CRM                            |

## Vérification rapide

Navigation privée → `https://app.heynota.app/?utm_source=heynota` → spinner puis carousel admin. Réseau : `join-default` → 200 + `companyId`.
