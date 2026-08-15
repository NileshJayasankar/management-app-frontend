import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    const loggedInUser = data.user || data;
    const token = data.token || data.accessToken;

    if (token) localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    sessionStorage.setItem('email',JSON.stringify(loggedInUser.email));
    sessionStorage.setItem('role',JSON.stringify(loggedInUser.role));
    sessionStorage.setItem('id',JSON.stringify(loggedInUser.id));
    sessionStorage.setItem('designation',JSON.stringify(loggedInUser.designation));
    setUser(loggedInUser);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: Boolean(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
