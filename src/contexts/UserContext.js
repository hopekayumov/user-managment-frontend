import React , {useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userTable, setUserTable] = useState(null)
  return(
      <UserContext.Provider value = {[userTable, setUserTable]}>
        {props.children}
      </UserContext.Provider>
  );
}