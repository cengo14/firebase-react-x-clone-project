import moment from "moment/moment";
import React from "react";
import { LuDot } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import "moment/locale/tr";

const UserInfo = ({ post }) => {
  // tarih verisine eriş
  let date = post.createdAt?.toDate();
  // tarih verisini şu ana göre formatla
  moment.locale("tr");
  date = moment(date).fromNow();

  return (
    <div className="flex whitespace-nowrap items-center">
      <p className="font-bold mr-1 max-md:text-sm">{post.user.name}</p>
      <p className="text-gray-500 max-md:text-sm">{"@" + post.user.nickname}</p>
      <LuDot color="gray" />
      <p className="text-gray-500 mr-1 text-sm max-md:text-[12px]">{date}</p>
      {post.isEdited && (
        <p className="flex items-center text-sm text-gray-500">
          <MdEdit size={18} />
        </p>
      )}
    </div>
  );
};

export default UserInfo;
