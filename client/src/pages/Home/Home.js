import React from "react";
import "./home.css";

import SideBar from "../../components/SideBar/SideBar";
import Feeds from "../../components/Feed/Feeds";
import RightBar from "../../components/RightBar/RightBar";

const Home = () => {
  return (
    <div className="main__body">
      <SideBar />

      <Feeds />

      <RightBar />
    </div>
  );
};

export default Home;
