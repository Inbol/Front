/**
 * @file CustomInput.jsx
 * @author Yael Pérez
 * @description Floating label input 
 */

import React, { useState, useEffect } from "react";

const CustomInput = ({ type = "text", placeholder = "", value, onChange, name, required = false }) => {
  const isControlled = typeof value !== "undefined";
  const [internalValue, setInternalValue] = useState(isControlled ? value : "");

  useEffect(() => {
    if (isControlled) setInternalValue(value);
  }, [value, isControlled]);

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div className="relative w-full">
      <input
        name={name}
        type={type}
        value={internalValue}
        onChange={handleChange}
        placeholder=" " 
        required={required}
        className={`
          peer w-full border-2 border-gray-300 rounded-md px-4 pt-5 pb-2
          focus:outline-none focus:border-blue-500
        `}
      />

      {["text", "email", "password", "search", "tel", "url"].includes(type) && (
        <label
          className={`
            absolute left-3 pointer-events-none transition-all duration-150
            top-1 text-xs
            peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-500
            peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500
          `}
        >
          {placeholder}
        </label>
      )}
    </div>
  );
};

export default CustomInput;
