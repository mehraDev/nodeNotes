import { ref, list, getDownloadURL } from "firebase/storage";
import { storage } from "firebaseServices/firebase";

interface IFileData {
  name: string;
  url: string;
}

export const searchFolder = async (folderPath: string, fileName: string, maxResults: number = 0): Promise<IFileData[]> => {
  try {
    const folderRef = ref(storage, folderPath);
    const folderData = await list(folderRef, { maxResults });

    const filesMetaData = folderData.items;
    const matchingFiles = filesMetaData.filter((file) => file.name.includes(fileName));

    const fileDataPromises = matchingFiles.map(async (file) => {
      const downloadURL = await getDownloadURL(file);
      return { name: file.name, url: downloadURL };
    });

    const fileData = await Promise.all(fileDataPromises);

    return fileData;
  } catch (error) {
    throw error;
  }
};
