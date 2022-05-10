import React from "react";
import { Link } from "react-router-dom";

const SideBarOnline = ({ Avatar, img, text, id }) => {
  return (
    <Link to={`/profile/${id}`} className="d-flex gap-2 ai-center item">
      <Avatar src={img} />

      <h4>{text}</h4>

      <span className="online"></span>
    </Link>
  );
};

export default SideBarOnline;
