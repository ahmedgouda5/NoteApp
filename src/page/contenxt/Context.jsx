import React, { createContext, useState } from "react";

export const noteContext = createContext();

export default function ContextProvider({ children }) {
  const [notesContext, setNotesContext] = useState();
  const [conuter, setCounter] = useState(0);
  return (
    <noteContext.Provider value={{ notesContext, setNotesContext ,conuter ,setCounter }}>
      {children}
    </noteContext.Provider>
  );
}
