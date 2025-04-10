import React, { createContext, useState, useEffect, useContext } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); // null when unauthenticated
  const [token, setToken] = useState(null);

  const adminLogin = (adminData, authToken) => {
    setAdmin(adminData);
    setToken(authToken);
    localStorage.setItem("adminToken", authToken);
    localStorage.setItem("admin", JSON.stringify(adminData));
  };

  const adminLogout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    const savedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (savedToken && savedAdmin) {
      setToken(savedToken);
      setAdmin(savedAdmin);
    }
  }, []);

  return (
    <AdminAuthContext.Provider value={{ admin, token, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const AdminAuth =()=>useContext(AdminAuthContext);