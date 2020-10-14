import useStyles from ".";

const style1 = (props) => {
  return {
    backgroundColor: "red",
  };
};

const style2 = {
  backgroundColor: "red",
};

const style3 = {
  label: "style3",
  backgroundColor: "red",
};

it("It works fine when a style object with a `label` is passed.", () => {
  expect(JSON.stringify(useStyles([style3]))).toContain("style3Klass");
});

it("Falls back silently when a style object is passed instead of a style function.", () => {
  expect(JSON.stringify(useStyles([style2]))).toContain("object-without-label");
});

it("Adds a `Klass` suffix to the style object name", () => {
  expect(JSON.stringify(useStyles([style1]))).toContain("style1Klass");
});

it("Falls back silently when there are not enough arguments", () => {
  expect(useStyles()).toStrictEqual({});
});
