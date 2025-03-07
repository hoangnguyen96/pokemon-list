import { createContext, ReactNode, useContext, useReducer } from "react";
import { SearchContextProps, searchReducer, SearchState } from "./reducer";

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

const initialState: SearchState = {
  searchValue: "",
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const setSearchValue = (value: string) => {
    dispatch({ type: "SET_SEARCH", payload: value });
  };

  return (
    <SearchContext value={{ ...state, setSearchValue }}>
      {children}
    </SearchContext>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
