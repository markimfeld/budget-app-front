import { useEffect, useContext } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import MainLayout from "./components/MainLayout";

import { UserContext } from "./context/UserContext";

function App() {
  const {
    user,
    loadUserFromStorage,
    showRegisterForm,
    showLoginForm,
    isLoading,
  } = useContext(UserContext);

  useEffect(() => {
    loadUserFromStorage();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {user === null && showLoginForm && !isLoading && <Login />}
      {user === null && showRegisterForm && !isLoading && <Register />}
      {user !== null && !isLoading && <MainLayout />}
    </>
  );
}

export default App;
