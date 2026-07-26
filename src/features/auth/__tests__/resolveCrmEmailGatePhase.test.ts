/**
 * @jest-environment node
 */
import { resolveCrmEmailGatePhase } from "@/features/auth/components/CrmEmailLoginGate";

jest.mock("@/core/config/firebase", () => ({
  auth: {},
  isConfigured: true,
}));

const frictionless = jest.fn();
jest.mock("@/features/auth/frictionlessAuth", () => ({
  isFrictionlessAuthEnabled: () => frictionless(),
}));

describe("resolveCrmEmailGatePhase", () => {
  beforeEach(() => {
    frictionless.mockReturnValue(false);
  });

  it("reste en checking en frictionless sans user (pas de flash login)", () => {
    frictionless.mockReturnValue(true);
    expect(resolveCrmEmailGatePhase(null)).toBe("checking");
  });

  it("passe en login seulement si silent auth a échoué", () => {
    frictionless.mockReturnValue(true);
    expect(resolveCrmEmailGatePhase(null, { silentFailed: true })).toBe("login");
  });

  it("ready pour anonyme en frictionless", () => {
    frictionless.mockReturnValue(true);
    expect(resolveCrmEmailGatePhase({ isAnonymous: true } as never)).toBe("ready");
  });

  it("login sans frictionless si pas d’user", () => {
    expect(resolveCrmEmailGatePhase(null)).toBe("login");
  });
});
