import {
  convertMillisecondsToTimerValue,
  convertTimerValueToMilliseconds,
  getMinutesFromMilliseconds,
  getSecondsFromMilliseconds,
  insertSeperator,
  removeSeperator,
} from "../../timer/timerService";

const minuteInMilliseconds = 60_000;

describe("insertSeperator", () => {
  it("leaves a single digit input unchanged", () => {
    const inputText = "5";

    expect(insertSeperator(inputText)).toBe(inputText);
  });

  it("leaves a two digit input unchanged", () => {
    const inputText = "50";

    expect(insertSeperator(inputText)).toBe(inputText);
  });

  it("adds a seperator in second position of three digit input", () => {
    const inputText = "500";

    expect(insertSeperator(inputText)).toBe("5:00");
  });

  it("adds a seperator in third position of four digit input", () => {
    const inputText = "5000";

    expect(insertSeperator(inputText)).toBe("50:00");
  });
});

describe("removeSeperator", () => {
  it("leaves a single digit input unchanged", () => {
    const inputText = "5";

    expect(removeSeperator(inputText)).toBe(inputText);
  });

  it("leaves a two digit input unchanged", () => {
    const inputText = "50";

    expect(removeSeperator(inputText)).toBe(inputText);
  });

  it("removes seperator from second position of three digit input", () => {
    const inputText = "5:00";

    expect(removeSeperator(inputText)).toBe("500");
  });

  it("removes seperator from third position of four digit input", () => {
    const inputText = "50:00";

    expect(removeSeperator(inputText)).toBe("5000");
  });
});

describe("convertTimerValueToMilliseconds", () => {
  it("sets empty to value to be zero duration", () => {
    const timerValue = "";

    expect(convertTimerValueToMilliseconds(timerValue)).toBe(0);
  });

  it("correctly converts single digit value", () => {
    const timerValue = "5";

    expect(convertTimerValueToMilliseconds(timerValue)).toBe(5_000);
  });

  it("correctly converts two digit value", () => {
    const timerValue = "50";

    expect(convertTimerValueToMilliseconds(timerValue)).toBe(50_000);
  });

  it("correctly converts three digit value", () => {
    const timerValue = "5:00";

    expect(convertTimerValueToMilliseconds(timerValue)).toBe(
      5 * minuteInMilliseconds
    );
  });

  it("correctly converts four digit value", () => {
    const timerValue = "50:00";

    expect(convertTimerValueToMilliseconds(timerValue)).toBe(
      50 * minuteInMilliseconds
    );
  });
});

describe("getMinutesFromMilliseconds", () => {
  it("returns minutes when duration is exact minute value", () => {
    const milliseconds = 2 * minuteInMilliseconds;

    expect(getMinutesFromMilliseconds(milliseconds)).toBe(2);
  });

  it("returns minutes when duration is fractional minute value", () => {
    const milliseconds = 3.5 * minuteInMilliseconds;

    expect(getMinutesFromMilliseconds(milliseconds)).toBe(3);
  });

  it("returns minutes when duration less than a minute", () => {
    const milliseconds = 10_000;

    expect(getMinutesFromMilliseconds(milliseconds)).toBe(0);
  });
});

describe("getSecondsFromMilliseconds", () => {
  it("returns seconds when duration is exact second value", () => {
    const milliseconds = 1000;

    expect(getSecondsFromMilliseconds(milliseconds)).toBe(1);
  });

  it("returns seconds when duration is fractional second value", () => {
    const milliseconds = 3_500;

    expect(getSecondsFromMilliseconds(milliseconds)).toBe(3);
  });

  it("returns seconds when duration is exact minute value", () => {
    const milliseconds = 2 * minuteInMilliseconds;

    expect(getSecondsFromMilliseconds(milliseconds)).toBe(0);
  });

  it("returns seconds when duration is fractional minute value", () => {
    const milliseconds = 2.5 * minuteInMilliseconds;

    expect(getSecondsFromMilliseconds(milliseconds)).toBe(30);
  });
});

describe("convertMillisecondsToTimerValue", () => {
  it("correctly converts zero duration", () => {
    const milliseconds = 0;

    expect(convertMillisecondsToTimerValue(milliseconds)).toBe("00:00");
  });

  it("correctly converts duration less than 10 seconds", () => {
    const milliseconds = 5_000;

    expect(convertMillisecondsToTimerValue(milliseconds)).toBe("00:05");
  });

  it("correctly converts duration less than 1 minute", () => {
    const milliseconds = 43_200;

    expect(convertMillisecondsToTimerValue(milliseconds)).toBe("00:43");
  });

  it("correctly converts duration less than 10 minutes", () => {
    const milliseconds = 9.5 * minuteInMilliseconds;

    expect(convertMillisecondsToTimerValue(milliseconds)).toBe("09:30");
  });

  it("correctly converts duration above 10 minutes", () => {
    const milliseconds = 12 * minuteInMilliseconds;

    expect(convertMillisecondsToTimerValue(milliseconds)).toBe("12:00");
  });
});

test.skip("CountdownTimer", () => {
  // TODO
});
