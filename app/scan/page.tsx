"use client";

import { useState } from "react";
import Scanner from "../components/Scanner";
import { getUser, addLog } from "../utils/db_functions";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { app } from "../utils/firebase";

const timestampToDate = (timestamp: number) => {
  const date = new Date(timestamp);

  //return DD/MM/YYYY HH:MM:SS
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const auth = getAuth(app);

const Scan = () => {
  const [isDone, setIsDone] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [user, setUser] = useState<any>({});
  const [time, setTime] = useState<any>(0);

  const onSuccess = (user: any) => {
    setIsSuccess(true);
    setUser(user);
    const timestamp = Date.now();
    setTime(timestamp);

    addLog(user.uid, {
      timestamp,
      loggedBy: auth.currentUser?.uid,
    });
  };

  const onError = () => {
    setIsSuccess(false);
  };

  const onScan = (str: string) => {
    setIsDone(true);

    getUser(str, onSuccess, onError);
  };

  const reset = () => {
    setIsDone(false);
    setIsSuccess(true);
    setUser({});
    setTime(0);
  };

  return (
    <div className="flex h-screen justify-center items-center flex-col gap-2">
      {!isDone && <Scanner onScan={onScan} />}

      {isDone && (
        <>
          {isSuccess ? (
            <>
              <h1 className="text-2xl font-bold text-green-600">
                Logged Successfully
              </h1>

              <p>
                <b>Full Name:</b> {user?.fullname}
              </p>
              <p>
                <b>Email:</b> {user?.email}
              </p>

              <p className="text-xl text-green-700">
                <b>Time Logged:</b> {timestampToDate(time)}
              </p>

              <button onClick={reset} className="mt-8 !bg-primary">
                Scan Again
              </button>

              <Link href="/" className="button">
                Go Home
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-red-600">
                No User With This Badge
              </h1>

              <button onClick={reset} className="mt-8 !bg-primary">
                Scan Again
              </button>

              <Link href="/" className="button">
                Go Home
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Scan;
