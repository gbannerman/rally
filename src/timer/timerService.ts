const seperatorPositionMap: { [key: number]: number } = {
  3: 1,
  4: 2,
};

const getRequiredSeperatorPosition = (string: string) =>
  seperatorPositionMap[string.length] ?? null;

export const insertSeperator = (string: string) => {
  const seperatorPosition = getRequiredSeperatorPosition(string);
  return seperatorPosition === null
    ? string
    : string.substring(0, seperatorPosition) +
        ":" +
        string.substring(seperatorPosition);
};

export const removeSeperator = (string: string) => {
  const seperatorPosition = string.indexOf(":");
  return seperatorPosition === -1
    ? string
    : string.substring(0, seperatorPosition) +
        string.substring(seperatorPosition + 1);
};

export const convertTimerValueToMilliseconds = (value: string) => {
  const units = value.split(":");
  units.reverse();
  const [secondsString, minutesString] = units;

  const seconds =
    secondsString === undefined || secondsString === ""
      ? 0
      : parseInt(secondsString, 10);
  const minutes =
    minutesString === undefined || minutesString === ""
      ? 0
      : parseInt(minutesString, 10);

  return seconds * 1000 + minutes * 60 * 1000;
};

export const getMinutesFromMilliseconds = (milliseconds: number) => {
  return Math.floor(milliseconds / 1000 / 60);
};

export const getSecondsFromMilliseconds = (milliseconds: number) => {
  return Math.floor(
    (milliseconds - getMinutesFromMilliseconds(milliseconds) * 1000 * 60) / 1000
  );
};

export const padSingleDigits = (number: number) => {
  if (number < 10) {
    return `0${number}`;
  }

  return `${number}`;
};

export const convertMillisecondsToTimerValue = (milliseconds: number) => {
  const remainingMinutes = getMinutesFromMilliseconds(milliseconds);
  const remainingSeconds = getSecondsFromMilliseconds(milliseconds);

  return `${padSingleDigits(remainingMinutes)}:${padSingleDigits(
    remainingSeconds
  )}`;
};
