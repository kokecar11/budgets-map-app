"use client";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type ValueSummary } from "~/server/api/routers/transaction";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightLeftIcon,
  DollarSignIcon,
} from "lucide-react";
import { AnimatedCounter } from "~/components/ui/animated-counter";
import { Income } from "../../../server/api/routers/income";

export default function SummaryCard() {
  const [income, setIncome] = useState<ValueSummary>({
    current_month: 0,
    previous_month: 0,
    growth: 0,
  });
  const [expense, setExpense] = useState<ValueSummary>({
    current_month: 0,
    previous_month: 0,
    growth: 0,
  });
  const [debt, setDebt] = useState<ValueSummary>({
    current_month: 0,
    previous_month: 0,
    growth: 0,
  });
  const { data } = api.transaction.getSummary.useQuery();
  useEffect(() => {
    if (data) {
      setIncome(data.income);
      setExpense(data.expense);
      setDebt(data.debt);
    }
  }, [data]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <AnimatedCounter value={income?.current_month} duration={2000} />
          </div>
          <p className="text-xs text-muted-foreground">
            <span
              className={`flex items-center ${
                income?.growth > 0
                  ? "text-green-500"
                  : income?.growth < 0
                    ? "text-red-500"
                    : "text-black"
              }`}
            >
              {income?.growth < 0 ? (
                <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
              ) : income?.growth > 0 ? (
                <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowRightLeftIcon className="mr-1 h-4 w-4 text-black" />
              )}
              {income?.growth}%
            </span>{" "}
            vs previous month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Monthly Expenses
          </CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <AnimatedCounter value={expense?.current_month} duration={1200} />
          </div>
          <p className="text-xs text-muted-foreground">
            <span
              className={`flex items-center ${
                expense?.growth > 0
                  ? "text-green-500"
                  : expense?.growth < 0
                    ? "text-red-500"
                    : "text-black"
              }`}
            >
              {expense?.growth < 0 ? (
                <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
              ) : expense?.growth > 0 ? (
                <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowRightLeftIcon className="mr-1 h-4 w-4 text-black" />
              )}
              {expense?.growth}%
            </span>{" "}
            vs previous month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Debts</CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <AnimatedCounter value={debt?.current_month} duration={1200} />
          </div>
          <p className="text-xs text-muted-foreground">
            <span
              className={`flex items-center ${
                debt?.growth > 0
                  ? "text-green-500"
                  : debt?.growth < 0
                    ? "text-red-500"
                    : "text-black"
              }`}
            >
              {debt?.growth < 0 ? (
                <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
              ) : debt?.growth > 0 ? (
                <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowRightLeftIcon className="mr-1 h-4 w-4 text-black" />
              )}
              {debt?.growth}%
            </span>{" "}
            vs previous month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
