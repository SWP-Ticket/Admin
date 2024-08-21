import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const storeApi = (set) => ({
  status: "unauthorized",
  role: undefined,
  token: undefined,
  email: undefined,
  userId: undefined,
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
    if (!res.ok) {
      // Handle non-200 responses
      const err = await res.json();
      console.log(err);
      throw new Error(err.errorMessages.join("\n"));
    }
    const data = await res.json();
    const object = JSON.parse(atob(data.token.split(".")[1]));
    const { Email, Id } = object;
    set({
      status: "authorized",
      role: data.role,
      token: data.token,
      email: Email,
      userId: Id,
    });
    return data;
  },
  logoutUser: () => {
    set({
      status: "unauthorized",
      role: undefined,
      token: undefined,
      email: undefined,
      userId: undefined,
    });
  },
  registerUser: async (payload) => {
    // await api.signup(payload)
    console.log(payload);
  },
});

export const useAuthStore = create()(
  devtools(persist(storeApi, { name: "auth-storage" }))
);
