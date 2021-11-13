import { CountdownTimer } from "../../timer/CountdownTimer";

jest.useFakeTimers();

describe("CountdownTimer", () => {
  const initialiseTimer = ({
    onFinish = () => {},
    onTick = () => {},
    interval = 500,
  }: {
    onFinish?: () => void;
    onTick?: () => void;
    interval?: number;
  }) => {
    return new CountdownTimer(interval, onFinish, onTick);
  };

  it("calls onTick after interval", () => {
    const onTick = jest.fn();

    const timer = initialiseTimer({ onTick });
    timer.start(1000);

    expect(onTick).not.toHaveBeenCalled();

    jest.advanceTimersByTime(501);

    expect(onTick).toHaveBeenCalledTimes(1);
  });

  it("onTick not called after timer stopped", () => {
    const onTick = jest.fn();

    const timer = initialiseTimer({ onTick });
    timer.start(1000);

    jest.advanceTimersByTime(250);

    timer.stop();

    jest.advanceTimersByTime(500);

    expect(onTick).not.toHaveBeenCalled();
  });

  it("calls onFinish after timer finished", () => {
    const onFinish = jest.fn();

    const timer = initialiseTimer({ interval: 10, onFinish });
    timer.start(1000);

    jest.advanceTimersByTime(975);

    expect(onFinish).not.toHaveBeenCalled();

    jest.advanceTimersByTime(25);

    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it("onFinish not called after timer stopped", () => {
    const onFinish = jest.fn();

    const timer = initialiseTimer({ interval: 10, onFinish });
    timer.start(1000);

    jest.advanceTimersByTime(500);

    timer.stop();

    jest.advanceTimersByTime(1000);

    expect(onFinish).not.toHaveBeenCalled();
  });

  it("timeRemaining returns remaining milliseconds", () => {
    const timer = initialiseTimer({ interval: 10 });
    timer.start(30_000);

    jest.advanceTimersByTime(22_000);

    expect(timer.timeRemaining).toBe(8_000);
  });
});
