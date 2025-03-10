import { createContext, ReactNode, useContext, useState } from "react";

interface SearchContextProps {
  searchValues: string[];
  addSearchValue: (value: string) => void;
  removeSearchValue: (value: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchValues, setSearchValues] = useState<string[]>([]);

  const addSearchValue = (value: string) => {
    if (value.trim() === "" || searchValues.includes(value)) return;
    setSearchValues((prev) => [...prev, value]);
  };

  const removeSearchValue = (value: string) => {
    setSearchValues((prev) => prev.filter((item) => item !== value));
  };

  return (
    <SearchContext value={{ searchValues, addSearchValue, removeSearchValue }}>
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
