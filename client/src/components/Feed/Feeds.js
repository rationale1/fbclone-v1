import React, { useEffect } from "react";
import "./feeds.css";
import Story from "./Story";
import Share from "../Share/Share";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchSinglePost } from "../../Redux/actions/postActions";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

const Feeds = ({ id }) => {
  const dispatch = useDispatch();

  const { posts, loading, error } = useSelector(state => state.postList);
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(id ? fetchSinglePost(id) : fetchPosts());
  }, [dispatch, id]);

  const stories = [
    {
      id: Math.random() + 1,
      name: "Smart Coder",
      img: "assets/images6.jpg",
    },
    {
      id: Math.random() + 1,
      name: "Mary Jane",
      img: "assets/images6.jpg",
    },
    {
      id: Math.random() + 1,
      name: "Mern Stack",
      img: "assets/images6.jpg",
    },
    {
      id: Math.random() + 1,
      name: "John Doe",
      img: "assets/images6.jpg",
    },
  ];

  return (
    <div className="feed">
      {!id && (
        <div className="story__reel">
          {stories.map(({ id, name, img }) => (
            <Story key={id} name={name} img={img} />
          ))}
        </div>
      )}

      <div>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : null}
      </div>

      {(!id || userInfo?.id === id) && <Share />}

      {posts?.length ? (
        posts.map(post => <Post key={post._id} post={post} />)
      ) : (
        <div className="d-flex ai-center jc-center d-column gap-2">
          <Loading />
          <h1>Posts Empty</h1>
        </div>
      )}
    </div>
  );
};

export default Feeds;
