"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { type Budget } from "~/server/api/routers/budget";
import BudgetCard from "./card-budget";

export default function ListBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const { data } = api.budget.getBudgets.useQuery();
  useEffect(() => {
    if (data) {
      setBudgets(data.budgets);
    }
  }, [data]);
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      {budgets.map((budget) => (
        <BudgetCard
          key={budget.id}
          name={budget.name}
          amount={budget.total_amount}
          description={budget.description}
        />
      ))}
    </div>
  );
}
