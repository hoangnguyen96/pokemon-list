import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { SearchAction, searchReducer } from "./reducer";

interface SearchContextProps {
  searchValues: string[];
  dispatch: Dispatch<SearchAction>;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, { searchValues: [] });

  return (
    <SearchContext
      value={{
        searchValues: state.searchValues,
        dispatch,
      }}
    >
      {children}
    </SearchContext>
  );
};
