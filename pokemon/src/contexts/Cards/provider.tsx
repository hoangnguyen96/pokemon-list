import { createContext, Dispatch, ReactNode, useReducer } from "react";

// Stores
import { Action, cardsReducer, CardsState } from "../../stores";

type SearchContextType = string[];
type CheckListContextType = string[];

export const CardsContext = createContext<CardsState | undefined>(undefined);

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const CheckListContext = createContext<CheckListContextType | undefined>(
  undefined
);

export const CardsDispatchContext = createContext<Dispatch<Action>>(() => {});

const initialState: CardsState = {
  cards: [],
  page: 1,
  loading: true,
  hasMore: true,
  searchValues: [],
  checkList: [],
};

export const CardsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cardsReducer, initialState);
  const { searchValues, checkList } = state;

  return (
    <SearchContext value={searchValues}>
      <CheckListContext value={checkList}>
        <CardsContext value={state}>
          <CardsDispatchContext value={dispatch}>
            {children}
          </CardsDispatchContext>
        </CardsContext>
      </CheckListContext>
    </SearchContext>
  );
};
