const url = "http://localhost:3000";

const garage = `${url}/garage`;
const winners = `${url}/winners`;
// const engine = `${url}/engine`;

export const getCars = async (page: number, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: response.headers.get("X-Total-Count"),
  };
};

export const getCar = async (id: number) =>
  (await fetch(`${garage}/${id}`)).json();

export const getWinners = async (page: number, limit = 10) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}`);
  const items = await response.json();

  return {
    items: await Promise.all(
      items.map(async (winner: { id: number }) => ({
        ...winner,
        car: await getCar(winner.id),
      }))
    ),
    count: response.headers.get("X-Total-Count"),
  };
};
