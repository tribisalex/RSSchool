import store from "./store";
import { createCar, deleteCar, getCars, getWinners } from "./api";
import { renderGarage, renderWinners } from "./renderPage";

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
    checkPagination();
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

const nextButtonClick = async () => {
  const garage: HTMLElement = <HTMLElement>document.querySelector(".garage");
  const winnersView: HTMLElement = <HTMLElement>(
    document.querySelector(".winners-view")
  );
  if (store.view === "garage") {
    if (store.carsCurrentPage * 7 < Number(store.carsCount)) {
      store.carsCurrentPage += 1;
      await checkPagination();
      garage.innerHTML = renderGarage();
    }
  } else {
    if (store.winnersCurrentPage * 10 < Number(store.winnersCount)) {
      store.winnersCurrentPage += 1;
      await checkPagination();
      winnersView.innerHTML = renderWinners();
    }
  }
};

const prevButtonClick = async () => {
  const garage: HTMLElement = <HTMLElement>document.querySelector(".garage");
  const winnersView: HTMLElement = <HTMLElement>(
    document.querySelector(".winners-view")
  );
  if (store.view === "garage") {
    if (store.carsCurrentPage != 1) {
      store.carsCurrentPage -= 1;
      await checkPagination();
      garage.innerHTML = renderGarage();
    }
  } else {
    if (store.winnersCurrentPage > 1) {
      store.winnersCurrentPage -= 1;
      await checkPagination();
      winnersView.innerHTML = renderWinners();
    }
  }
};

const createAutoClick = async () => {
  const garage: HTMLElement = <HTMLElement>document.querySelector(".garage");
  const createColor = <HTMLButtonElement>(
    document.getElementById("create-color")
  );
  const createName = <HTMLButtonElement>document.getElementById("create-name");
  const auto: { name: string; color: string } = {
    name: createName.value,
    color: createColor.value,
  };
  if (createName.value !== "") {
    await createCar(auto);
    await checkPagination();
    createName.value = "";
    garage.innerHTML = renderGarage();
  }
};

const deleteAutoClick = async (e: Event) => {
  if ((<HTMLButtonElement>e.target).classList.contains("delete__auto")) {
    const garage: HTMLElement = <HTMLElement>document.querySelector(".garage");
    const id = Number((<HTMLButtonElement>e.target).id.split("-")[1]);
    await deleteCar(id);
    await checkPagination();
    garage.innerHTML = renderGarage();
  }
};

export const listener = (): void => {
  const toGarage: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("to-garage")
  );
  const toWinners: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("to-winners")
  );
  const next: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("next")
  );
  const prev: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("prev")
  );
  const createAuto: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("create-auto")
  );
  const removeAuto: NodeListOf<Element> = <NodeListOf<Element>>(
    document.querySelectorAll(".delete__auto")
  );
  console.log(removeAuto);

  createAuto.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    await createAutoClick();
  });

  document.body.addEventListener("click", async (e: Event) => {
    await deleteAutoClick(e);
  });

  next.addEventListener("click", async () => {
    await nextButtonClick();
  });

  prev.addEventListener("click", async () => {
    await prevButtonClick();
  });

  changeView(toGarage, "garage");
  changeView(toWinners, "winners");
};
