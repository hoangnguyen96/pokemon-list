import { createContext, ReactNode, useContext, useReducer } from "react";
import { searchReducer } from "./reducer";

interface SearchContextProps {
  searchValues: string[];
  addSearchValue: (value: string) => void;
  removeSearchValue: (value: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, { searchValues: [] });

  const addSearchValue = (value: string) => dispatch({ type: "ADD", value });

  const removeSearchValue = (value: string) =>
    dispatch({ type: "REMOVE", value });

  return (
    <SearchContext
      value={{
        searchValues: state.searchValues,
        addSearchValue,
        removeSearchValue,
      }}
    >
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
