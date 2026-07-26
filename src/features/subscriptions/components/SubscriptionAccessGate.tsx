"use client";

import type { ReactNode } from "react";
import { useCompanyWorkspaceOptional } from "@/context/CompanyWorkspaceContext";
import { isFrictionlessAuthEnabled } from "@/features/auth/frictionlessAuth";
import {
  isSubscriptionActive,
  subscriptionCheckoutEnabled,
  subscriptionEnforcementEnabled,
  useCompanySubscription,
  wasSubscriptionCheckoutCompleted,
} from "@/features/subscriptions";
import SubscriptionPaywall from "@/features/subscriptions/components/SubscriptionPaywall";

type Props = {
  children: ReactNode;
};

/** Bloque l’app tant que l’abonnement n’est pas actif (si enforcement activé). */
export default function SubscriptionAccessGate({ children }: Props) {
  const workspace = useCompanyWorkspaceOptional();
  const { subscription, loading } = useCompanySubscription();

  const showPaywall =
    !isFrictionlessAuthEnabled() &&
    subscriptionEnforcementEnabled() &&
    subscriptionCheckoutEnabled() &&
    Boolean(workspace?.firebaseUid) &&
    workspace?.workspaceReady === true &&
    !loading &&
    !isSubscriptionActive(subscription) &&
    !wasSubscriptionCheckoutCompleted();

  return (
    <>
      {children}
      {showPaywall ? <SubscriptionPaywall /> : null}
    </>
  );
}
