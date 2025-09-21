import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <i className="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
    </div>
  );
};

export default Loading;
