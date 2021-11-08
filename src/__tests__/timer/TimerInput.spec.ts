import {render, fireEvent} from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import TimerInput from '../../timer/TimerInput.svelte';

describe("TimerInput component", () => {
  it("renders correctly", () => {
    const { container } = render(TimerInput);
    
    expect(container).toMatchSnapshot();
  });

  it("clicking on timer focuses input", async () => {
    const { getByLabelText, getByRole } = render(TimerInput);

    await fireEvent.click(getByLabelText("Timer"));

    const input = getByRole("textbox");
    
    expect(input).toHaveFocus();
  });

  it("submitting input removes focus", async () => {
    const value = "";

    const { getByRole } = render(TimerInput);

    const input = getByRole("textbox");

    await userEvent.type(input, '129', { delay: 500 });
    await fireEvent.submit(input);
    
    expect(input).not.toHaveFocus();
  });

  it("formats value with seperator", async () => {
    const { getByRole } = render(TimerInput);

    const input = getByRole("textbox");

    await userEvent.type(input, '530', { delay: 500 });

    expect(input).toHaveValue("5:30");
  });

  it("only accepts 4 digits", async () => {
    const { getByRole } = render(TimerInput);

    const input = getByRole("textbox");

    await userEvent.type(input, '20000', { delay: 10 });

    expect(input).toHaveValue("20:00");
  });

  it("input does not hide placeholder when no value", () => {
    const { getByRole } = render(TimerInput);

    const input = getByRole("textbox");

    expect(input).toHaveStyle("width: 10px; margin-right: 2px; padding-left: 0px; right: 0px;");
  });

  it("input hides first digit of placeholder when value length is 1", async () => {
    const { getByRole } = render(TimerInput);

    const input = getByRole("textbox");

    await userEvent.type(input, '2', { delay: 10 });

    expect(input).toHaveStyle("width: 20px; margin-left: 21px;");
  });

  it("input hides first digit of placeholder when digit entered", async () => {
    const { getByRole } = render(TimerInput);

    const input = getByRole("textbox");

    await userEvent.type(input, '2', { delay: 10 });

    expect(input).toHaveStyle("width: 20px; margin-left: 21px;");
  });

  it("input hides two digits of placeholder when two digits entered", async () => {
    const { getByRole } = render(TimerInput);

    const input = getByRole("textbox");

    await userEvent.type(input, '21', { delay: 10 });

    expect(input).toHaveStyle("width: 37px; margin-left: 5px;");
  });

  it("input hides three digits of placeholder when three digits entered", async () => {
    const { getByRole } = render(TimerInput);

    const input = getByRole("textbox");

    await userEvent.type(input, '214', { delay: 10 });

    expect(input).toHaveStyle("width: 62px; margin-left: -22px;");
  });

  it("input hides four digits of placeholder when four digits entered", async () => {
    const { getByRole } = render(TimerInput);

    const input = getByRole("textbox");

    await userEvent.type(input, '2145', { delay: 10 });

    expect(input).toHaveStyle("width: 79px; margin-left: -40px;");
  });
});
