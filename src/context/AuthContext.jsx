// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// ユーザーロールの定義
export const USER_ROLES = {
  ADMIN: 'admin',
  COMPANY: 'company',
  GENERAL: 'general',
  GUEST: 'guest',
};

// モックユーザーデータ
const mockUsers = {
  admin: {
    id: 1,
    name: '管理者',
    isLoggedIn: true,
    isCompany: true,
    hasProfile: true,
    role: USER_ROLES.ADMIN,
    email: 'admin@example.com',
  },
  company: {
    id: 2,
    name: '企業A',
    isLoggedIn: true,
    isCompany: true,
    hasProfile: true,
    role: USER_ROLES.COMPANY,
    email: 'company_a@example.com',
  },
  general: {
    id: 3,
    name: '一般ユーザーB',
    isLoggedIn: true,
    isCompany: false,
    hasProfile: true,
    role: USER_ROLES.GENERAL,
    email: 'general_b@example.com',
  },
  guest: {
    id: 0,
    name: 'ゲスト',
    isLoggedIn: false,
    isCompany: false,
    hasProfile: false,
    role: USER_ROLES.GUEST,
    email: '',
  },
};

export const AuthContext = createContext({
  user: mockUsers.guest,
  loginAsAdmin: () => {},
  loginAsCompany: () => {},
  loginAsGeneral: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  // localStorageからユーザー情報を読み込む
  const getInitialUser = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : mockUsers.guest;
  };

  const [user, setUser] = useState(getInitialUser);

  // userステートが変更されるたびにlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const loginAsAdmin = () => setUser(mockUsers.admin);
  const loginAsCompany = () => setUser(mockUsers.company);
  const loginAsGeneral = () => setUser(mockUsers.general);
  const logout = () => setUser(mockUsers.guest);

  return (
    <AuthContext.Provider value={{
      user,
      loginAsAdmin,
      loginAsCompany,
      loginAsGeneral,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
