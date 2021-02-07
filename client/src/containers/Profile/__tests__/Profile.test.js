import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Profile from "..";

afterEach(() => cleanup);

// Renders

test("Should render all dashboard sections Headings", () => {
  const { getByRole } = render(<Profile />);

  getByRole("heading", { name: "Demo Admin" });
});
