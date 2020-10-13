import React from "react";
import { css } from "emotion";

const simple = {
  backgroundColor: "red",
};

const props1 = (props) => {
  return {
    backgroundColor: props.backgroundColor,
  };
};

const App = () => {
  const props = {
    backgroundColor: "yellow",
    selector: "& :nth-child(2)",
  };

  return (
    <>
      <div className={css(simple)}>Background is red</div>
      <div className={css(props1(props))}>
        Backgroud is yellow. Set by props.
      </div>
    </>
  );
};

export default App;
