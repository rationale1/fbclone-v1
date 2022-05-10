import React from "react";

const ShareOptions = ({ Icon, text, color }) => {
  return (
    <div className="messageSender__option">
      <Icon className="share__icon" htmlColor={color} />
      <span>{text}</span>
    </div>
  );
};

export default ShareOptions;
