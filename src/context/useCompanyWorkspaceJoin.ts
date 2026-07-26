"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { User } from "firebase/auth";
import { auth } from "@/core/config/firebase";
import { requestDefaultCompanyMembership } from "@/features/auth";
import { isFrictionlessAuthEnabled } from "@/features/auth/frictionlessAuth";
import { readClientPortalDefaultCompanyIdFromEnv } from "@/features/company/clientPortalCompanyId";

function canJoinDefaultCompany(user: User | null | undefined): user is User {
  if (!user) return false;
  if (!user.isAnonymous) return true;
  return isFrictionlessAuthEnabled();
}

export function useCompanyWorkspaceJoin({
  authLoading,
  membershipsReady,
  hasRealMemberships,
  realMembershipCompanyIds,
  firebaseUid,
}: {
  authLoading: boolean;
  membershipsReady: boolean;
  /** Memberships Firestore réelles — jamais le fallback env UI. */
  hasRealMemberships: boolean;
  realMembershipCompanyIds: string[];
  firebaseUid: string | null;
}) {
  const envDefaultCompanyId = useMemo(() => readClientPortalDefaultCompanyIdFromEnv(), []);
  // Important : le fallback env (liste UI) ne doit PAS empêcher le join-default.
  const missingAnyMembership = membershipsReady && !hasRealMemberships;
  const missingEnvMembership = Boolean(
    envDefaultCompanyId &&
    membershipsReady &&
    hasRealMemberships &&
    !realMembershipCompanyIds.includes(envDefaultCompanyId)
  );
  const shouldJoinDefault = missingAnyMembership || missingEnvMembership;
  const [membershipJoinPending, setMembershipJoinPending] = useState(false);
  const [membershipJoinError, setMembershipJoinError] = useState<string | null>(null);

  const retryDefaultCompanyJoin = useCallback(async () => {
    const user = auth?.currentUser;
    if (!canJoinDefaultCompany(user)) return;
    setMembershipJoinPending(true);
    setMembershipJoinError(null);
    try {
      const result = await requestDefaultCompanyMembership(user, { staffKind: "admin" });
      if (!result.ok) {
        setMembershipJoinError(result.error);
      }
    } catch {
      setMembershipJoinError("Impossible de rattacher le compte à la société.");
    } finally {
      setMembershipJoinPending(false);
    }
  }, []);

  useEffect(() => {
    if (!auth || authLoading || !membershipsReady || !shouldJoinDefault) return;
    const user = auth.currentUser;
    if (!canJoinDefaultCompany(user)) return;

    let cancelled = false;
    setMembershipJoinPending(true);
    setMembershipJoinError(null);

    const joinTimeout = setTimeout(() => {
      if (!cancelled) {
        setMembershipJoinPending(false);
        setMembershipJoinError("Le rattachement société a expiré. Réessayez.");
      }
    }, 12_000);

    void (async () => {
      try {
        const result = await requestDefaultCompanyMembership(user, { staffKind: "admin" });
        if (cancelled) return;
        if (!result.ok) {
          setMembershipJoinError(result.error);
        }
      } catch {
        if (!cancelled) {
          setMembershipJoinError("Impossible de rattacher le compte à la société.");
        }
      } finally {
        clearTimeout(joinTimeout);
        if (!cancelled) {
          setMembershipJoinPending(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(joinTimeout);
      setMembershipJoinPending(false);
    };
  }, [authLoading, membershipsReady, shouldJoinDefault, firebaseUid]);

  useEffect(() => {
    if (hasRealMemberships && membershipJoinPending) {
      setMembershipJoinPending(false);
    }
  }, [hasRealMemberships, membershipJoinPending]);

  return { membershipJoinPending, membershipJoinError, retryDefaultCompanyJoin };
}
