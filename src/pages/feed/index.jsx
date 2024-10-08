import React, { useEffect, useState } from "react";

import Nav from "./Nav";
import Main from "./Main";
import Aside from "./Aside";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const FeedPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Firestore'dan kullanıcı verilerini çekme
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("Kullanıcı belgesi bulunamadı.");
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
  };
  return (
    <div className="feed h-screen overflow-hidden text-white">
      <Nav loading={loading} value={value} />
      <Main loading={loading} value={value} />
      <Aside />
    </div>
  );
};

export default FeedPage;
