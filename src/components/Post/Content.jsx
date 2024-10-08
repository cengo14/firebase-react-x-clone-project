import React from "react";

const Content = ({ post }) => {
  return (
    <div className="flex flex-col gap-3">
      {post.textContent && <p>{post.textContent}</p>}
      {post.imageContent && (
        <div className="max-w-[420px] max-h-[420px] border border-zinc-600 overflow-hidden rounded-xl mt-5">
          <img
            className="m-auto object-cover"
            src={post.imageContent}
            alt="user-avatar"
          />
        </div>
      )}
    </div>
  );
};

export default Content;
