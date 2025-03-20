import { createContext, Dispatch, ReactNode, useReducer } from "react";

// Stores
import { Action, cardsReducer, CardsState } from "../../stores";

type SearchContextType = string[];
type CheckListContextType = string[];
type FormFilterHPType = string[];

export const CardsContext = createContext<CardsState | undefined>(undefined);

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const CheckListContext = createContext<CheckListContextType | undefined>(
  undefined
);

export const FilterHPContext = createContext<FormFilterHPType | undefined>(
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
  hpList: [],
};

export const CardsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cardsReducer, initialState);
  const { searchValues, checkList, hpList } = state;

  return (
    <SearchContext value={searchValues}>
      <CheckListContext value={checkList}>
        <FilterHPContext value={hpList}>
          <CardsContext value={state}>
            <CardsDispatchContext value={dispatch}>
              {children}
            </CardsDispatchContext>
          </CardsContext>
        </FilterHPContext>
      </CheckListContext>
    </SearchContext>
  );
};
