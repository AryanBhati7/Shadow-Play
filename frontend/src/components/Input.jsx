import React from "react";

const Input = React.forwardRef(
  (
    {
      label,
      labelClasses = "",
      type = "text",
      id,
      className = "",
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <>
        {label && (
          <label
            className={`mb-1 inline-block text-gray-300${labelClasses}`}
            htmlFor={id}
          >
            {label}
            {required && <span style={{ color: "red" }}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={` rounded-lg border bg-transparent px-3 py-2 ${className}`}
          required={required}
          {...props}
          id={id}
        />
      </>
    );
  }
);

export default Input;
