import { getCars } from "./api";

const { items: cars, count: carsCount } = await getCars(1);
console.log("cars", cars);

export default {
  cars,
  carsPageCount: 1,
  carsCount,
  view: "garage",
};
