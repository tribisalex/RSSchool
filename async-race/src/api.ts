const url = "http://localhost:3000";

const garage = `${url}/garage`;
// const engine = `${url}/engine`;
// const winners = `${url}/winners`;

export const getCars = async (page: number, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: response.headers.get("X-Total-Count"),
  };
};
