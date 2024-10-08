import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { auth } from "../../firebase";

import DropDown from "../DropDown";
const RightMenu = ({ post, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)} className="">
        <button className="hover:bg-sky-950/50 hover:text-blue-500 rounded-full px-2 py-2 cursor-pointer text-gray-500">
          <BsThreeDots />
        </button>
      </div>
      {isOpen && (
        <DropDown
          post={post}
          value={value}
          modalClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default RightMenu;
