import {createContext, useContext, useState, useEffect, useReducer} from "react";
import { authService } from "../services/authService.js";

const AuthContext = createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: null, isAuthenticated: true };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload, user: null, isAuthenticated: false };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  })

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user && authService.isAuthenticated()) {
      dispatch({ type: 'SET_USER', payload: user });
    }
  }, []);

  const login = async(email, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const data = await authService.login(email, password);
      console.log("Login successful, user data:", data);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.data });
      return data;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      throw error;
    }
  };

  const signup = async(firstName, lastName, email, password, password_confirmation) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const data = await authService.signup(firstName, lastName, email, password, password_confirmation);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.data });
      return data;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      throw error;
    }
  };

  const logout = async() => {
    await authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}