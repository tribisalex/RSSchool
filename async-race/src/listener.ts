import {
  changeView,
  createAutoClick,
  deleteAutoClick,
  generateCarsClick,
  nextButtonClick,
  prevButtonClick,
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
  const updateAuto: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("update-auto")
  );
  const generateCars: HTMLButtonElement = <HTMLButtonElement>(
    document.querySelector(".generate-cars-button")
  );
  createAuto.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    await createAutoClick();
  });

  updateAuto.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    await updateAutoClick();
  });

  document.body.addEventListener("click", async (e: Event) => {
    await deleteAutoClick(e);
    await updateInputClick(e);
  });

  next.addEventListener("click", async () => {
    await nextButtonClick();
  });

  prev.addEventListener("click", async () => {
    await prevButtonClick();
  });

  changeView(toGarage, "garage");
  changeView(toWinners, "winners");

  generateCars.addEventListener("click", async () => {
    // generateCars.setAttribute("disabled", "true");
    await generateCarsClick().then(() => {
      // generateCars.setAttribute("disabled", "false");
    });
  });
};
