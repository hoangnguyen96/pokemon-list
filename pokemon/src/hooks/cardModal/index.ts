import { useContext } from "react";
import { CardDetailContext } from "../../contexts";

export const useCardDetail = () => {
  const context = useContext(CardDetailContext);

  return context;
};
