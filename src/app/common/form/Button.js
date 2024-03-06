import React from "react";

const Button = ({ onClick, disabled, children, className }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
