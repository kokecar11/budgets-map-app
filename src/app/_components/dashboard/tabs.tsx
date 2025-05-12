"use client";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { formatCurrency } from "~/lib/utils";
import { format } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { CreateTransactionForm } from "../transaction/create-transaction";
import { type Transaction } from "~/server/api/routers/transaction";
import { DebtTracker } from "../debt/debt-tracker";
const monthlyData = [
  { name: "Ene", gastos: 4000, ingresos: 5400 },
  { name: "Feb", gastos: 3500, ingresos: 5400 },
  { name: "Mar", gastos: 4200, ingresos: 5400 },
  { name: "Abr", gastos: 3800, ingresos: 5400 },
  { name: "May", gastos: 4300, ingresos: 5400 },
  { name: "Jun", gastos: 3900, ingresos: 5800 },
];

const pieData = [
  { name: "Vivienda", value: 1500, color: "#8884d8" },
  { name: "Alimentación", value: 800, color: "#82ca9d" },
  { name: "Transporte", value: 400, color: "#ffc658" },
  { name: "Entretenimiento", value: 300, color: "#ff8042" },
  { name: "Otros", value: 600, color: "#0088fe" },
];

export default function TabsDetail() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const { data } = api.transaction.getTransactions.useQuery();
  useEffect(() => {
    if (data) {
      setTransactions(data.transactions);
    }
  }, [data]);
  const [activeTab, setActiveTab] = useState("transactions");
  return (
    <Tabs
      defaultValue={activeTab}
      className="space-y-4"
      onValueChange={setActiveTab}
    >
      <TabsList>
        {/* <TabsTrigger value="overview">Resumen</TabsTrigger> */}
        {/* <TabsTrigger value="analytics">Análisis</TabsTrigger> */}
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        {/* <TabsTrigger value="categories">Categorías</TabsTrigger> */}
        <TabsTrigger value="debts">Debts</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
              <CardDescription>
                Comparison of monthly income and expenses
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="ingresos" fill="#82ca9d" name="Ingresos" />
                  <Bar dataKey="gastos" fill="#8884d8" name="Gastos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Distribución de Gastos</CardTitle>
              <CardDescription>Por categoría</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Análisis Detallado</CardTitle>
            <CardDescription>Tendencias y patrones de gastos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-10 text-center">
              <p className="text-muted-foreground">
                Selecciona esta pestaña para ver análisis detallados
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="transactions" className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Transaction History</CardDescription>
            </div>
            <div className="ml-auto">
              <CreateTransactionForm />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-full p-2 ${transaction.type === "Income" ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {/* <transaction.icon className="h-4 w-4" /> */}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(
                          new Date(transaction.created_at),
                          "dd/MM/yyyy HH:mm",
                        )}
                        {" - "}
                        {transaction.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={transaction.amount > 0 ? "outline" : "secondary"}
                    >
                      {transaction.category}
                    </Badge>
                    <p
                      className={`text-sm font-medium ${transaction.type === "Income" ? "text-green-500" : "text-red-500"}`}
                    >
                      {transaction.type === "Income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View all transactions
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="categories" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Categorías de Presupuesto</CardTitle>
            <CardDescription>Gestiona tus categorías de gastos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-10 text-center">
              <p className="text-muted-foreground">
                Selecciona esta pestaña para gestionar categorías
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="debts" className="space-y-4">
        <DebtTracker />
      </TabsContent>
    </Tabs>
  );
}
