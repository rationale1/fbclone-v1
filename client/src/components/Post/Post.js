import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { MoreVert, ThumbUpAlt, ThumbDownAlt, Delete } from "@material-ui/icons";
import moment from "moment";

import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removePost } from "../../Redux/actions/postActions";
import { toast } from "react-toastify";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const [user, setUser] = useState({});

  const [like, setLike] = useState(post?.likes?.length);
  const [isliked, setIsLiked] = useState(false);

  const likeHandler = async () => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      // const url = `http://localhost:5000/api/posts/${post._id}/like`;
      const url = `/api/posts/${post._id}/like`;

      await axios.patch(url, {}, config);

      toast.success("Liked Posted");
    } catch (error) {
      console.log(error.message);
    }
    setLike(isliked ? like - 1 : like + 1);
    setIsLiked(!isliked);
  };

  const URL = process.env.REACT_APP_IMG_URL;
  const img = URL + post?.img;

  useEffect(() => {
    setIsLiked(post.likes.includes(userInfo.id));
  }, [userInfo.id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const url = `http://localhost:5000/api/users/${post?.userId}`;
        const url = `/api/users/${post?.userId}`;

        const { data } = await axios.get(url);

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [post?.userId]);

  const handleDeletePost = () => {
    dispatch(removePost(post._id));

    window.location.reload();
  };

  return (
    <div className="post">
      <div className="post__top">
        <Link to={`/profile/${user._id}`} className="d-flex ai-center gap-2">
          <Avatar src={user?.profPic ? URL + user?.profPic : img} />

          <div className="post__info">
            <h4 className="post__username">{user?.username}</h4>
            <p className="post__date">{moment(post?.createdAt).fromNow()}</p>
          </div>
        </Link>

        <div className="post__top-right">
          <MoreVert />
        </div>
      </div>

      <div className="post__message">
        <p>{post?.desc}</p>
      </div>

      <div className="post__image">
        <img src={img} alt="post" className="post__img" />
      </div>

      <div className="post__options">
        <div className="d-flex ai-center gap-1">
          <ThumbUpAlt onClick={likeHandler} style={{ color: "green" }} />
          <span>Like</span>
        </div>

        <div className="d-flex ai-center gap-1">
          <ThumbDownAlt onClick={likeHandler} style={{ color: "red" }} />
          <span>Unlike</span>
        </div>
        <div>
          {" "}
          {like}{" "}
          {like === 0
            ? "none"
            : like === 1
            ? "person liked"
            : "people liked it"}
        </div>

        <div className="post__option">
          <span>
            {post?.comment} {`comment${post?.comment > 1 ? "s" : ""}`}
          </span>
        </div>

        <div className="post__option">
          <span>Share</span>
        </div>

        <div className="post__option">
          <Delete className="delete__icon" onClick={() => handleDeletePost()} />
        </div>
      </div>
    </div>
  );
};

export default Post;
