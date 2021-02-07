import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Dashboard from "..";

afterEach(() => cleanup);

// Renders

test("Should render all dashboard sections Headings", () => {
  const { getByRole } = render(<Dashboard />);

  getByRole("heading", { name: "Projects" });
  getByRole("heading", { name: "Tasks Status" });
  getByRole("heading", { name: "Alerts" });
  getByRole("heading", { name: "Project Queue" });
});
