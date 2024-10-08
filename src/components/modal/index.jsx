import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ children, isOpen, close }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-zinc-700/55 grid place-items-center z-[998]">
        <div className="bg-black px-8 py-10 w-3/4 max-w-[600px] rounded-2xl border border-gray-700">
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
