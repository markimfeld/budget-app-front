import { Routes, Route } from "react-router-dom";

// components
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
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
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
