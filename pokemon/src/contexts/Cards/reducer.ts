import { ICard } from "../../interfaces";

export interface CardsState {
  cards: ICard[];
  page: number;
  loading: boolean;
  hasMore: boolean;
}

export interface CardsContextProps extends CardsState {
  fetchData: (params?: string[]) => Promise<void>;
  setPage: (page: number | ((prev: number) => number)) => void;
}

// Action types
type Action =
  | { type: "SET_PAGE"; payload: number }
  | { type: "UPDATE_STATE"; payload: Partial<CardsState> };

// Reducer function
const cardsReducer = (state: CardsState, action: Action): CardsState => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "UPDATE_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export { cardsReducer };
