import { createContext, useContext, useState } from "react";

const BoardContext = createContext();

export function BoardProvider({ children }) {

  const [lists, setLists] = useState([]);

  return (
    <BoardContext.Provider value={{ lists, setLists }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  return useContext(BoardContext);
}