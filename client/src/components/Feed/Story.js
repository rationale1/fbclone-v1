import React from "react";

const Story = ({ name, img }) => {
  return (
    <div className="story" style={{ background: "" }}>
      <img src={img} alt="story" className="story__avatar" />
      <h4>{name}</h4>
    </div>
  );
};

export default Story;
