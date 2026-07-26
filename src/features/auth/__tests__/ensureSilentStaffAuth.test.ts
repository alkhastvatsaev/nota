import { signInAnonymously } from "firebase/auth";
import { ensureSilentStaffAuth } from "@/features/auth/ensureSilentStaffAuth";

jest.mock("firebase/auth", () => ({
  signInAnonymously: jest.fn(),
}));

const mockSignInAnonymously = signInAnonymously as jest.MockedFunction<typeof signInAnonymously>;

describe("ensureSilentStaffAuth", () => {
  beforeEach(() => {
    mockSignInAnonymously.mockReset();
  });

  it("renvoie l'utilisateur courant s'il existe", async () => {
    const user = { uid: "u1", isAnonymous: true };
    const auth = { currentUser: user } as never;
    await expect(ensureSilentStaffAuth(auth)).resolves.toBe(user);
    expect(mockSignInAnonymously).not.toHaveBeenCalled();
  });

  it("crée un compte anonyme si aucun utilisateur", async () => {
    const user = { uid: "anon-1", isAnonymous: true };
    mockSignInAnonymously.mockResolvedValue({ user } as never);
    const auth = { currentUser: null } as never;
    await expect(ensureSilentStaffAuth(auth)).resolves.toBe(user);
    expect(mockSignInAnonymously).toHaveBeenCalledWith(auth);
  });

  it("renvoie null si signInAnonymously échoue", async () => {
    mockSignInAnonymously.mockRejectedValue(new Error("offline"));
    const auth = { currentUser: null } as never;
    await expect(ensureSilentStaffAuth(auth)).resolves.toBeNull();
  });
});
