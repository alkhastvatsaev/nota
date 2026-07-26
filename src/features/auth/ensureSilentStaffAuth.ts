import { signInAnonymously, type Auth, type User } from "firebase/auth";
import { logger } from "@/core/logger";

/** Session CRM silencieuse — réutilise l’utilisateur courant ou crée un compte anonyme. */
export async function ensureSilentStaffAuth(auth: Auth): Promise<User | null> {
  if (auth.currentUser) return auth.currentUser;
  try {
    const cred = await signInAnonymously(auth);
    return cred.user;
  } catch (err) {
    logger.error("[ensureSilentStaffAuth] signInAnonymously", {
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}
