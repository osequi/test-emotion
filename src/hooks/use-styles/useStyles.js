import { css } from "emotion";
import { upperFirst, camelCase } from "lodash";

/**
 * Transforms CSS style functions into classNames for Emotion.
 * Example: const { kStyle1, kStyle2 } = useStyles([style1, style2], props, theme)
 */
const useStyles = (...args) => {
  /**
   * Falls back silently when there are not enough arguments.
   * // NOTE: When `null` used an error is triggered when the args are not all set.
   */
  const styles = args[0] ? args[0] : [];
  const props = args[1] ? args[1] : {};
  const theme = args[2] ? args[2] : {};

  return (
    styles &&
    styles.reduce((result, item) => {
      /**
       * Checks if this is a style object or function.
       */
      const isFunction = item && item.name;
      /**
       * Adds a `Klass` suffix to the style function name.
       */
      const name = isFunction ? `${item.name}Klass` : "is-object-not-function";
      /**
       * Falls back silently when a style object is passed instead of a style function.
       */
      const value = isFunction ? css(item(props, theme)) : css(item);
      return { ...result, [`${name}`]: value };
    }, {})
  );
};

export default useStyles;
