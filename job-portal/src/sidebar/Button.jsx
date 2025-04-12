import React from "react";

const Button = ({ onClickHandler, value, title, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClickHandler}
      value={value}
      className="px-4 py-1 text-base rounded-sm border border-transparent transition-colors 
                 hover:bg-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {title}
    </button>
  );
};

export default Button;
