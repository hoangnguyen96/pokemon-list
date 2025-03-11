interface SearchState {
  searchValues: string[];
}

type SearchAction =
  | { type: "ADD"; value: string }
  | { type: "REMOVE"; value: string };

export const searchReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case "ADD":
      if (
        action.value.trim() === "" ||
        state.searchValues.includes(action.value)
      ) {
        return state;
      }
      return { ...state, searchValues: [...state.searchValues, action.value] };

    case "REMOVE":
      return {
        ...state,
        searchValues: state.searchValues.filter((v) => v !== action.value),
      };

    default:
      return state;
  }
};
