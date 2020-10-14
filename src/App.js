import React, { useContext } from "react";
import { cx, css, injectGlobal } from "emotion";

import { ThemeContext } from ".";
import CssAnimations from "./CssAnimations";

injectGlobal`
* {
	box-sizing: border-box;
	background: snow;
}
`;

const simple = {
  label: "Simple",
  backgroundColor: "red",
};

const cssSimple = css(simple);

const simpleWithTheme = (theme) => {
  return {
    ...simple,
    ...theme.typography,
  };
};

const white = {
  label: "White",
  color: "white",
};

const cssWhite = css(white);

const composed = {
  ...simple,
  ...white,
  label: "Composed",
};

const cssComposed = css(composed);

const props1 = (props) => {
  return {
    backgroundColor: props.backgroundColor,
  };
};

// NOTE: This is ok, but far from a good DX. See below when using it.
const cssProps1 = (props) => css(props1(props));

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

const cssList = css(list);

//
//

const container = {
  width: "400px",
  height: "400px",
  border: "1px solid",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const square = {
  width: "200px",
  height: "200px",
  background: "lightgreen",
};

const animation = {
  duration: "2s",
  timingFunction: "ease-in-out",
  iterationCount: "infinite",
  direction: "alternate",
  keyframes: {
    from: { transform: "translateX(-50px)" },
    to: { transform: "translateX(50px)" },
  },
};

const App = () => {
  const props = {
    backgroundColor: "yellow",
    selector: "& :nth-child(2)",
  };

  const theme = useContext(ThemeContext);

  //// NOTE: a useStyles(props) hooks is very missed here ....
  //// Not sure if possible even in v11: https://github.com/emotion-js/emotion/issues/1321

  return (
    <>
      <h1>Gotchas</h1>
      <ol>
        <li>Always use `cx`. It includes the `label`</li>
        <li>
          Always use `css([])`. Adding more styles / classes is less verbose.
        </li>
        <li>Combined: `cx('ClassName', css([]))`</li>
        <li>Best DX would be: `cx('ClassName', klass1, klass2)`</li>
      </ol>
      <div className={css([simple])}>Background is red</div>
      <div className={cssSimple}>Background is red. Set without `css`</div>
      <div className={css([composed])}>Background is red, color is white</div>
      <div className={css([simpleWithTheme(theme)])}>
        Background is red. Font is monospace, set by the theme
      </div>
      <div className={css([props1(props)])}>
        Backgroud is yellow. Set by props.
      </div>
      <div className={cssProps1(props)}>
        Backgroud is yellow. Set by props.Set without `css`
      </div>
      <ul className={css([list(props)])}>
        <li>& :nth-child(1) should be green</li>
        <li>& :nth-child(2) should be blue.</li>
        <li>xxx</li>
      </ul>
      <ul className={cx(css([list(props), white]), "Cx")}>
        <li>& :nth-child(1) should be green, color white</li>
        <li>& :nth-child(2) should be blue, color white</li>
        <li>xxx</li>
      </ul>
      <div className={cx("Container", css(container))}>
        <CssAnimations animation={animation}>
          <div className={cx("Square", css(square))} />
        </CssAnimations>
      </div>
    </>
  );
};

export default App;
