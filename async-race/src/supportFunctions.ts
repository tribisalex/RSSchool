import store from "./store";
import {
  createCar,
  deleteCar,
  deleteWinner,
  getCars,
  getWinners,
  updateCar,
} from "./api";
import { renderGarage, renderWinners } from "./renderPage";
import { Auto } from "./types/types";

export const changeView = (to: HTMLButtonElement, view: string) => {
  const garageView = document.querySelector(
    ".garage-view"
  ) as HTMLButtonElement;
  const winnersView = document.querySelector(
    ".winners-view"
  ) as HTMLButtonElement;
  to.addEventListener("click", async () => {
    store.view = view;
    winnersView.style.display = store.view === "garage" ? "none" : "block";
    garageView.style.display = store.view === "winners" ? "none" : "block";
    await checkPagination();
  });
};

export const checkPagination = async (): Promise<void> => {
  const garage: HTMLElement = <HTMLElement>document.querySelector(".garage");
  const winnersView: HTMLElement = <HTMLElement>(
    document.querySelector(".winners-view")
  );
  const {
    winnersItems: winners,
    winnersCount: winnersCount,
  } = await getWinners(
    store.winnersCurrentPage,
    10,
    store.sortBy,
    store.orderBy
  );
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
  garage.innerHTML = renderGarage();
  winnersView.innerHTML = renderWinners();
};

export const nextButtonClick = async () => {
  if (store.view === "garage") {
    if (store.carsCurrentPage * 7 < Number(store.carsCount)) {
      store.carsCurrentPage += 1;
      await checkPagination();
    }
  } else {
    if (store.winnersCurrentPage * 10 < Number(store.winnersCount)) {
      store.winnersCurrentPage += 1;
      await checkPagination();
    }
  }
};

export const prevButtonClick = async () => {
  if (store.view === "garage") {
    if (store.carsCurrentPage != 1) {
      store.carsCurrentPage -= 1;
      await checkPagination();
    }
  } else {
    if (store.winnersCurrentPage > 1) {
      store.winnersCurrentPage -= 1;
      await checkPagination();
    }
  }
};

export const createAutoClick = async () => {
  const createColor: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("create-color")
  );
  const createName: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("create-name")
  );
  const createButton: HTMLButtonElement = <HTMLButtonElement>(
    document.querySelector(".create-button")
  );
  const auto: { name: string; color: string } = {
    name: createName.value,
    color: createColor.value,
  };
  createButton.setAttribute("disabled", "true");
  if (createName.value !== "") {
    await createCar(auto);
    await checkPagination();
    createName.value = "";
  }
};

export const updateAutoClick = async (): Promise<void> => {
  const updateColor: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("update-color")
  );
  const updateName = <HTMLButtonElement>document.getElementById("update-name");
  const updateButton: HTMLButtonElement = <HTMLButtonElement>(
    document.querySelector(".update-button")
  );
  const auto: { name: string; color: string } = {
    name: updateName.value,
    color: updateColor.value,
  };
  updateButton.setAttribute("disabled", "true");
  if (updateName.value !== "") {
    await updateCar(auto, store.currentCarId);
    await checkPagination();
    updateName.value = "";
  }
};

export const deleteAutoClick = async (e: Event) => {
  if ((<HTMLButtonElement>e.target).classList.contains("delete__auto")) {
    const id = Number((<HTMLButtonElement>e.target).id.split("-")[1]);
    const deleteAutoButton: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById(`remove-${id}`)
    );
    deleteAutoButton.setAttribute("disabled", "true");
    await deleteCar(id);
    store.winners.forEach((item) => {
      if (item.id === id) {
        deleteWinner(id);
      }
    });
    await checkPagination();
  }
};

export const updateInputClick = async (e: Event) => {
  const updateNameInput: HTMLInputElement = <HTMLInputElement>(
    document.querySelector(".name__auto__update")
  );
  const updateColorInput: HTMLInputElement = <HTMLInputElement>(
    document.querySelector(".color__auto__update")
  );
  const updateButton: HTMLButtonElement = <HTMLButtonElement>(
    document.querySelector(".update-button")
  );
  if ((<HTMLButtonElement>e.target).classList.contains("select__auto")) {
    updateButton.removeAttribute("disabled");
    const id = Number((<HTMLButtonElement>e.target).id.split("-")[1]);
    store.currentCarId = id;
    store.cars.forEach((car: Auto) => {
      if (car.id === id) {
        updateNameInput.value = car.name;
        updateColorInput.value = car.color;
      }
    });
  }
};

export const startStopAutoEngine = async (e: Event) => {
  if ((<HTMLButtonElement>e.target).classList.contains("button-engine")) {
    const id = Number((<HTMLButtonElement>e.target).id.split("-")[1]);
    const status: string = (<HTMLButtonElement>e.target).id.split("-")[0];
    store.currentStartCarId = id;
    store.cars.forEach((car: Auto) => {
      if (car.id === id) {
        if (status === "start") {
          // changeEngineStatus(id, "started");
          console.log("start");
        } else {
          // changeEngineStatus(id, "stopped");
          console.log("stop");
        }
      }
    });
  }
};

const letters = "0123456789ABCDEF";
const carsNameArray = [
  [
    "Nissan",
    "Mercedes",
    "Peugeot",
    "Lada",
    "Hyundai",
    "Tayota",
    "Chery",
    "Mitsubishi",
    "Chevrolet",
    "Renault",
  ],
  [
    "Supra",
    "Largus",
    "Niva",
    "Qashqai",
    "Creta",
    "Polo",
    "Jetta",
    "Duster",
    "Camry",
    "Tiggo",
  ],
];

const renderNameAuto = (): string => {
  const nameModel =
    carsNameArray[0][Math.floor(Math.random() * carsNameArray[1].length)];
  const nameMark =
    carsNameArray[1][Math.floor(Math.random() * carsNameArray[0].length)];
  return nameModel + " " + nameMark;
};

const renderColorAuto = (): string => {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

export const generateCarsClick = async () => {
  const generateCars: HTMLButtonElement = <HTMLButtonElement>(
    document.querySelector(".generate-cars-button")
  );
  for (let i = 0; i < 100; i++) {
    const name = renderNameAuto();
    const color = renderColorAuto();
    const auto: { name: string; color: string } = {
      name: name,
      color: color,
    };
    await createCar(auto);
  }
  generateCars.setAttribute("disabled", "true");
  await checkPagination();
};

export const sortOrder = async (e: Event) => {
  if ((<HTMLButtonElement>e.target).classList.contains("wins")) {
    store.sortBy = "wins";
    if (store.orderBy === "" || store.orderBy === "asc") {
      store.orderBy = "desc";
      store.arrowWins = "&uarr;";
    } else {
      store.orderBy = "asc";
      store.arrowWins = "&darr;";
    }
    await checkPagination();
  }
  if ((<HTMLButtonElement>e.target).classList.contains("time")) {
    store.sortBy = "time";
    if (store.orderBy === "" || store.orderBy === "asc") {
      store.orderBy = "desc";
      store.arrowTime = "&uarr;";
    } else {
      store.orderBy = "asc";
      store.arrowTime = "&darr;";
    }
    await checkPagination();
  }
};
