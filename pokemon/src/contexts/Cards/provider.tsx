import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";

// Constants
import { PAGE_SIZE } from "../../constants";

// Services
import { getList } from "../../services";

// Reducer
import { cardsReducer, CardsContextProps, CardsState } from "./reducer";

const CardsContext = createContext<CardsContextProps | undefined>(undefined);

const initialState: CardsState = {
  cards: [],
  page: 1,
  loading: false,
  hasMore: true,
};

export const CardsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cardsReducer, initialState);

  // Fetch data function
  const fetchData = useCallback(
    async (name?: string) => {
      dispatch({ type: "UPDATE_STATE", payload: { loading: true } });

      try {
        const newCards = await getList(state.page, PAGE_SIZE, name);

        dispatch({
          type: "UPDATE_STATE",
          payload: {
            cards: [...state.cards, ...newCards],
            hasMore: newCards.length >= PAGE_SIZE,
            loading: false,
          },
        });
      } catch (error) {
        console.error("Error fetching cards:", error);
      }

      dispatch({ type: "UPDATE_STATE", payload: { loading: false } });
    },
    [state.page, state.cards]
  );

  const setPage = useCallback(
    (page: number | ((prev: number) => number)) =>
      dispatch({
        type: "SET_PAGE",
        payload: typeof page === "function" ? page(state.page) : page,
      }),
    [state.page]
  );

  return (
    <CardsContext value={{ ...state, fetchData, setPage }}>
      {children}
    </CardsContext>
  );
};

export const useListCard = () => {
  const context = useContext(CardsContext);

  if (!context) {
    throw new Error("useListCard must be used within a CardsProvider");
  }

  return context;
};
