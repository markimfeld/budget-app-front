import { Routes, Route } from "react-router-dom";

import "./Bootstrap-mod.css";

// components
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NewPasswordForm from "./components/NewPasswordForm";
import ForgotPasswordForm from "./components/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/recovery-password/:token" element={<NewPasswordForm />} />
        {/* private routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
