import React from "react";
import { useContext } from "react";
import { Card, Button, Spinner, Stack } from "react-bootstrap";

import ExpensesList from "./ExpensesList";
import BudgetForm from "./BudgetForm";
import Success from "../components/Success";
import Budget from "./Budget";

import { BudgetContext } from "../context/BudgetContext";

const BudgetList = () => {
  const {
    budgets,
    showBudgetForm,
    showBudgetList,
    messageBudget,
    handleShowBudgetForm,
    handleShowBudgetList,
    isLoading,
  } = useContext(BudgetContext);

  const budgetList = budgets.map((budget) => {
    return <Budget key={budget._id} budget={budget} />;
  });

  const handleShowBudgetFormOrList = (showForm) => {
    handleShowBudgetForm(showForm);
    handleShowBudgetList(!showForm);
  };

  return (
    <>
      {messageBudget !== null && <Success />}
      <div>
        {!showBudgetList && (
          <div>
            <ExpensesList />
          </div>
        )}
      </div>
      <div>
        {isLoading && (
          <div className="text-center">
            <Card className="mb-4" style={{ border: "none", height: "150px" }}>
              <Card.Body
                style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
                className="d-flex justify-content-center align-items-center"
              >
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
              </Card.Body>
            </Card>
          </div>
        )}

        {showBudgetList && (
          <div>
            {budgets.length > 0 && !isLoading && budgetList}
            {budgets.length === 0 && !isLoading && (
              <Card className="mb-4">
                <Card.Body>
                  <Card.Text>
                    No hay presupuestos creados aun.{" "}
                    <Button
                      onClick={() => handleShowBudgetFormOrList(true)}
                      variant="link"
                    >
                      Crear nuevo presupuesto
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </div>
        )}
      </div>
      <div>
        {showBudgetForm && (
          <div>
            <BudgetForm />
          </div>
        )}
      </div>
    </>
  );
};

export default BudgetList;
