import { createContext, Dispatch, ReactNode, useReducer } from "react";

// Stores
import { Action, cardsReducer, CardsState } from "../../stores";

type FormFilterHPType = [number, number];

export const CardsContext = createContext<CardsState | undefined>(undefined);

export const FilterNameContext = createContext<string[] | undefined>(undefined);

export const FilterTypesContext = createContext<string[] | undefined>(
  undefined
);

export const FilterSupertypeContext = createContext<string[] | undefined>(
  undefined
);

export const FilterSubtypesContext = createContext<string[] | undefined>(
  undefined
);

export const FilterHPContext = createContext<FormFilterHPType | []>([]);

export const CardsDispatchContext = createContext<Dispatch<Action>>(() => {});

const initialState: CardsState = {
  cards: [],
  page: 1,
  loading: true,
  hasMore: true,
  filters: {
    types: [],
    supertype: [],
    subtypes: [],
    name: [],
  },
  hpRange: [],
};

export const CardsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cardsReducer, initialState);
  const { filters, hpRange } = state;
  const { name, subtypes, supertype, types } = filters;

  return (
    <FilterNameContext value={name}>
      <FilterSupertypeContext value={supertype}>
        <FilterSubtypesContext value={subtypes}>
          <FilterTypesContext value={types}>
            <FilterHPContext value={hpRange}>
              <CardsContext value={state}>
                <CardsDispatchContext value={dispatch}>
                  {children}
                </CardsDispatchContext>
              </CardsContext>
            </FilterHPContext>
          </FilterTypesContext>
        </FilterSubtypesContext>
      </FilterSupertypeContext>
    </FilterNameContext>
  );
};
