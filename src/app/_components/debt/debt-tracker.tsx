"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { type Debt } from "~/server/api/routers/debt";
import { CalendarClock, TrendingDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Button } from "~/components/ui/button";
import { AnimatedCounter } from "~/components/ui/animated-counter";
import { Badge } from "~/components/ui/badge";
import { CreateDebtForm } from "./create-debt";
import { CreateDebtPaymentForm } from "./create-debtpayment";

export function DebtTracker() {
  const { data } = api.debt.getDebts.useQuery();

  const [debts, setDebts] = useState<Debt[]>([
    {
      id: "1",
      creditor: "Préstamo Hipotecario",
      amount: 0,
      due_date: new Date().toISOString(),
      minimum_payment: 0,
      status: "active",
      installment_count: 0,
      total_paid: 0,
      paid_installments: 0,
      next_payment_date: new Date().toISOString(),
      estimated_completion_date: new Date().toISOString(),
      interest_rate: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      transaction_id: "1",
      payment_frequency: "monthly",
    },
  ]);
  useEffect(() => {
    if (data) {
      setDebts(data.debts);
    }
  }, [data]);
  const [expandedDebt, setExpandedDebt] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedDebt(expandedDebt === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const calculateRemainingAmount = (debt: Debt) => {
    return debt.amount - debt.total_paid * debt.paid_installments;
  };

  const calculateProgress = (debt: Debt) => {
    return (debt.paid_installments / debt.installment_count) * 100;
  };

  const calculateRemainingMonths = (debt: Debt) => {
    return debt.installment_count - debt.paid_installments;
  };

  const calculateTotalInterest = (debt: Debt) => {
    const totalPayment = debt.minimum_payment * debt.installment_count;
    const totalInterest = totalPayment - debt.amount;
    return Math.max(totalInterest, 0);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle>Debt follow-up</CardTitle>
          <CardDescription>
            Keep track of your debts and outstanding payments
          </CardDescription>
        </div>
        <div className="ml-auto">
          <CreateDebtForm />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {debts.map((debt) => (
            <Card
              key={debt.id}
              className={expandedDebt === debt.id ? "border-primary/50" : ""}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{debt.creditor}</CardTitle>
                  <Badge
                    variant={
                      debt.interest_rate > 10 ? "destructive" : "outline"
                    }
                    className="ml-2"
                  >
                    {debt.interest_rate}% interest
                  </Badge>
                </div>
                <CardDescription>
                  Monthly Fee:{" "}
                  <AnimatedCounter
                    value={debt.minimum_payment}
                    duration={1000}
                  />
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Payment progress</span>
                    <span className="font-medium">
                      {debt.paid_installments} de {debt.installment_count}{" "}
                      installments
                    </span>
                  </div>
                  <Progress value={calculateProgress(debt)} className="h-2" />

                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>
                      Paid:{" "}
                      <AnimatedCounter
                        value={debt.total_paid}
                        duration={1000}
                      />
                    </span>
                    <span>
                      Total:{" "}
                      <AnimatedCounter value={debt.amount} duration={1000} />
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarClock className="mr-1 h-4 w-4" />
                      <span>
                        Next payment:{" "}
                        {formatDate(
                          debt.next_payment_date || new Date().toISOString(),
                        )}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(debt.id)}
                      className="text-xs"
                    >
                      {expandedDebt === debt.id
                        ? "Less details"
                        : "More details"}
                    </Button>
                  </div>
                </div>

                {expandedDebt === debt.id && (
                  <div className="mt-4 space-y-3 border-t pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-muted/50 p-3">
                        <div className="text-xs text-muted-foreground">
                          Remainder
                        </div>
                        <div className="text-lg font-bold">
                          <AnimatedCounter
                            value={calculateRemainingAmount(debt)}
                            duration={1000}
                          />
                        </div>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-3">
                        <div className="text-xs text-muted-foreground">
                          Remaining installments
                        </div>
                        <div className="text-lg font-bold">
                          {calculateRemainingMonths(debt)}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Total in interests
                          </div>
                          <div className="text-lg font-bold text-amber-600">
                            <AnimatedCounter
                              value={calculateTotalInterest(debt)}
                              duration={1000}
                            />
                          </div>
                        </div>
                        <TrendingDown className="h-8 w-8 text-amber-600/40" />
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <p>
                        Estimated completion:{" "}
                        {new Date(
                          debt.estimated_completion_date,
                        ).toLocaleDateString("es-ES", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                {/* <Button variant="outline" size="sm" className="w-full">
              <DollarSign className="mr-2 h-4 w-4" />
              Registrar Pago
            </Button> */}
                <CreateDebtPaymentForm debt_id={debt.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
