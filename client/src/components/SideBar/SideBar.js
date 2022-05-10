import React from "react";
import "./sidebar.css";

import {
  RssFeed,
  Chat,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
  Group,
  PlayCircleFilledOutlined,
} from "@material-ui/icons";
import { Avatar } from "@material-ui/core";

import { Users } from "../../dummyData";
import SideBarOptions from "./SideBarOptions";
import SideBarOnline from "./SideBarOnline";

const SideBar = () => {
  const items = [
    { id: 1, text: "Feed", Icon: RssFeed },
    { id: 2, text: "Chats", Icon: Chat },
    { id: 3, text: "Videos", Icon: PlayCircleFilledOutlined },
    { id: 4, text: "Groups", Icon: Group },
    { id: 5, text: "Bookmarks", Icon: Bookmark },
    { id: 6, text: "Questions", Icon: HelpOutline },
    { id: 7, text: "Jobs", Icon: WorkOutline },
    { id: 8, text: "Events", Icon: Event },
    { id: 9, text: "Courses", Icon: School },
  ];

  return (
    <div className="sidebar">
      {items.map(({ id, text, Icon }) => (
        <SideBarOptions key={id} text={text} Icon={Icon} />
      ))}

      <button className="sidebar__btn">Show More</button>

      <hr className="sidebar__hr" />

      {Users.map(({ _id, profilePic, username }) => (
        <SideBarOnline
          key={_id}
          text={username}
          Avatar={Avatar}
          img={profilePic}
          online
        />
      ))}
    </div>
  );
};

export default SideBar;
