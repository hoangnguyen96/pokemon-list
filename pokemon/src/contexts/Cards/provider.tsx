import { createContext, ReactNode, useReducer } from "react";

// Reducer
import { cardsReducer, CardsContextProps, CardsState } from "./reducer";

export const CardsContext = createContext<CardsContextProps | undefined>(
  undefined
);

const initialState: CardsState = {
  cards: [],
  page: 1,
  loading: false,
  hasMore: true,
};

export const CardsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cardsReducer, initialState);

  return <CardsContext value={{ ...state, dispatch }}>{children}</CardsContext>;
};
