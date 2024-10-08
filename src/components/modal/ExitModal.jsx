import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { BiSolidDoorOpen } from "react-icons/bi";

const ExitModal = () => {
  return (
    <div className="absolute bg-black rounded-xl border border-gray-700 top-[-60px] left-0 p-2">
      <button
        onClick={() => signOut(auth)}
        className="flex justify-center items-center px-5 max-md:p-2 text-lg gap-2 md:text-base p-1  "
      >
        <BiSolidDoorOpen size={30} />
        <span className="whitespace-nowrap">Hesaptan çıkış yap</span>
      </button>
    </div>
  );
};

export default ExitModal;
