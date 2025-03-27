"use client";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { formatCurrency } from "~/lib/utils";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type ValueSummary } from "~/server/api/routers/transaction";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightLeftIcon,
  DollarSignIcon,
} from "lucide-react";
import { AnimatedCounter } from "~/components/ui/animated-counter";

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
  const { data } = api.transaction.getSummary.useQuery();
  useEffect(() => {
    if (data) {
      setIncome(data.income);
      setExpense(data.expense);
    }
  }, [data]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Ingresos Mensuales
          </CardTitle>
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
              {(income?.growth).toFixed(2)}%
            </span>{" "}
            vs mes anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Gastos Mensuales
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
            vs mes anterior
          </p>
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Ahorros Mensuales
          </CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <AnimatedCounter value={income?.current_month} duration={1200} />
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="flex items-center text-green-500">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              +7.2%
            </span>{" "}
            vs mes anterior
          </p>
        </CardContent>
      </Card> */}
      {/* <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Progreso de Ahorro
        </CardTitle>
        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$5,400</div>
        <p className="text-xs text-muted-foreground">
          <span className="flex items-center text-green-500">
            <ArrowUpIcon className="mr-1 h-4 w-4" />
            +7.2%
          </span>{" "}
          vs mes anterior
        </p>
      </CardContent>
    </Card> */}
    </div>
  );
}
