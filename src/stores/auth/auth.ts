import { StateCreator, create } from "zustand";
import { AuthStatus, User } from "../../interfaces/user";
import { AuthService } from "../../services/Auth.service";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
    status: AuthStatus,
    token?: string,
    user?: User

    loginUser: (email: string, password: string) => Promise<void>
    checkStatus: () => Promise<void>
    logoutUser: ()=> void
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "UnAuthorized",
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: "Authorized", token, user });
    } catch (error) {
      set({ status: "UnAuthorized", token: undefined, user: undefined });
      alert("No se puede autorizar")
      throw new Error("UnAuthorized"); 
    }
  },
  checkStatus: async ()=> {

    try {
      const {token, ...user} = await AuthService.checkToken()
      set({status: "Authorized", token, user})
    } catch (error) {
      set({status: "UnAuthorized", token: undefined, user:undefined})
    }

  },
  logoutUser: ()=>{
    set({status: "UnAuthorized", token: undefined, user: undefined })
  }
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: "auth-storage" }))
);