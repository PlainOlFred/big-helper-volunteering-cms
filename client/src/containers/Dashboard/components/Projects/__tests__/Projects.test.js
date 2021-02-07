import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Projects from ".."

afterEach(() => cleanup);

test("scope dropdrown should render",() => {
    const {getByLabelText} = render(<Projects />);
    getByLabelText("Scope")
});

test("select onchange update select",() => {
    const {getByLabelText, getByText}= render(<Projects />);

    userEvent.click(getByText("Self"));

    // Popup appears
    getByText("Team")
    // getByText("Self")
    getByText("Overall")

});

