import { useContext } from "react";

import { InvestmentContext } from "../context/InvestmentContext";

export function useInvestmentContext() {
  return useContext(InvestmentContext);
}
