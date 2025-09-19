/**
 * @file CustomInput.jsx
 * @author Yael Pérez
 * @description Componente que ayuda a manejar los inputs
 */

import React, { useState } from "react";

const CustomInput = ({ type = "text", placeholder = "", value, onChange, name }) => {
  const [isFocused, setIsFocused] = useState(false);
  const shouldFloat = isFocused || value;

  return (
    <div className="relative w-full">
      <input
        required
        name={name}
        type={type}
        value={value}
        onChange={onChange} // ahora se actualiza desde el padre
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full border-2 border-gray-300 rounded-md px-4 pt-5 pb-2
          focus:outline-none focus:border-blue-500
          peer
        `}
      />
      {["text", "email", "password", "search", "tel", "url"].includes(type) && (
        <label
          className={`
            absolute left-3 text-gray-500 transition-all
            ${shouldFloat ? "top-1 text-xs text-blue-500" : "top-3.5 text-md"}
            pointer-events-none
          `}
        >
          {placeholder}
        </label>
      )}
    </div>
  );
};

export default CustomInput;