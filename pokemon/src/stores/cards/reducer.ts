import { ICard } from "../../interfaces";

export interface CardsState {
  cards: ICard[];
  page: number;
  loading: boolean;
  hasMore: boolean;
  searchValues: string[];
  checkList: string[];
}

export type Action =
  | { type: "SET_PAGE"; payload: number }
  | { type: "UPDATE_STATE"; payload: Partial<CardsState> }
  | { type: "ADD_SEARCH"; value: string }
  | { type: "REMOVE_SEARCH"; value: string }
  | { type: "ADD_CHECK_LIST"; value: string }
  | { type: "REMOVE_CHECK_LIST"; value: string };

// Reducer function
const cardsReducer = (state: CardsState, action: Action): CardsState => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload, loading: true };
    case "UPDATE_STATE":
      return { ...state, ...action.payload };
    case "ADD_SEARCH":
      if (
        action.value.trim() === "" ||
        state.searchValues.includes(action.value)
      ) {
        return state;
      }

      return {
        ...state,
        searchValues: [...state.searchValues, action.value],
        page: 1,
        loading: true,
      };
    case "REMOVE_SEARCH":
      return {
        ...state,
        searchValues: state.searchValues.filter((v) => v !== action.value),
        page: 1,
        loading: true,
      };
    case "ADD_CHECK_LIST":
      return {
        ...state,
        checkList: [...state.checkList, action.value],
        page: 1,
        loading: true,
      };
    case "REMOVE_CHECK_LIST":
      return {
        ...state,
        checkList: state.checkList.filter((v) => v !== action.value),
        page: 1,
        loading: true,
      };

    default:
      return state;
  }
};

export { cardsReducer };
