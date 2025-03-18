import { createContext, Dispatch, ReactNode, useReducer } from "react";

// Stores
import { Action, cardsReducer, CardsState } from "../../stores";

type SearchContext = string[];

export const CardsContext = createContext<CardsState | undefined>(undefined);

export const SearchContext = createContext<SearchContext | undefined>(
  undefined
);

export const CardsDispatchContext = createContext<Dispatch<Action>>(() => {});

const initialState: CardsState = {
  cards: [],
  page: 1,
  loading: true,
  hasMore: true,
  searchValues: [],
};

export const CardsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cardsReducer, initialState);
  const { searchValues } = state;

  return (
    <SearchContext value={searchValues}>
      <CardsContext value={state}>
        <CardsDispatchContext value={dispatch}>{children}</CardsDispatchContext>
      </CardsContext>
    </SearchContext>
  );
};
