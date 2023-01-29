import {
  changeView,
  createAutoClick,
  deleteAutoClick,
  generateCarsClick,
  nextButtonClick,
  prevButtonClick,
  raceAuto,
  sortOrder,
  startStopAutoEngine,
  updateAutoClick,
  updateInputClick,
} from "./supportFunctions";

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
  const createButton: HTMLButtonElement = <HTMLButtonElement>(
    document.querySelector(".create-button")
  );
  const createNameAuto: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("create-name")
  );
  const updateAuto: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("update-auto")
  );
  const generateCars: HTMLButtonElement = <HTMLButtonElement>(
    document.querySelector(".generate-cars-button")
  );
  createAuto.addEventListener(
    "submit",
    async (e: Event): Promise<void> => {
      e.preventDefault();
      await createAutoClick();
    }
  );
  createNameAuto.addEventListener("input", (): void => {
    createButton.removeAttribute("disabled");
  });
  updateAuto.addEventListener(
    "submit",
    async (e: Event): Promise<void> => {
      e.preventDefault();
      await updateAutoClick();
    }
  );
  document.body.addEventListener(
    "click",
    async (e: Event): Promise<void> => {
      await deleteAutoClick(e);
      await updateInputClick(e);
      await startStopAutoEngine(e);
      await sortOrder(e);
      await raceAuto(e);
    }
  );
  next.addEventListener(
    "click",
    async (): Promise<void> => {
      await nextButtonClick();
    }
  );
  prev.addEventListener(
    "click",
    async (): Promise<void> => {
      await prevButtonClick();
    }
  );
  changeView(toGarage, "garage");
  changeView(toWinners, "winners");
  generateCars.addEventListener(
    "click",
    async (): Promise<void> => {
      generateCars.setAttribute("disabled", "true");
      await generateCarsClick();
      generateCars.removeAttribute("disabled");
    }
  );
};
