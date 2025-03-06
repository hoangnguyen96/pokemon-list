export interface SearchState {
  searchValueDebounce: string;
}

export interface SearchContextProps extends SearchState {
  setSearchValueDebounce: (value: string) => void;
}

type ActionSearch = { type: "SET_SEARCH"; payload: string };

const searchReducer = (
  state: SearchState,
  action: ActionSearch
): SearchState => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchValueDebounce: action.payload };
    default:
      return state;
  }
};

export { searchReducer };
