import { createContext, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const login = async(email, password) => {
    await authService.login(email, password);
    await queryClient.invalidateQueries({ queryKey: ['me'] });
  };

  const signup = async(firstName, lastName, email, password, password_confirmation) => {
    await authService.signup(firstName, lastName, email, password, password_confirmation);
    await queryClient.invalidateQueries({ queryKey: ['me'] });
  };

  const logout = async() => {
    await authService.logout();
    await queryClient.invalidateQueries({ queryKey: ['me'] });
  };

  return (
    <AuthContext.Provider value={{ login, signup, logout }}>
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