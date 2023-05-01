import { User } from "../@types/user";
import { createContext } from "react";

interface AppContext {
  user: User;
  setUser: (user: User) => void;
}

const AppContext = createContext<AppContext>({
  user: {
    name: "",
    email: "",
    profile_picture: ""
  },
  setUser: () => {},
})

export default AppContext;