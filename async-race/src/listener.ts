import store from "./store";
import { createCar, getCars, getWinners } from "./api";
import { renderGarage } from "./renderPage";

const changeView = (to: HTMLButtonElement, view: string) => {
  const garageView = document.querySelector(
    ".garage-view"
  ) as HTMLButtonElement;
  const winnersView = document.querySelector(
    ".winners-view"
  ) as HTMLButtonElement;
  to.addEventListener("click", () => {
    store.view = view;
    winnersView.style.display = store.view === "garage" ? "none" : "block";
    garageView.style.display = store.view === "winners" ? "none" : "block";
  });
};

export const checkPagination = async (): Promise<void> => {
  const {
    winnersItems: winners,
    winnersCount: winnersCount,
  } = await getWinners(store.winnersCurrentPage);

  const { carsItems: cars, carsCount: carsCount } = await getCars(
    store.carsCurrentPage
  );

  store.winners = winners;
  store.winnersCount = winnersCount;
  store.cars = cars;
  store.carsCount = carsCount;
  if (store.view === "winners") {
    store.winnersCurrentPage * 10 < Number(store.winnersCount)
      ? ((<HTMLButtonElement>document.getElementById("next")).disabled = false)
      : ((<HTMLButtonElement>document.getElementById("next")).disabled = true);
    store.winnersCurrentPage > 1
      ? ((<HTMLButtonElement>document.getElementById("prev")).disabled = false)
      : ((<HTMLButtonElement>document.getElementById("prev")).disabled = true);
  } else {
    store.carsCurrentPage * 7 < Number(store.carsCount)
      ? ((<HTMLButtonElement>document.getElementById("next")).disabled = false)
      : ((<HTMLButtonElement>document.getElementById("next")).disabled = true);
    store.carsCurrentPage > 1
      ? ((<HTMLButtonElement>document.getElementById("prev")).disabled = false)
      : ((<HTMLButtonElement>document.getElementById("prev")).disabled = true);
  }
};

export const listener = (): void => {
  const toGarage = <HTMLButtonElement>document.getElementById("to-garage");
  const toWinners = <HTMLButtonElement>document.getElementById("to-winners");
  const next = <HTMLButtonElement>document.getElementById("next");
  const prev = <HTMLButtonElement>document.getElementById("prev");
  const createAuto = <HTMLButtonElement>document.getElementById("create-auto");
  const createColor = <HTMLButtonElement>(
    document.getElementById("create-color")
  );
  const createName = <HTMLButtonElement>document.getElementById("create-name");

  createAuto.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    const target: HTMLFormElement = <HTMLFormElement>e.target;
    console.log("target", target);
    const auto: { name: string; color: string } = {
      name: createName.value,
      color: createColor.value,
    };
    if (createName.value !== "") {
      await createCar(auto);
      await checkPagination();
      createName.value = "";
      renderGarage();
    }
  });

  next.addEventListener("click", () => {
    console.log(165);
  });

  prev.addEventListener("click", () => {
    console.log(165);
  });

  changeView(toGarage, "garage");
  changeView(toWinners, "winners");
};
