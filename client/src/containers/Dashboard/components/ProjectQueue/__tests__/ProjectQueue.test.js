import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

import ProjectQueue from ".."

afterEach(() => cleanup);

test("scope should heading",() => {
    render(<ProjectQueue />);

    screen.getByRole("heading", { name: "Project Queue" });

});