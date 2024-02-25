import { runTransaction } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { EFirebaseErrorCode, FirebaseErrorType } from "firebaseServices/Error";
import { db, storage } from "firebaseServices/firebase";
import { createAutoIdDocument } from "firebaseServices/firestore";

interface ImageFile extends File {}

async function uploadImageToFirebase(image: ImageFile, imageName: string, location: string): Promise<void> {
  try {
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, `${location}/${imageName}`);
    await uploadBytes(imageRef, image);
  } catch (error) {
    const firebaseError = error as FirebaseErrorType;
    if (firebaseError.code === EFirebaseErrorCode.Unauthorized) {
      throw new Error(`Permission denied. You do not have access to upload image "${imageName}" at location "${location}".`);
    } else if (firebaseError.code === EFirebaseErrorCode.NotFound) {
      throw new Error(`Image "${imageName}" not found at location "${location}".`);
    } else {
      throw new Error(`Failed to upload image "${imageName}" at location "${location}". Error: ${firebaseError.message}`);
    }
  }
}

export interface ImageMetadata {
  timestamp: number;
}

const uploadImageWithMetadata = async (imageFile: File, storageFolderPath: string, firestoreCollectionPath: string, imageName: string, metadata: ImageMetadata): Promise<void> => {
  try {
    await runTransaction(db, async (transaction) => {
      await uploadImageToFirebase(imageFile, imageName, storageFolderPath);
      await createAutoIdDocument(firestoreCollectionPath, {
        ...metadata,
        imageName,
      });
    });
  } catch (error) {
    throw error;
  }
};

export { uploadImageWithMetadata, uploadImageToFirebase };
