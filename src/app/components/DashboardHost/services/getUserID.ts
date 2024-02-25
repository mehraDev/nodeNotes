import { auth } from "firebaseServices/firebase";
export const USER_ID = "userID";

const getUserID = () => {
  if (auth && auth.currentUser) {
    return auth.currentUser.uid;
  }
};

export { getUserID };
