import { useContext } from "react";
import { CardDetailContext } from "../../contexts";

export const useCardDetail = () => {
  const context = useContext(CardDetailContext);
  if (!context) {
    throw new Error("useCardDetail must be used within a CardDetailProvider");
  }
  return context;
};
