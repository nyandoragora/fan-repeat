// src/context/AuthContext.jsx
import React, { createContext } from 'react';

export const AuthContext = createContext({
  user: {
    id: 1,
    name: '山田太郎',
    isLoggedIn: true,
    isCompany: false, // 企業アカウントかどうか
    hasProfile: true, // プロフィール入力済みか
  },
});

export const AuthProvider = ({ children }) => {
  const user = {
    id: 1,
    name: '山田太郎',
    isLoggedIn: true,
    isCompany: false,
    hasProfile: true,
  };

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
