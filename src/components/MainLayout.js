import React from "react";

import BudgetList from "./BudgetList";
import Dashboard from "./Dashboard";

const MainLayout = () => {
  return (
    <>
      <Dashboard />
      <BudgetList />
    </>
  );
};

export default MainLayout;
