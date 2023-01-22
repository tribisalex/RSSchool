const url = "http://localhost:3000";

const garage = `${url}/garage`;
const winners = `${url}/winners`;

export const getCars = async (page: number, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    carsItems: await response.json(),
    carsCount: response.headers.get("X-Total-Count"),
  };
};

export const getCar = async (id: number) =>
  (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: { name: string; color: string }) =>
  (
    await fetch(garage, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

export const updateCar = async (
  body: { name: string; color: string },
  id: number
) =>
  (
    await fetch(`${garage}/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

export const deleteCar = async (id: number) =>
  (await fetch(`${garage}/${id}`, { method: "DELETE" })).json();

export const getWinners = async (page: number, limit = 10) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}`);
  const items = await response.json();

  return {
    winnersItems: await Promise.all(
      items.map(async (winner: { id: number }) => ({
        ...winner,
        car: await getCar(winner.id),
      }))
    ),
    winnersCount: response.headers.get("X-Total-Count"),
  };
};
