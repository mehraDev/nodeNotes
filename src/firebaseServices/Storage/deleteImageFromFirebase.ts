import { deleteObject, ref } from "firebase/storage";
import { EFirebaseErrorCode, FirebaseErrorType } from "firebaseServices/Error";
import { storage } from "firebaseServices/firebase";

const deleteImageFromFirebase = async (imageName: string, location: string): Promise<void> => {
  try {
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, `${location}/${imageName}`);
    await deleteObject(imageRef);
  } catch (error) {
    const firebaseError = error as FirebaseErrorType;
    if (firebaseError.code === EFirebaseErrorCode.Unauthorized) {
      throw new Error(`Permission denied. You do not have access to delete image "${imageName}" at location "${location}".`);
    } else if (firebaseError.code === EFirebaseErrorCode.NotFound) {
      firebaseError.message = `Image "${imageName}" not found at location "${location}".`;
      throw firebaseError;
    } else {
      throw new Error(`Failed to delete image "${imageName}" at location "${location}". Error: ${firebaseError.message}`);
    }
  }
};

export { deleteImageFromFirebase };
