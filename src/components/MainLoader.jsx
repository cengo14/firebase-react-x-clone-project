import React from "react";

const MainLoader = () => {
  return (
    <div className="flex flex-row gap-2 m-3">
      <div className="animate-pulse bg-gray-700 w-20 h-20 rounded-lg"></div>
      <div className="flex flex-col gap-2">
        <div className="animate-pulse bg-gray-700 w-[450px] h-8 rounded-lg"></div>
        <div className="animate-pulse bg-gray-700 w-72 h-5 rounded-lg"></div>
        <div className="animate-pulse bg-gray-700 w-64 h-3 rounded-lg"></div>
      </div>
    </div>
  );
};

export default MainLoader;
