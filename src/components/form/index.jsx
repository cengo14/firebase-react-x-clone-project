import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { IoImage } from "react-icons/io5";
import { db } from "../../firebase";
import uploadToStorage from "../../firebase/uploadToStorage";
import Loader from "../Loader";
import EmojiPicker from "emoji-picker-react";
import avatarPic from "../../assets/avatar.png";
import { BsEmojiSmile } from "react-icons/bs";

const FormComp = ({ value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setText("");
    const image = e.target[1].files[0];
    if (!text && !image) return;
    setIsLoading(true);
    const ImageURL = await uploadToStorage(image, value);
    console.log(ImageURL);

    const postCol = collection(db, "post");
    await addDoc(postCol, {
      textContent: text,
      imageContent: ImageURL,
      isEdited: false,
      likes: [],
      user: {
        uid: value.currentUser ? value.currentUser.uid : value.userData.uid,
        name: value.userData
          ? value.userData?.name
          : value.currentUser?.displayName,
        photo: value.userData
          ? value.userData?.avatarURL
          : value.currentUser?.photoURL,
        nickname: value.userData
          ? value.userData?.nickname
          : value.currentUser?.email.split("@")[0],
      },
      createdAt: serverTimestamp(),
    });
    setIsLoading(false);
    e.target.reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="border-b border-zinc-600 p-5 flex items-start gap-3"
    >
      {value.userData?.avatarURL === null &&
      value.currentUser?.photoURL === null ? (
        <img
          className="rounded-full size-12 max-md:size-8"
          src={avatarPic}
          alt="user"
        />
      ) : (
        <img
          className="rounded-full size-12 max-md:size-8"
          src={
            value.userData
              ? value.userData.avatarURL
              : value.currentUser?.photoURL
          }
          alt="user"
        />
      )}
      <div className="w-full">
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          maxLength="280"
          className=" w-11/12 h-auto bg-transparent shadow-none py-2 mt-0 mb-2 text-gray-100 text-xl border-transparent focus:border-b border-gray-700 outline-none resize-none"
          type="text"
          placeholder="Neler Oluyor?"
        />
        <div className="flex justify-between items-center px-10">
          <div className="flex gap-3 items-center">
            <label className="cursor-pointer text-blue-500" htmlFor="image">
              <IoImage size={22} />
            </label>
            <input id="image" className="hidden" type="file" accept="image/*" />
            <div className="relative" onClick={() => setIsOpen(!isOpen)}>
              <BsEmojiSmile
                className="cursor-pointer text-blue-500"
                size={18}
              />
              <span className="absolute top-5 left-0">
                <EmojiPicker
                  onEmojiClick={(e) => setText(text + e.emoji)}
                  emojiStyle="twitter"
                  theme="dark"
                  skinTonePickerLocation="PREVIEW"
                  width="300px"
                  height="400px"
                  open={isOpen}
                />
              </span>
            </div>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="rounded-full bg-blue-500 py-2 px-5 min-w-[85px] min-h-[40px] transition-all hover:bg-blue-600 flex justify-center"
          >
            {isLoading ? <Loader /> : "Yayınla"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormComp;
