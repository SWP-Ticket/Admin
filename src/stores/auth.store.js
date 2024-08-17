import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const storeApi = (set) => ({
  status: "unauthorized",
  role: undefined,
  token: undefined,
  loginUser: async (payload) => {
    const res = await fetch(
      import.meta.env.VITE_API_KEY + "/api/Authen/login",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    set({ status: "authorized", role: data.role, token: data.token });
    return data;
  },
  logoutUser: () => {
    set({ status: "unauthorized", role: undefined, token: undefined });
  },
  registerUser: async (payload) => {
    // await api.signup(payload)
    console.log(payload);
  },
});

export const useAuthStore = create()(
  devtools(persist(storeApi, { name: "auth-storage" }))
);
