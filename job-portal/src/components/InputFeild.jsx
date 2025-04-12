import React from "react";

const InputFeild = ({ handleChange, value, title, name, checked }) => {
  return (
    <label className="sidebar-label-container flex items-center cursor-pointer mb-2">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={handleChange}
        checked={checked}
        className="mr-2"
      />
      <span>{title}</span>
    </label>
  );
};

export default InputFeild;
