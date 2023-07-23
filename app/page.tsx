"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "./utils/firebase";
import Loading from "./components/Loading";

const auth = getAuth(app);

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="h-screen flex justify-center flex-col gap-4 items-center">
      {loading && <Loading />}

      {isLoggedIn && (
        <div
          onClick={() => signOut(auth)}
          className="absolute flex items-center group flex-row-reverse gap-2 top-4 right-4 transition-all duration-200 hover:text-white text-red-500 cursor-pointer hover:bg-red-500 p-2 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>

          <span className="group-hover:w-fit w-0 opacity-0 group-hover:opacity-100">
            Logout
          </span>
        </div>
      )}

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
      <h1 className="text-4xl font-bold uppercase">Shift Tracker</h1>
      <p className="text-xl">an app to track employees shifts</p>
      <div className="mt-8 flex flex-col gap-2">
        {isLoggedIn ? (
          <Link href="/scan" className="button !bg-secondary">
            scan
          </Link>
        ) : (
          <>
            <Link href="/login" className="button !bg-primary">
              login
            </Link>
            <Link href="/register" className="button !bg-tertiary">
              create an account
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
