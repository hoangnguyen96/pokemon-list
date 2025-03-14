import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { SearchAction, searchReducer } from "./reducer";

export const SearchContext = createContext<string[] | null>(null);

export const SearchDispatchContext = createContext<Dispatch<SearchAction>>(
  () => {}
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, { searchValues: [] });

  return (
    <SearchContext value={state.searchValues}>
      <SearchDispatchContext value={dispatch}>{children}</SearchDispatchContext>
    </SearchContext>
  );
};
