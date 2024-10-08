import React, { useEffect, useState } from "react";
import FormComp from "../../components/form";
import MainLoader from "../../components/MainLoader";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import Post from "../../components/Post";

const Main = ({ value, loading }) => {
  const [posts, setPosts] = useState();
  const loadArr = [1, 1, 1, 1, 1, 1];
  useEffect(() => {
    // verilerin alınacağı koleksiyonun referansını al
    const colRef = collection(db, "post");
    // sorgu ayarlarını yap
    const q = query(colRef, orderBy("createdAt", "desc"));
    // koleksiyonu izle
    const Unsubscribe = onSnapshot(q, (snapshot) => {
      // gönderilerin geçici olarak tutulacağı dizi

      let temp = [];

      // dökümanların içerisindeki veriye erişip geçici değişkene ata
      snapshot.docs.forEach((doc) => temp.push({ ...doc.data(), id: doc.id }));
      // state aktar
      setPosts(temp);
    });
    // sayfadan ayrılınca fonksiyonu durdur
    return () => Unsubscribe();
  }, []);

  return (
    <main className="w-auto border-l border-r border-zinc-700 overflow-y-auto hide-scrollbar overflow-x-hidden">
      <header className="border-b border-zinc-600 p-4 font-bold">
        Anasayfa
      </header>
      <FormComp value={value} />
      {loading || !posts
        ? loadArr.map(() => <MainLoader />)
        : posts.map((post, id) => <Post key={id} value={value} post={post} />)}
    </main>
  );
};

export default Main;
