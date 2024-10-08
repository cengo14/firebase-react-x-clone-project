import React, { useEffect, useState } from "react";

import { navSections } from "./../../utils/constant";
import { BiSolidDoorOpen } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { BsThreeDots } from "react-icons/bs";
import ExitModal from "../../components/modal/ExitModal";

const Nav = ({ value, loading }) => {
  console.log(value);

  const [isExit, setIsExit] = useState(false);
  return (
    <nav className="flex flex-col justify-between items-center py-4">
      <div>
        <img className="w-14 mb-4" src="./public/x-logo.png" alt="xlogo" />
        {navSections.map((i, key) => (
          <div
            className="flex items-center gap-3 text-2xl md:text-3xl p-3 cursor-pointer rounded-lg hover:bg-zinc-900 transition-all max-md:justify-center "
            key={key}
          >
            {i.icon}
            <span className="whitespace-nowrap max-md:hidden text-2xl">
              {i.title}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-5">
        {loading /* From Uiverse.io by sahilxkhadka */ ? (
          <div className="relative flex w-44 max-md:w-12 animate-pulse gap-2 px-4 max-md:px-2 max-md:gap-0">
            <div className="h-12 w-12 max-md:size-8 rounded-full bg-slate-600 max-md"></div>
            <div className="flex-1 max-md:hidden">
              <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-600 text-lg"></div>
              <div className="h-5 w-[90%] rounded-lg bg-slate-600 text-sm"></div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setIsExit(!isExit)}
            className="flex items-center gap-2 relative cursor-pointer"
          >
            {value.userData.avatarURL !== null &&
            value.currentUser.photoURL !== null ? (
              <img
                className="rounded-full w-12"
                src={
                  value.userData
                    ? value.userData.avatarURL
                    : value.currentUser.photoURL
                }
                alt="user"
              />
            ) : (
              <img
                className="rounded-full w-12"
                src="./public/avatar.png"
                alt="user"
              />
            )}

            <div className="max-md:hidden flex flex-col gap-[2px]">
              <p className=" font-semibold">
                {value.userData
                  ? value.userData?.name
                  : value.currentUser
                  ? value.currentUser.displayName
                  : value.currentUser?.email.split("@")[0]}
              </p>
              <p className="text-sm font-light text-gray-400">
                {value.userData
                  ? "@" + value.userData?.nickname
                  : "@" + value.currentUser?.email.split("@")[0]}
              </p>
            </div>
            {isExit && <ExitModal />}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
