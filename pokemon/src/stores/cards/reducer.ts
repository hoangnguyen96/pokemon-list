import { ICard } from "../../interfaces";

export interface IFilterState {
  name: string[];
  types: string[];
  supertype: string[];
  subtypes: string[];
}

export interface CardsState {
  cards: ICard[];
  page: number;
  loading: boolean;
  hasMore: boolean;
  filters: IFilterState;
  hpRange: [number, number] | [];
}

export enum CARDS_ACTIONS {
  SET_PAGE = "SET_PAGE",
  UPDATE_STATE = "UPDATE_STATE",
  ADD_FILTER_VALUE = "ADD_FILTER_VALUE",
  REMOVE_FILTER_VALUE = "REMOVE_FILTER_VALUE",
  SET_HP_RANGE = "SET_HP_RANGE",
}

export type Action =
  | { type: CARDS_ACTIONS.SET_PAGE; payload: number }
  | { type: CARDS_ACTIONS.UPDATE_STATE; payload: Partial<CardsState> }
  | {
      type: CARDS_ACTIONS.ADD_FILTER_VALUE;
      filterKey: keyof IFilterState;
      value: string;
    }
  | {
      type: CARDS_ACTIONS.REMOVE_FILTER_VALUE;
      filterKey: keyof IFilterState;
      value: string;
    }
  | { type: CARDS_ACTIONS.SET_HP_RANGE; hpFrom: number; hpTo: number };

// Reducer function
const cardsReducer = (state: CardsState, action: Action): CardsState => {
  switch (action.type) {
    case CARDS_ACTIONS.SET_PAGE:
      return { ...state, page: action.payload, loading: true };

    case CARDS_ACTIONS.UPDATE_STATE:
      return { ...state, ...action.payload };

    case CARDS_ACTIONS.ADD_FILTER_VALUE: {
      const filterValues = state.filters[action.filterKey];

      return {
        ...state,
        filters: {
          ...state.filters,
          [action.filterKey]: filterValues.includes(action.value)
            ? filterValues
            : [...filterValues, action.value],
        },
        page: 1,
        loading: true,
      };
    }

    case CARDS_ACTIONS.REMOVE_FILTER_VALUE: {
      const filterValues = state.filters[action.filterKey];

      return {
        ...state,
        filters: {
          ...state.filters,
          [action.filterKey]: filterValues.filter(
            (val) => val !== action.value
          ),
        },
        page: 1,
        loading: true,
      };
    }

    case CARDS_ACTIONS.SET_HP_RANGE:
      if (!action.hpFrom || !action.hpTo) {
        return {
          ...state,
          hpRange: [],
          page: 1,
          loading: true,
        };
      }

      return {
        ...state,
        hpRange: [action.hpFrom, action.hpTo],
        page: 1,
        loading: true,
      };

    default:
      return state;
  }
};

export { cardsReducer };
