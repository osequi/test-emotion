import React, { useContext } from "react";
import { cx, css, injectGlobal, keyframes } from "emotion";

import { ThemeContext } from ".";
import CssAnimations from "./CssAnimations";
import { useStyles } from "./hooks";

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

// Animation
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

const bounce = keyframes({
  "from, 20%, 53%, 80%, to": {
    transform: "translate3d(0,0,0)",
  },
  "40%, 43%": {
    transform: "translate3d(0, -30px, 0)",
  },
  "70%": {
    transform: "translate3d(0, -15px, 0)",
  },
  "90%": {
    transform: "translate3d(0, -4px, 0)",
  },
});

const animationForBounce = {
  animation: `${bounce} 1s ease infinite`,
};

const animationForBounce2 = {
  animationName: `${bounce}`,
  animationDuration: "1s",
  animationTimingFunction: "ease",
  animationIterationCount: "infinite",
};

// useStyles
//

const useStylesTest = (props, theme) => {
  return {
    backgroundColor: props.backgroundColor,
    ...theme.typography,
  };
};

const App = () => {
  const props = {
    backgroundColor: "yellow",
    selector: "& :nth-child(2)",
  };

  const theme = useContext(ThemeContext);

  //// NOTE: a useStyles(props) hooks is very missed here ....
  //// Not sure if possible even in v11: https://github.com/emotion-js/emotion/issues/1321

  const { props1Klass, listKlass, useStylesTestKlass, simpleKlass } = useStyles(
    [props1, list, useStylesTest, simple],
    props,
    theme
  );

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
      <div className={simpleKlass}>Background is red. Set wit `useStyles`</div>
      <div className={css([composed])}>Background is red, color is white</div>
      <div className={css([simpleWithTheme(theme)])}>
        Background is red. Font is monospace, set by the theme
      </div>
      <div className={css([props1(props)])}>
        Backgroud is yellow. Set by props.
      </div>
      <div className={cssProps1(props)}>
        Backgroud is yellow. Set by props. Set without `css`
      </div>
      <div className={props1Klass}>
        Backgroud is yellow. Set by props. Set with `useStyles`
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
      <ul className={listKlass}>
        <li>& :nth-child(1) should be green.</li>
        <li>& :nth-child(2) should be blue.</li>
        <li>xxx. Set with `useStyles`</li>
      </ul>
      <div className={cx("Bounce", css(animationForBounce))}>
        Text is bouncing
      </div>
      <div className={cx("Bounce2", css(animationForBounce2))}>
        Text is bouncing2
      </div>
      <div className={cx("Container", css(container))}>
        <CssAnimations animation={animation}>
          <div className={cx("Square", css(square))} />
        </CssAnimations>
      </div>
      <div className={useStylesTestKlass}>
        Backgroud is yellow. Set by props. Font is monospace. Set by theme. Set
        with `useStyles`
      </div>
    </>
  );
};

export default App;
