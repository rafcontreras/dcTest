const zeroPadding = num => {
  if (typeof num === "number" && num < 10) {
    return `0${num}`;
  }
  return `${num}`;
};

const createClock = () => {
  const currentDate = new Date();
  const hours = zeroPadding(currentDate.getHours());
  const minutes = zeroPadding(currentDate.getMinutes());
  const seconds = zeroPadding(currentDate.getSeconds());

  return {
    hours,
    minutes,
    seconds
  };
};

export default createClock;
