import React from "react";
import { Link } from "react-router-dom";

const RightBarUsers = ({ Avatar, img, text, id }) => {
  const URL = process.env.REACT_APP_IMG_URL;
  return (
    <Link to={`/profile/${id}`} className="d-flex gap-2 ai-center item">
      <Avatar src={URL + img} />

      <h4>{text}</h4>

      <span className="online"></span>
    </Link>
  );
};

export default RightBarUsers;
