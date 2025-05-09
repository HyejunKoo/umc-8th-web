import React from "react";

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center mt-20">
    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default Spinner;
