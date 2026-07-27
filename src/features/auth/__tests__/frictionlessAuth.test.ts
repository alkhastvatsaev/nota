import {
  isFrictionlessAuthEnabled,
  isOpenAccessCompanyConfigured,
  isOpenStaffJoinAllowed,
} from "../frictionlessAuth";

describe("frictionlessAuth", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
    delete process.env.NEXT_PUBLIC_FRICTIONLESS_AUTH;
    delete process.env.NEXT_PUBLIC_CLIENT_PORTAL_DEFAULT_COMPANY_ID;
    delete process.env.ALLOW_OPEN_STAFF_JOIN;
  });

  afterAll(() => {
    process.env = env;
  });

  it("désactivé sans société ni flag", () => {
    expect(isFrictionlessAuthEnabled()).toBe(false);
  });

  it("activé si société par défaut configurée", () => {
    process.env.NEXT_PUBLIC_CLIENT_PORTAL_DEFAULT_COMPANY_ID = "co-demo";
    expect(isFrictionlessAuthEnabled()).toBe(true);
    expect(isOpenAccessCompanyConfigured()).toBe(true);
  });

  it("respecte FRICTIONLESS_AUTH=false", () => {
    process.env.NEXT_PUBLIC_CLIENT_PORTAL_DEFAULT_COMPANY_ID = "co-demo";
    process.env.NEXT_PUBLIC_FRICTIONLESS_AUTH = "false";
    expect(isFrictionlessAuthEnabled()).toBe(false);
  });

  it("isOpenStaffJoinAllowed suit frictionless ou ALLOW_OPEN_STAFF_JOIN", () => {
    expect(isOpenStaffJoinAllowed()).toBe(false);
    process.env.ALLOW_OPEN_STAFF_JOIN = "true";
    expect(isOpenStaffJoinAllowed()).toBe(true);
    delete process.env.ALLOW_OPEN_STAFF_JOIN;
    process.env.NEXT_PUBLIC_CLIENT_PORTAL_DEFAULT_COMPANY_ID = "co-demo";
    expect(isOpenStaffJoinAllowed()).toBe(true);
  });
});
