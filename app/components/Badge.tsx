"use client";
import QRCode from "qrcode";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { db } from "../utils/firebase";
import Link from "next/link";

const Badge = ({ userID }: { userID: string }) => {
  const canvas = useRef(null);
  const badge = useRef(null);
  const link = useRef(null);
  const [user, setUser] = useState<any>({});
  const [badgeLink, setBadgeLink] = useState<string>("");

  const getUser = async () => {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    QRCode.toCanvas(canvas.current, userID, (error: any) => {
      if (error) console.error(error);
      console.log("success!");
    });

    getUser();
  }, []);

  useEffect(() => {
    if (user && badge.current) {
      html2canvas(badge.current).then((canvas) => {
        setBadgeLink(canvas.toDataURL());
      });
    }
  }, [user]);

  return (
    <>
      <div
        ref={badge}
        className="flex gap-8 border border-slate-500 rounded-lg p-4 bg-slate-900"
      >
        <div>
          <h1 className="text-3xl font-bold uppercase">Shift Tracker</h1>
          <p className="text-xl mt-8">
            <b>Full Name:</b> {user.fullname}
          </p>
          <p className="text-xl">
            <b>Email:</b> {user.email}
          </p>
        </div>
        <canvas ref={canvas}></canvas>
      </div>
      {badgeLink && (
        <a
          href={badgeLink}
          ref={link}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
          download="badge.png"
        >
          Download Your Badge
        </a>
      )}

      <Link href="/" className="button !bg-secondary">
        Home Page
      </Link>
    </>
  );
};

export default Badge;
