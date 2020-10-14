import React from "react";
import { render } from "@testing-library/react";
import CssAnimations from "./CssAnimations";

it("has a CssAnimations component", () => {
  const { getByText } = render(<CssAnimations />);
  expect(getByText("CssAnimations")).toBeInTheDocument();
});
