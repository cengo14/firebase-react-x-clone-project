import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

import { auth } from "../firebase";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { BiBlock } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import DeleteModal from "./modal/DeleteModal";
import EditModal from "./modal/EditModal";

const DropDown = ({ post, value, modalClose }) => {
  const isOwn = auth.currentUser?.uid === post.user.uid;
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div>
      <div className="absolute right-5 top-4 bg-black px-5 py-3 whitespace-nowrap flex flex-col items-start gap-3 border border-gray-600 rounded-xl text-sm font-semibold">
        {isOwn ? (
          <>
            <button
              onClick={() => setIsDelOpen(true)}
              className="text-red-500 flex gap-2 items-center"
            >
              <RiDeleteBinLine size={20} />
              Gönderiyi Sil
            </button>
            <button
              onClick={() => setIsEditOpen(true)}
              className="flex gap-2 items-center ps-1"
            >
              <FaRegEdit size={17} />
              Gönderiyi Düzenle
            </button>
          </>
        ) : (
          <>
            <div className="flex gap-2 items-center">
              <IoIosShareAlt size={20} />
              <p>Gönderi bağlantısını paylaş</p>
            </div>
            <div className="flex gap-2 items-center ps-1">
              <MdOutlinePersonAddAlt size={20} />
              <p>
                @
                {value.userData
                  ? value.userData?.nickname
                  : value.currentUser?.email.split("@")[0]}{" "}
                adlı kişiyi takip et
              </p>
            </div>
            <div className="flex gap-2 items-center ps-1">
              <BiBlock size={20} />
              <p>
                @
                {value.userData
                  ? value.userData?.nickname
                  : value.currentUser?.email.split("@")[0]}{" "}
                adlı kişiyi engelle
              </p>
            </div>
          </>
        )}
      </div>

      <DeleteModal
        modalClose={modalClose}
        isOpen={isDelOpen}
        close={() => setIsDelOpen(false)}
        post={post}
      />
      <EditModal
        modalClose={modalClose}
        isOpen={isEditOpen}
        close={() => setIsEditOpen(false)}
        post={post}
        value={value}
      />
    </div>
  );
};

export default DropDown;
