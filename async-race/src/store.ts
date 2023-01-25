import { getCars, getWinners } from "./api";

const { carsItems: cars, carsCount: carsCount } = await getCars(1);
const { winnersItems: winners, winnersCount: winnersCount } = await getWinners(
  1,
  10,
  "",
  "asc"
);

export default {
  cars,
  carsCurrentPage: 1,
  carsCount,
  currentCarId: 0,
  currentStartCarId: 0,
  view: "garage",
  winners,
  winnersCurrentPage: 1,
  winnersCount,
  sortBy: "",
  orderBy: "asc",
  arrowWins: "&darr;",
  arrowTime: "&darr;",
};
