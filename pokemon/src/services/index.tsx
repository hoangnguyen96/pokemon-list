import { ENDPOINT_URL, MESSAGES } from "../constants";

const API_END_POINT = import.meta.env.VITE_APP_API_URL || "";
const API_KEY = import.meta.env.VITE_APP_API_KEY || "";

export const getList = async (page: number, pageSize: number) => {
  try {
    const response = await fetch(
      `${API_END_POINT}${ENDPOINT_URL.CARDS}?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(MESSAGES.NETWORK_ERROR);
    }
    const { data } = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || MESSAGES.GET_ERROR);
    }
  }
};
