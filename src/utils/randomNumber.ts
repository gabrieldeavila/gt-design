interface IRandomNumber {
  (min: number, max: number): number;
}

const randomNumber: IRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export default randomNumber;
