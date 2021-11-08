import { render, fireEvent } from "@testing-library/svelte";

import StartStopButton from "../../timer/StartStopButton.svelte";

describe("StartStopButton component", () => {
  it("renders correctly", () => {
    const { container } = render(StartStopButton, {
      running: false,
      onToggle: () => {},
    });

    expect(container).toMatchSnapshot();
  });

  it("has correct class when stopped", () => {
    const { getByRole } = render(StartStopButton, {
      running: false,
      onToggle: () => {},
    });

    const button = getByRole("button");

    expect(button).toHaveClass("start");
  });

  it("has correct class when running", () => {
    const { getByRole } = render(StartStopButton, {
      running: true,
      onToggle: () => {},
    });

    const button = getByRole("button");

    expect(button).toHaveClass("stop");
  });

  it("displays play icon when stopped", () => {
    const { getByRole } = render(StartStopButton, {
      running: false,
      onToggle: () => {},
    });

    const button = getByRole("button");
    const icon = button.querySelector("svg");

    expect(icon).toHaveClass("feather-play");
  });

  it("displays pause icon when running", () => {
    const { getByRole } = render(StartStopButton, {
      running: true,
      onToggle: () => {},
    });

    const button = getByRole("button");
    const icon = button.querySelector("svg");

    expect(icon).toHaveClass("feather-pause");
  });

  it("calls onToggle when button clicked", async () => {
    const mockOnToggle = jest.fn();

    const { getByRole } = render(StartStopButton, {
      running: false,
      onToggle: mockOnToggle,
    });

    const button = getByRole("button");

    await fireEvent.click(button);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });
});
