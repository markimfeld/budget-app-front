import React from "react";

import { Container } from "react-bootstrap";

import BudgetList from "./BudgetList";
import Dashboard from "./Dashboard";

const MainLayout = () => {
  return (
    <>
      <Container>
        <Dashboard />
        <BudgetList />
      </Container>
    </>
  );
};

export default MainLayout;
