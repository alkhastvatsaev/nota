"use client";

import React, { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import AppBootLoadingScreen from "@/core/ui/AppBootLoadingScreen";
import { auth, isConfigured } from "@/core/config/firebase";
import { ensureAuthPersistence } from "@/core/native/nativeAuthPersistence";
import CrmEmailLoginPanel from "@/features/auth/components/CrmEmailLoginPanel";
import CrmStaffAuthEffects from "@/features/auth/components/CrmStaffAuthEffects";
import {
  crmEmailLoginTestId,
  type CrmEmailLoginVariant,
} from "@/features/auth/crmEmailLoginVariant";
import { ensureSilentStaffAuth } from "@/features/auth/ensureSilentStaffAuth";
import { isFrictionlessAuthEnabled } from "@/features/auth/frictionlessAuth";

type GatePhase = "checking" | "login" | "ready";

/** Exposé pour tests — ne jamais passer par « login » en frictionless tant que le silent auth tourne. */
export function resolveCrmEmailGatePhase(
  user: User | null,
  opts: { silentFailed?: boolean } = {}
): GatePhase {
  if (!isConfigured || !auth) {
    return process.env.NODE_ENV === "production" ? "login" : "ready";
  }
  if (user && (!user.isAnonymous || isFrictionlessAuthEnabled())) return "ready";
  if (isFrictionlessAuthEnabled()) {
    // Évite le flash du panneau login pendant signInAnonymously.
    return opts.silentFailed ? "login" : "checking";
  }
  return "login";
}

type Props = {
  variant: CrmEmailLoginVariant;
  children: React.ReactNode;
};

/** Auth CRM e-mail / mot de passe — technicien ou admin. */
export default function CrmEmailLoginGate({ variant, children }: Props) {
  const [phase, setPhase] = useState<GatePhase>("checking");
  const silentFailedRef = useRef(false);

  useEffect(() => {
    if (!auth) {
      setPhase("ready");
      return;
    }

    let cancelled = false;

    void (async () => {
      await ensureAuthPersistence(auth);
      try {
        await auth.authStateReady();
      } catch {
        /* ignore */
      }
      if (isFrictionlessAuthEnabled() && !auth.currentUser) {
        const user = await ensureSilentStaffAuth(auth);
        if (!user) silentFailedRef.current = true;
      }
      if (!cancelled) {
        setPhase(
          resolveCrmEmailGatePhase(auth.currentUser, {
            silentFailed: silentFailedRef.current,
          })
        );
      }
    })();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (cancelled) return;
      setPhase(resolveCrmEmailGatePhase(user, { silentFailed: silentFailedRef.current }));
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  if (phase === "checking") {
    return (
      <AppBootLoadingScreen variant="fixed" testId={crmEmailLoginTestId(variant, "gate-loading")} />
    );
  }

  if (phase === "login") {
    return (
      <>
        <CrmStaffAuthEffects />
        <CrmEmailLoginPanel variant={variant} />
      </>
    );
  }

  return (
    <>
      <CrmStaffAuthEffects />
      {children}
    </>
  );
}
