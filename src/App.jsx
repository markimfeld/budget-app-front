import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* private routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
