import { Auto, Winners } from "./types/types";

const url = "http://localhost:3000";
const garage = `${url}/garage`;
const winners = `${url}/winners`;
const engine = `${url}/engine`;

export const getCars = async (
  page: number,
  limit = 7
): Promise<{ carsCount: string | null; carsItems: Auto[] }> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    carsItems: await response.json(),
    carsCount: response.headers.get("X-Total-Count"),
  };
};

export const getCar = async (id: number): Promise<void> =>
  (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: {
  name: string;
  color: string;
}): Promise<void> =>
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
): Promise<void> =>
  (
    await fetch(`${garage}/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

export const deleteCar = async (id: number): Promise<void> =>
  (await fetch(`${garage}/${id}`, { method: "DELETE" })).json();

const getSortOrder = (sort: string, order: string): string => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return "";
};

export const getWinners = async (
  page: number,
  limit = 10,
  sort: string,
  order: string
): Promise<{ winnersItems: Winners[]; winnersCount: string | null }> => {
  const response: Response = await fetch(
    `${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`
  );
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

export const createWinner = async (body: {
  id: number;
  wins: number;
  time: number;
}): Promise<void> =>
  (
    await fetch(winners, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

export const updateWinner = async (
  body: { wins: number; time: number },
  id: number
): Promise<void> =>
  (
    await fetch(`${winners}/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

export const deleteWinner = async (id: number): Promise<void> =>
  (await fetch(`${winners}/${id}`, { method: "DELETE" })).json();

export const changeEngineStatus = async (id: number, status: string) => {
  if (status === "drive") {
    const res: Response = await fetch(
      `${engine}?id=${id}&status=${status}`
    ).catch();
    return res.status !== 200 ? { success: false } : { ...(await res.json()) };
  } else {
    const res: Response = await fetch(`${engine}?id=${id}&status=${status}`);
    return await res.json();
  }
};
