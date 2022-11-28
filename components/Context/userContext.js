import { createContext, useState, useEffect } from "react";


export const UserContext = createContext({
  setPoint: ({}) => null,
  point: null,
});

export const UserProvider = ({ children }) => {
  const [point, setPoint] = useState(false);
  const value = { point, setPoint };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
