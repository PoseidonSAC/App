import { createContext } from "react";

import { UserSessionDto } from "../domain/dto/user.session.dto";
import { LoginDto } from "../domain/dto/login.dto";
export interface AuthContextProps {
  isAuthenticated: boolean;
  login: (loginDTO: LoginDto) => Promise<void>;
  logout: () => Promise<void>;
  userSession: UserSessionDto | null;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
