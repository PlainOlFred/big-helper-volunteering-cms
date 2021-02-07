import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

import Alerts from ".."

afterEach(() => cleanup);

test("scope should heading",() => {
    render(<Alerts />);

    screen.getByRole("heading", { name: "Alerts" });

});