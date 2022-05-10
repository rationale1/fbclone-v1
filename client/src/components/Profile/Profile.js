import React, { useState, useEffect } from "react";
import "./profile.css";

import RightBar from "../RightBar/RightBar";
import SideBar from "../SideBar/SideBar";
import Feeds from "../Feed/Feeds";
import { useParams } from "react-router";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = `/api/users/${id}`;

        const { data } = await axios.get(url);

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [id]);

  const URL = process.env.REACT_APP_IMG_URL;

  return (
    <div className="profile d-flex">
      <SideBar />

      <div className="profileRight">
        <div className="profileRight__top">
          <div className="profileCover">
            <img
              src="/assets/vintage2.jpg"
              alt="profile"
              className="profileCover__img"
            />

            <img
              src={URL + user.profPic || "/assets/vintage4.jpg"}
              alt="profile"
              className="profileCover__pic"
            />
          </div>

          <div className="profileInfo d-flex jc-center ai-center">
            <h4 className="profileInfo__name">{user && user?.username}</h4>
          </div>
        </div>

        <div className="profileRight__bottom d-flex">
          <Feeds id={id} />

          <RightBar profile user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
