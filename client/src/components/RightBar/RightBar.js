import React, { useState, useEffect } from "react";
import "./rightbar.css";

import RightBarUsers from "./RightBarUsers";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";

const RightBar = ({ profile, user }) => {
  const URL = process.env.REACT_APP_IMG_URL;
  const [friends, setFriends] = useState([]);
  const { userInfo } = useSelector(state => state.auth);
  const [follow, setFollow] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const getFriends = async () => {
      try {
        const url = `/api/users/friends/list`;

        const { data } = await axios.get(url, config);

        setFriends(data);
      } catch (error) {
        console.log(error);
      }
    };

    getFriends();
  }, [userInfo.token]);

  useEffect(() => {
    const getAllUsers = async () => {
      const url = `/api/users/`;
      try {
        const { data } = await axios.get(url);

        setAllUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllUsers();
  }, []);

  const handleFollow = async () => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const URL = process.env.REACT_APP_SERVER_URL;

    const followUrl = URL + `api/users/${user._id}/follow`;
    const unFollowUrl = URL + `api/users/${user._id}/unfollow`;

    try {
      if (follow === false) {
        await axios.patch(followUrl, {}, config);
      } else {
        await axios.patch(unFollowUrl, {}, config);
      }
    } catch (error) {
      console.log(error);
    }

    setFollow(!follow);
  };

  return (
    <div className="widget">
      <div className="d-flex column gap-4">
        {!profile ? (
          <>
            <div className="birthday__container d-flex ai-center gap-1">
              <img src="assets/images7.jpg" alt="" className="birthdayImg" />
              <span className="birthdayText">
                <b>Pola Foster</b> and <b>3 other friends</b> have a <br />
                birth day today
              </span>
            </div>
            <img src="assets/images9.jpg" alt="" className="rightBar__ad" />

            <div className="d-flex column gap-2">
              <h4 className="rightbar">All Registered Users</h4>

              <ul className="rightbar__friend-list">
                {allUsers.map(user => (
                  <RightBarUsers
                    key={user._id}
                    Avatar={Avatar}
                    text={user.username}
                    img={user.profPic}
                    online
                    id={user._id}
                  />
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            {user?.username !== userInfo?.username && (
              <div>
                {follow === false ? (
                  <button
                    type="button"
                    className="btn__follow"
                    onClick={handleFollow}>
                    Follow <Add />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn__follow"
                    onClick={handleFollow}>
                    UnFollow <Remove />
                  </button>
                )}
              </div>
            )}
            <div>
              <h4 className="rightbar__title">User Information</h4>

              <div className="rightbar__info">
                <div className="rightbar__info-item">
                  <span className="info__key">City:</span>
                  <span className="info__value">New York</span>
                </div>

                <div className="rightbar__info-item">
                  <span className="info__key">From:</span>
                  <span className="info__value">Madrid</span>
                </div>

                <div className="rightbar__info-item">
                  <span className="info__key">Relationship:</span>
                  <span className="info__value">Single</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="rightbar__title">User Friends</h4>

              <div className="rightbar__followings">
                {friends.map(({ _id, profPic, username }) => (
                  <Link to={`/profile/${_id}`}>
                    <div className="following" key={_id}>
                      <img
                        src={
                          profPic
                            ? URL + profPic
                            : process.env.REACT_APP_PUBLIC_FOLDER +
                              "images6.jpg"
                        }
                        alt=""
                      />

                      <span className="following__me">{username}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RightBar;
