import { useContext } from "react";
import { CardsContext } from "../../contexts";

export const useSetPage = () => {
  const context = useContext(CardsContext);

  if (!context) {
    throw new Error("useSetPage must be used within a CardsProvider");
  }

  const { page, dispatch } = context;

  const setPage = (newPage: number | ((prev: number) => number)) => {
    dispatch({
      type: "SET_PAGE",
      payload: typeof newPage === "function" ? newPage(page) : newPage,
    });
  };

  return setPage;
};

export const useListCard = () => {
  const context = useContext(CardsContext);

  if (!context) {
    throw new Error("useListCard must be used within a CardsProvider");
  }

  return context;
};
