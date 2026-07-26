import { isFrictionlessAuthEnabled } from "@/features/auth/frictionlessAuth";

describe("isFrictionlessAuthEnabled", () => {
  const prev = process.env.NEXT_PUBLIC_FRICTIONLESS_AUTH;

  afterEach(() => {
    if (prev === undefined) delete process.env.NEXT_PUBLIC_FRICTIONLESS_AUTH;
    else process.env.NEXT_PUBLIC_FRICTIONLESS_AUTH = prev;
  });

  it("est désactivé par défaut", () => {
    delete process.env.NEXT_PUBLIC_FRICTIONLESS_AUTH;
    expect(isFrictionlessAuthEnabled()).toBe(false);
  });

  it("s'active avec true", () => {
    process.env.NEXT_PUBLIC_FRICTIONLESS_AUTH = "true";
    expect(isFrictionlessAuthEnabled()).toBe(true);
  });

  it("ignore les autres valeurs", () => {
    process.env.NEXT_PUBLIC_FRICTIONLESS_AUTH = "1";
    expect(isFrictionlessAuthEnabled()).toBe(false);
  });
});
