import { getCars, getWinners } from "./api";

const { carsItems: cars, carsCount: carsCount } = await getCars(1);
console.log(cars);
const { winnersItems: winners, winnersCount: winnersCount } = await getWinners(
  1
);

export default {
  cars,
  carsCurrentPage: 1,
  carsCount,
  view: "garage",
  winners,
  winnersCurrentPage: 1,
  winnersCount,
};
