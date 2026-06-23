import { createContext, useContext, useReducer } from "react";

const AuthProviderContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loggedin":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "loggedout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error("Unknown action type");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "loggedin", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "loggedout" });
  }
  return (
    <AuthProviderContext.Provider
      value={{ login, logout, user, isAuthenticated }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthProviderContext);
  if (context === undefined)
    throw new Error("context used outside the provider");
  return context;
}

export { AuthProvider, useAuth };
