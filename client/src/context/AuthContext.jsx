import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = (userData) => {
    setAuth(userData);
    localStorage.setItem("auth", JSON.stringify(userData));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  useEffect(()=>{
    const user = localStorage.getItem('auth')
    const parseData = JSON.parse(user)
    if(parseData){
      setAuth(parseData)
    }
  },[])

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
