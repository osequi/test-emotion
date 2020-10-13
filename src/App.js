import React from "react";
import { cx, css } from "emotion";

const simple = {
  backgroundColor: "red",
};

const props1 = (props) => {
  return {
    backgroundColor: props.backgroundColor,
  };
};

const list = (props) => {
  return {
    ["& :nth-child(1)"]: {
      backgroundColor: "green",
    },

    [`${props.selector}`]: {
      backgroundColor: "blue",
    },
  };
};

const white = {
  color: "white",
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
      <ul className={css(list(props))}>
        <li>& :nth-child(1) should be green</li>
        <li>& :nth-child(2) should be blue.</li>
        <li>xxx</li>
      </ul>
      <ul className={cx(css(list(props)), css(white))}>
        <li>& :nth-child(1) should be green, color white</li>
        <li>& :nth-child(2) should be blue, color white</li>
        <li>xxx</li>
      </ul>
    </>
  );
};

export default App;
