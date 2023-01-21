import store from "./store";
import { getWinners } from "./api";

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

const checkPagination = async (): Promise<void> => {
  const {
    winnersItems: winners,
    winnersCount: winnersCount,
  } = await getWinners(store.winnersCurrentPage);
  store.winners = winners;
  store.winnersCount = winnersCount;

  if (store.winnersCurrentPage * 10 < Number(store.winnersCount)) {
    (<HTMLButtonElement>document.getElementById("next")).disabled = false;
  } else {
    (<HTMLButtonElement>document.getElementById("next")).disabled = true;
  }

  if (store.winnersCurrentPage > 1) {
    (<HTMLButtonElement>document.getElementById("prev")).disabled = false;
  } else {
    (<HTMLButtonElement>document.getElementById("prev")).disabled = true;
  }
};

export const listener = (): void => {
  checkPagination();
  const toGarage = <HTMLButtonElement>document.getElementById("to-garage");
  const toWinners = <HTMLButtonElement>document.getElementById("to-winners");
  const next = <HTMLButtonElement>document.getElementById("next");
  const prev = <HTMLButtonElement>document.getElementById("prev");

  next.addEventListener("click", () => {
    console.log(165);
  });

  prev.addEventListener("click", () => {
    console.log(165);
  });

  changeView(toGarage, "garage");
  changeView(toWinners, "winners");
};
