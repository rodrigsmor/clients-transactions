import { User } from "../@types/user";
import { createContext } from "react";

interface AppContext {
  user: User;
  customersId: Set<number>| null;
  setUser: (user: User) => void;
  setCustomersId: (customersId: Set<number> | null) => void;
}

const AppContext = createContext<AppContext>({
  user: {
    name: "",
    email: "",
    profile_picture: ""
  },
  customersId: null,
  setCustomersId: () => {},
  setUser: () => {},
})

export default AppContext;