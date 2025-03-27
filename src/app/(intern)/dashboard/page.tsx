import { type Metadata } from "next";
import TabsDetail from "~/app/_components/dashboard/tabs";
import BudgetCard from "~/app/_components/budget/budget-card";
import SummaryCard from "~/app/_components/dashboard/summary-card";
export const metadata: Metadata = {
  title: "Budgets Map | Dashboard",
  description: "Budgets Map Dashboard",
};

export default async function Page() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 xl:grid-cols-4">
        <div className="space-y-4 lg:col-span-3 xl:col-span-3">
          {/* Tarjetas de resumen */}
          <SummaryCard />
          {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ingresos Mensuales
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
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Gastos Mensuales
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
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ahorros</CardTitle>
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
            </Card>
            <Card>
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
            </Card>
          </div> */}
          <div className="my-4">
            <TabsDetail />
          </div>
        </div>
        {/* Columna lateral derecha con BudgetCard */}
        <div className="lg:col-span-1 xl:col-span-1">
          <div className="sticky top-20 h-[calc(100vh-6rem)]">
            <BudgetCard />
          </div>
        </div>
      </div>
    </main>
  );
}
