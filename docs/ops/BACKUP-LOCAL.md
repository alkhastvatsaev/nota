# Sauvegarde locale (hors Git)

## Secrets dev (`.env.local`)

- **Ne jamais committer** (déjà dans `.gitignore`).
- Copie dans un coffre (1Password, Bitwarden) ou fichier hors repo.
- Sur ce Mac : `~/.nota-env-local.backup` (mode 600), créé le 2026-07-27.

Restauration :

```bash
cp ~/.nota-env-local.backup .env.local && chmod 600 .env.local
```

## Prod / staging

- Variables : projets **Vercel** (`nota`, `heynota`).
- Données : **Firebase**.

## Après perte du Mac

```bash
git clone https://github.com/alkhastvatsaev/nota.git
cd nota && npm ci && npm --prefix marketing ci
# puis .env.local depuis coffre ou ~/.nota-env-local.backup (si iCloud/Time Machine)
```

Caches : `npm run clean:dev` — régénérés au prochain `dev` / `build`.
