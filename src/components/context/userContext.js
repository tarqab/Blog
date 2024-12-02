import { createContext, useState } from "react";

export const userContext = createContext();

export function UserProvider({ children }) {
  const [userUid, setUserUid] = useState(null);

  //  useEffect(function () {

  //  }, [])
 

  return (
    <userContext.Provider value={{ userUid , setUserUid }}>{children}</userContext.Provider>
  );
}
