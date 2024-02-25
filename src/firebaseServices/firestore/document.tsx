import { addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { EFirebaseErrorCode, FirebaseErrorType } from 'firebaseServices/Error';
import { db } from 'firebaseServices/firebase';

async function createDocument(location: string, documentId?: string,data?: any): Promise<void> {
  try {
    const documentRef = documentId ? doc(db, location, documentId) : doc(db, location);
    const documentData = data || {};
    await setDoc(documentRef, documentData);
    console.log(`Document created successfully at: ${location} ${documentId}`,documentData );
  } catch (error: any) {
    console.error('Error creating document:', error);
    throw new Error('Failed to create document');
  }
}
async function createAutoIdDocument(location: string, data?: any): Promise<void> {
  try {
    const collectionRef = collection(db, location);
    const documentData = data || {};
    const newDocumentRef = await addDoc(collectionRef, documentData);
    console.log(`Document created successfully at: ${location} ${newDocumentRef.id}`, documentData);
  } catch (error: any) {
    if (error.code === EFirebaseErrorCode.PermissionDenied) {
      console.error('Permission denied while creating document: ',location, error.message);
    }else{
      console.error('Error creating document:', error.code);
      throw new Error('Failed to create document');
    }
  }
}

export interface DocumentFields {
  [fieldName: string]: any;
}

async function fetchDocument(location: string, documentId: string, fields?: string[]) : Promise<DocumentFields | undefined>{
  try {
    const docRef = doc(db, location, documentId);
    const documentSnapshot = await getDoc(docRef);

    if (documentSnapshot.exists()) {
      const documentData = documentSnapshot.data();

      if (fields && fields.length > 0) {
        const filteredData: DocumentFields = {};
        for (const field of fields) {
          if (documentData.hasOwnProperty(field)) {
            filteredData[field] = documentData[field];
          }
        }
        console.log("Filtered Document Data:", filteredData);
        return filteredData;
      } else {
        return documentData as DocumentFields;
      }
    } else {
      console.log("Document does not exist:", documentId);
    }
  } catch(error) {
    console.error("Error fetching document:", error);
    throw new Error("Failed to fetch document");
  }
}

/**
 * Add an item to an array field in a Firestore document.
 * @param location The location of the document in Firestore (e.g., "sellers/{sellerId}/private")
 * @param fieldName The name of the array field in the document to which the item will be added (e.g., "products")
 * @param item The item to be added to the array field.
 */
async function addArrayField(location: string, fieldName: string, item: any): Promise<void> {
  try {
    const documentRef = doc(db, location);
    await updateDoc(documentRef, {
      [fieldName]: arrayUnion(item),
    });
    console.log(`Item added successfully to ${fieldName} in Firestore document at: ${location}`);
  }  catch (error: any) {
    const firebaseError = error as FirebaseErrorType;
    if (firebaseError.code === (EFirebaseErrorCode.NoDocumentToUpdate)  ) {
      throw new Error(`Document not found at location "${location}".`);
    } 
     else {
      throw new Error(`Failed to add item to array field "${fieldName}" in Firestore document at "${location}". Error: ${firebaseError.message}`);
    }
  }
}
async function updateDocument(location: string, documentId: string, updatedFields: Record<string, any>): Promise<void> {
  try {
    const documentRef = doc(db, location, documentId);
    await updateDoc(documentRef, updatedFields);
    console.log(`Document updated successfully at: ${location} ${documentId}`);
  } catch (error: any) {
    console.error('Error updating document:', error);
    throw new Error('Failed to update document');
  }
}

export {fetchDocument,createDocument,addArrayField,createAutoIdDocument,updateDocument}