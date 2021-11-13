import { act, fireEvent, render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import Timer from "../../timer/Timer.svelte";

jest.useFakeTimers();

describe("Timer component", () => {
  it("renders correctly", () => {
    const { container } = render(Timer);

    expect(container).toMatchSnapshot();
  });

  it("starts off at zero", () => {
    const { getByText } = render(Timer);

    const timerInput = getByText("00:00");

    expect(timerInput).toBeVisible();
  });

  it("hides input when running", async () => {
    const { getByRole, queryByRole } = render(Timer);

    const input = getByRole("textbox");

    userEvent.type(input, "500");

    const startButton = getByRole("button");
    await fireEvent.click(startButton);

    expect(queryByRole(input)).not.toBeInTheDocument();
  });

  it("start button starts countdown timer", async () => {
    const { getByText, getByRole } = render(Timer);

    const input = getByRole("textbox");

    userEvent.type(input, "500");

    const startButton = getByRole("button");

    await fireEvent.click(startButton);

    await act(() => {
      jest.advanceTimersByTime(9_000);
    });

    expect(getByText("04:51")).toBeVisible();
  });

  it("stop button sets input to remaining time", async () => {
    const { getByRole } = render(Timer);

    let input = getByRole("textbox");

    userEvent.type(input, "500");

    const startButton = getByRole("button");
    await fireEvent.click(startButton);

    await act(async () => {
      jest.advanceTimersByTime(12_000);
    });

    const stopButton = getByRole("button");
    await fireEvent.click(stopButton);

    input = getByRole("textbox");

    expect(input).toHaveValue("04:48");
  });

  it("returns to input state when timer finished", async () => {
    const { getByRole } = render(Timer);

    let input = getByRole("textbox");

    userEvent.type(input, "5");

    let startButton = getByRole("button");
    await fireEvent.click(startButton);

    await act(async () => {
      jest.advanceTimersByTime(6_000);
    });

    startButton = getByRole("button");
    input = getByRole("textbox");

    expect(startButton).toHaveClass("start");
    expect(input).toBeVisible();
  });
});
