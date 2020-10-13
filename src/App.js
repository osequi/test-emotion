import React from "react";
import { css } from "emotion";

const simple = css({
  backgroundColor: "red",
});

const App = () => {
  return (
    <>
      <div className={simple}>Background is red</div>
    </>
  );
};

export default App;
