import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

import TasksStatus from ".."

afterEach(() => cleanup);

test("scope should heading",() => {
    render(<TasksStatus />);

    screen.getByRole("heading", { name: "Tasks Status" });

});