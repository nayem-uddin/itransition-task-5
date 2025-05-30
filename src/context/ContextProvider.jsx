import { useState } from "react";
import { UserQuery } from "./contextVar.js";
export default function ContextProvider({ children }) {
  const [query, setQuery] = useState({ lang: "en", seed: 0, page: 0 });
  return (
    <UserQuery.Provider value={{ query, setQuery }}>
      {children}
    </UserQuery.Provider>
  );
}
