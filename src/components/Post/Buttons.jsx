import React from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { RiShare2Line } from "react-icons/ri";
import { auth, db } from "../../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Buttons = ({ post }) => {
  console.log(auth.currentUser);
  const isLike = post.likes.includes(auth.currentUser?.uid);
  const toggleLike = async () => {
    const postRef = doc(db, "post", post.id);

    await updateDoc(postRef, {
      likes: isLike
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };
  return (
    <div className="flex gap-2 justify-between mt-7 items-center">
      <div className="flex justify-between w-4/5 text-gray-500">
        <button className="hover:text-blue-500 hover:bg-sky-950/50 rounded-full transition p-2 flex items-center gap-1">
          <FaRegComment size={16} /> 13
        </button>
        <button className="hover:text-green-500 hover:bg-green-950/50 rounded-full transition p-2 flex items-center gap-1">
          <AiOutlineRetweet size={20} /> 7
        </button>
        <button
          onClick={toggleLike}
          className="hover:text-red-500 hover:bg-red-950/50 rounded-full transition p-2 flex items-center gap-1"
        >
          {!isLike ? <FaRegHeart /> : <FaHeart color="red" />}{" "}
          {post.likes.length > 0 ? post.likes.length : ""}
        </button>
        <button className="hover:text-blue-500 hover:bg-sky-950/50 rounded-full transition p-2 flex items-center gap-1">
          <IoIosStats size={20} /> 1B
        </button>
      </div>
      <div className="flex text-gray-500 cursor-pointer">
        <span className="hover:text-blue-500 hover:bg-sky-950/50 rounded-full transition p-2 ">
          <CiBookmark size={20} />
        </span>
        <span className="hover:text-blue-500 hover:bg-sky-950/50 rounded-full transition p-2 ">
          <RiShare2Line size={20} />
        </span>
      </div>
    </div>
  );
};

export default Buttons;
