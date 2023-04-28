import { Routes, Route } from "react-router-dom";

// components
import Login from "./components/Login";
import Register from "./components/Register";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ExpensesList from "./components/ExpensesList";

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
          <Route path="/budgets/:id/expenses" element={<ExpensesList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
