import { useContext } from "react";
import { CardsContext } from "../../contexts";

export const useListCard = () => {
  const context = useContext(CardsContext);

  if (!context) {
    throw new Error("useListCard must be used within a CardsProvider");
  }

  return context;
};
