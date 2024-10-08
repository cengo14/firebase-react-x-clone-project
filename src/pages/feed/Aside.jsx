import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

const Aside = () => {
  const agenda = [
    { title: "Spor Gündemindekiler", subtitle: "Galatasaray" },
    { title: "Spor Gündemindekiler", subtitle: "Mauro Icardi" },
    { title: "Türkiye tarihinde gündemde", subtitle: "Yazılım Sektörü" },
    { title: "Türkiye tarihinde gündemde", subtitle: "React" },
    { title: "Türkiye tarihinde gündemde", subtitle: "Yapay Zeka savaşları" },
  ];
  return (
    <div className="max-xl:hidden px-10 py-3">
      <div className="w-full bg-zinc-800 rounded-full flex items-center px-4 gap-3">
        <IoSearchOutline size={21} color="gray" />
        <input
          className="shadow-none bg-transparent  pb-3"
          type="text"
          placeholder="Ara"
        />
      </div>
      <div className="flex flex-col items-start gap-2 border border-gray-700 p-4 rounded-2xl mt-5">
        <h1 className="text-lg font-bold">Premium'a Abone Ol</h1>
        <p className="text-sm">
          Yeni özellikleri açmak için abone ol ve uygun olman durumunda reklam
          geliri payı kazan.
        </p>
        <button className="bg-blue-400 px-4 py-2 rounded-full font-semibold hover:bg-blue-500">
          Abone ol
        </button>
      </div>
      <div className="mt-5 border border-gray-700 p-4 rounded-2xl">
        <h1 className="text-lg font-bold mb-3">İlgini çekebilecek gündemler</h1>
        {agenda.map((item, key) => (
          <div className="flex justify-between ">
            <div className="flex flex-col">
              <p className="text-sm text-gray-500 ">{item.title}</p>
              <p className="mb-3">{item.subtitle}</p>
            </div>
            <p className="hover:bg-sky-950/50 hover:text-blue-500 rounded-full px-2  cursor-pointer text-gray-500">
              <BsThreeDots />
            </p>
          </div>
        ))}
        <p className="text-blue-400 cursor-pointer">Daha fazla göster</p>
      </div>
    </div>
  );
};

export default React.memo(Aside);
