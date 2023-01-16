type randomType = (min: number, max: number) => number;

const randomNumber: randomType = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export default randomNumber;
