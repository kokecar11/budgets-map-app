"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { type Budget } from "~/server/api/routers/budget";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency }).format(
    value,
  );
};

export default function DetailBudget({ id }: { id: string }) {
  const [budget, setBudget] = useState<Budget>({
    id: "",
    name: "",
    description: "",
    total_amount: 0,
    total_spent: 0,
    updated_at: "",
    created_at: "",
    transactions: [],
  });
  const progress = (budget.total_spent / budget.total_amount) * 100;

  const { data } = api.budget.getBudgetById.useQuery({ id: id });
  useEffect(() => {
    if (data) {
      setBudget(data.budget);
    }
  }, [data]);
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/budgets">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{budget.name}</h1>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Presupuesto</CardTitle>
            <CardDescription>{budget.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <dt>Monto Total:</dt>
                <dd className="font-medium">
                  {formatCurrency(budget.total_amount, "COP")}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Gastado:</dt>
                <dd className="font-medium">
                  {formatCurrency(budget.total_spent, "COP")}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Restante:</dt>
                <dd className="font-medium">
                  {formatCurrency(
                    budget.total_amount - budget.total_spent,
                    "COP",
                  )}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Fecha de creación:</dt>
                <dd>{new Date(budget.created_at).toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Fecha de actualización:</dt>
                <dd>{new Date(budget.updated_at).toLocaleDateString()}</dd>
              </div>
            </dl>
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
              <p className="mt-2 text-sm text-muted-foreground">
                {progress.toFixed(5)}% del presupuesto utilizado
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transacciones</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budget.transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      {formatCurrency(transaction.amount, "COP")}
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>
                      {new Date(
                        transaction.transaction_date,
                      ).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
