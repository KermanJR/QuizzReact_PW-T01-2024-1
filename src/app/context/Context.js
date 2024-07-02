import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('userData'); 
    setUser({}); 
    setPoints(0); 
    router.push('/login')
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        points,
        setPoints,
        setUser,
        logout 
      }}>
      {children}
    </UserContext.Provider>
  );
};
