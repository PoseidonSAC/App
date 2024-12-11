import { UserSessionDto } from "../domain/dto/user.session.dto";
import { useState } from "react";
import { AuthContext } from "./context";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../domain/dto/login.dto";
import { useEffect } from "react";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userSession, setUserSession] = useState<UserSessionDto | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const authService = new AuthService();

  useEffect(() => {
    authService.validateToken().then((userSession) => {
      if (userSession) {
        setUserSession(userSession);
        setIsAuthenticated(true);
      }
    });
  }, [setUserSession, setIsAuthenticated]);

  const login = async (loginDto: LoginDto) => {
    const userSession = await authService.login(loginDto);
    if (userSession.status === 200) {
      setUserSession(userSession);
      setIsAuthenticated(true);
    }
  };
  const logout = async () => {
    await authService.logout();
    setUserSession(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, userSession, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
