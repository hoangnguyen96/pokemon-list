export interface SearchState {
  searchValue: string;
}

export interface SearchContextProps extends SearchState {
  setSearchValue: (value: string) => void;
}

type ActionSearch = { type: "SET_SEARCH"; payload: string };

const searchReducer = (
  state: SearchState,
  action: ActionSearch
): SearchState => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchValue: action.payload };
    default:
      return state;
  }
};

export { searchReducer };
