import type { UserDto } from "@/model/UserDto";
import { createContext } from "react";

export interface AuthState {
    user: UserDto | null;
    setUser: (user: UserDto | null) => void
}

const initAuthState: AuthState = {
    user: null,
    setUser: () => {}
}

export const AuthContext = createContext<AuthState>(initAuthState);