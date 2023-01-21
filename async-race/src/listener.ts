import store from "./store";

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

export const listener = (): void => {
  const toGarage = document.getElementById("to-garage") as HTMLButtonElement;

  const toWinners = document.getElementById("to-winners") as HTMLButtonElement;
  changeView(toGarage, "garage");
  changeView(toWinners, "winners");
};
