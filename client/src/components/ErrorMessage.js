import React from "react";

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <div className={`alert alert-${variant}`}>
      <span>
        <strong>{children}</strong>
      </span>
    </div>
  );
};

export default ErrorMessage;
