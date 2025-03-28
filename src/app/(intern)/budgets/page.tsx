import { type Metadata } from "next";
import { AutoCreateBudgetForm } from "~/app/_components/budget/auto-create-budget";
import { CreateBudgetForm } from "~/app/_components/budget/create-budget";

import ListBudgets from "~/app/_components/budget/list-budgets";

export const metadata: Metadata = {
  title: "Budgets Map | Budgets",
  description: "Budgets Map",
};

export default async function Page() {
  return (
    <main>
      <div className="flex items-end justify-end space-x-2">
        <div className="flex">
          <AutoCreateBudgetForm />
        </div>
        <div className="flex flex-none">
          <CreateBudgetForm />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <ListBudgets />
        <div className="min-h-[100vh] flex-1 rounded-xl bg-red-200 md:min-h-min" />
      </div>
    </main>
  );
}
