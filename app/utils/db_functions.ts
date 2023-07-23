import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getUser = async (
  userID: string,
  cb: (data: any) => void,
  onFailed?: () => void
) => {
  const docRef = doc(db, "users", userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    cb(docSnap.data());
  } else {
    onFailed && onFailed();
  }
};

export const addLog = async (userID: string, log: any) => {
  const docRef = doc(db, "users", userID);
  const docSnap = await getDoc(docRef);

  setDoc(
    docRef,
    {
      logs: [...docSnap.data()?.logs, log],
    },
    { merge: true }
  );
};
