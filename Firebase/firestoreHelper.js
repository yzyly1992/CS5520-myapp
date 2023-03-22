import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "./firebase-setup";

export async function writeToDB(dataToWrite) {
    try {
        const docRef = await addDoc(collection(db, "goals"), {...dataToWrite, user:auth.currentUser.uid});
        // console.log("Document written with ID: ", docRef.id);
    } catch (err) {
        console.log(err);
    }
}

export async function deleteItem(id) {
    await deleteDoc(doc(db, "goals", id));
}