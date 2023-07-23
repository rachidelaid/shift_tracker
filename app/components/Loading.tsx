import React from "react";

const Loading = () => {
  return (
    <div className="fixed z-50 inset-0 flex justify-center items-center bg-slate-900/80">
      <span className="loader"></span>
    </div>
  );
};

export default Loading;
