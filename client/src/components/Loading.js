import React from "react";

import { CircularProgress } from "@material-ui/core";

const Loading = () => {
  return (
    <div className="d-flex ai-center jc-center gap-2 d-column">
      <CircularProgress color="white" />

      <span style={{ fontSize: "1.5rem" }}>Loading</span>
    </div>
  );
};

export default Loading;
