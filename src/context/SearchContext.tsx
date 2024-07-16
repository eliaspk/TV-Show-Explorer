import React, { createContext, useState, ReactNode } from "react";
import { Show } from "../types";

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: Show[];
  setSearchResults: (results: Show[]) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Show[]>([]);

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, searchResults, setSearchResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};
