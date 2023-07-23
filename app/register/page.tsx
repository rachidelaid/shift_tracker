"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Loading from "../components/Loading";
import { app, db } from "../utils/firebase";

import Badge from "../components/Badge";

const auth = getAuth(app);

const Page = () => {
  const [error, setError] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      fullname: { value: string };
      phone: { value: string };
      rePassword: { value: string };
    };

    const fullname = target.fullname.value;
    const phone = target.phone.value;
    const email = target.email.value;
    const password = target.password.value;
    const rePassword = target.rePassword.value;

    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }

    const {
      user: { uid },
    } = await createUserWithEmailAndPassword(auth, email, password);

    setUserID(uid);

    await setDoc(doc(db, "users", uid), {
      fullname: fullname,
      email: email,
      phone: phone,
      uid,
      logs: [],
    });

    setDone(true);
    setLoading(false);
  };

  return (
    <div className="h-screen flex justify-center flex-col gap-4 items-center">
      {loading && <Loading />}
      <svg
        width="200px"
        height="200px"
        viewBox="0 -43.5 1111 1111"
        className="icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M378.88 248.685714l129.462857 162.377143 9.508572 11.702857v15.36l1.462857 155.062857v16.091429l-10.24 12.434286-147.748572 182.125714c-2.925714 3.657143-7.314286 16.091429-6.582857 21.211429v2.925714l2.925714 43.885714-87.771428 5.851429-2.925714-43.885715v-2.925714c-1.462857-27.062857 8.777143-61.44 26.331428-82.651428l147.748572-182.125715-9.508572 27.794286-1.462857-155.062857 9.508571 27.062857-148.48-185.782857-24.868571-30.72h112.64v-0.731429zM765.805714 775.314286l-129.462857-162.377143-9.508571-11.702857v-15.36l-1.462857-155.062857v-16.091429l10.24-12.434286 147.748571-182.125714c2.925714-3.657143 7.314286-16.091429 6.582857-21.211429v-2.925714l-2.925714-43.885714 87.771428-5.851429 2.925715 43.885715v2.925714c1.462857 27.062857-8.777143 61.44-26.331429 82.651428l-147.748571 182.125715 9.508571-27.794286 1.462857 155.062857-9.508571-27.062857 148.48 185.782857 24.868571 30.72h-112.64v0.731429z"
          fill="#0C92F2"
        />
        <path
          d="M577.828571 680.228571l80.457143 102.4h-160.914285z"
          fill="#FC830A"
        />
        <path
          d="M577.828571 343.771429l80.457143-102.4h-160.914285z"
          fill="#61B6F2"
        />
        <path
          d="M249.417143 65.828571h738.742857s-5.12 87.771429-109.714286 87.771429h-716.8s7.314286-87.771429 87.771429-87.771429zM249.417143 863.085714h738.742857s-5.12 87.771429-109.714286 87.771429h-716.8s7.314286-87.771429 87.771429-87.771429z"
          fill="#0C92F2"
        />
      </svg>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold uppercase">Create a new account</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {!done ? (
        <form className="mt-8 flex flex-col gap-2" onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" id="fullname" required />
          <input type="text" placeholder="Phone Number" id="phone" required />
          <input type="email" placeholder="email" id="email" required />
          <input
            type="password"
            placeholder="password"
            id="password"
            required
          />
          <input
            type="password"
            placeholder="repeat password"
            id="rePassword"
            required
          />
          <button className="bg-secondary mt-4" type="submit">
            register
          </button>
        </form>
      ) : (
        <>{auth.currentUser?.uid && <Badge userID={userID} />}</>
      )}
    </div>
  );
};

export default Page;
