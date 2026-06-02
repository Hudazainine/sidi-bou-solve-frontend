import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../services/profile";

const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile()
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
