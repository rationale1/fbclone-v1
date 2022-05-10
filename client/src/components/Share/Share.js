import React, { useState, useRef } from "react";
import "./share.css";
import { Avatar } from "@material-ui/core";
import { PermMedia } from "@material-ui/icons";
import shareIcon from "./shareIcon";
import ShareOptions from "./ShareOptions";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../Redux/actions/postActions";

const Share = () => {
  const URL = process.env.REACT_APP_PUBLIC_FOLDER;
  const SERVER_URL = process.env.REACT_APP_IMG_URL;

  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const handleUpload = e => setFile(e.target.files[0]);

  const desc = useRef();

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("img", file);
    formData.append("desc", desc.current.value);

    dispatch(createPost(formData));

    desc.current.value = "";
  };

  return (
    <form
      className="message__sender"
      onSubmit={handleSubmit}
      encType="multipart/form-data">
      <div className="messageSender__top">
        <Avatar
          src={
            userInfo?.profPic
              ? SERVER_URL + userInfo?.profPic
              : `${URL}images6.jpg`
          }
        />

        <input
          type="text"
          placeholder="What's on your mind"
          className="messageSender__input"
          ref={desc}
        />
      </div>

      <div className="messageSender__bottom">
        <label htmlFor="file" className="messageSender__option">
          <PermMedia className="share__icon" htmlColor="tomato" />
          <span>Photo or Video</span>

          <input
            type="file"
            id="file"
            accept=".png,.jpeg,.jpg"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </label>

        {shareIcon.map(({ id, Icon, text, color }) => (
          <ShareOptions key={id} Icon={Icon} text={text} color={color} />
        ))}

        <div>
          <button type="submit" className="share__btn">
            Share
          </button>
        </div>
      </div>
    </form>
  );
};

export default Share;
