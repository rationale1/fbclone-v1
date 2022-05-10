import React from "react";

const SideBarOptions = ({ Icon, text }) => {
  return (
    <div className="sidebar__row">
      <Icon className="sidebar__icon" />

      <h4>{text}</h4>
    </div>
  );
};

export default SideBarOptions;
