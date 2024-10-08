import React from "react";
import UserInfo from "./UserInfo";
import Content from "./Content";
import avatarPic from "../../assets/avatar.png";
import Buttons from "./Buttons";
import RightMenu from "./RightMenu";

const Post = ({ post, value }) => {
  console.log(post);

  return (
    <div className="border-b border-zinc-600 p-3 flex gap-3 items-start">
      {post.user.photo ? (
        <img
          className="size-12 max-md:size-10 rounded-full"
          src={post.user.photo}
          alt="user-avatar"
        />
      ) : (
        <img
          className="size-12 max-md:size-10 rounded-full"
          src={avatarPic}
          alt="user-avatar"
        />
      )}
      <div className="w-full">
        <div className="flex justify-between">
          <UserInfo post={post} />
          <RightMenu post={post} value={value} />
        </div>
        <Content post={post} />
        <Buttons post={post} />
      </div>
    </div>
  );
};

export default Post;
