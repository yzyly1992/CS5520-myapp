import { collection, addDoc, doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
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

export async function addUserInfo(location) {
    try {
        await setDoc(doc(db, "users", auth.currentUser.uid), location);
    } catch (err) {
        console.log(err);
    }
}

export async function getUserInfo() {
    try {
        return await getDoc(doc(db, "users", auth.currentUser.uid));
    } catch (err) {
        console.log(err);
    }
}