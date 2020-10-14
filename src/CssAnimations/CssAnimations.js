import React from "react";
import PropTypes from "prop-types";
import { cx, css, keyframes } from "emotion";

/**
 * Defines the prop types.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations
 */
const propTypes = {
  animation: PropTypes.shape({
    duration: PropTypes.string,
    timingFunction: PropTypes.string,
    delay: PropTypes.string,
    iterationCount: PropTypes.string,
    direction: PropTypes.string,
    fillMode: PropTypes.string,
    playState: PropTypes.string,
    keyframes: PropTypes.object,
  }),
  children: PropTypes.any,
};

/**
 * Defines the default props.
 */
const defaultProps = {
  animation: {},
  children: null,
};

/**
 * Defines the keyframes.
 */
const animationKeyframe = (props) => keyframes({ ...props.keyframes });

const animationKeyframe2 = keyframes({
  from: { transform: "translateX(-50px)" },
  to: { transform: "translateX(50px)" },
});

/**
 * Defines the animation.
 */
const animationStyle = (props) => {
  return {
    animationName: `${animationKeyframe(props)}`,
    animationDuration: props.duration,
    animationTimingFunction: props.timingFunction,
    animationDelay: props.delay,
    animationIterationCount: props.iterationCount,
    animationDirection: props.direction,
    animationFillMode: props.fillMode,
    animationPlayState: props.playState,
  };
};

/**
 * Displays the content inside an animation container.
 */
const CssAnimations = (props) => {
  const { animation, children } = props;

  return (
    <div className={cx("CssAnimations", css([animationStyle(animation)]))}>
      {children}
    </div>
  );
};

CssAnimations.propTypes = propTypes;
CssAnimations.defaultProps = defaultProps;

export default CssAnimations;
export {
  propTypes as CssAnimationsPropTypes,
  defaultProps as CssAnimationsDefaultProps,
};
