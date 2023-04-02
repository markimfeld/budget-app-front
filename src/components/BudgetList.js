import React from "react";
import { useContext } from "react";
import { Card, Button } from "react-bootstrap";

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
        {showBudgetList && (
          <div>
            {budgets.length > 0 && budgetList}
            {budgets.length === 0 && (
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
