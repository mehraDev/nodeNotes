import { auth } from "firebaseServices/firebase";

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};
