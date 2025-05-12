"use client";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useQueryClient } from "@tanstack/react-query";
import { type Budget } from "~/server/api/routers/budget";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { AlertCircle, DollarSign, SparkleIcon } from "lucide-react";
import { formatCurrency } from "~/lib/utils";
import { AnimatedCounter } from "~/components/ui/animated-counter";
import { GenerateRecommendationAiButton } from "./generate-recommendation-button";

type BudgetType = "Saving" | "Balanced" | "Debt";

export default function BudgetCard() {
  const queryClient = useQueryClient();
  const [selectedType, setSelectedType] = useState<BudgetType>("Balanced");
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [budget, setBudget] = useState<Budget>({
    total_income: 0,
    total_spent: 0,
    total_remaining: 0,
    percent_spent: 0,
    description: "",
    recommendation: "",
    name: "Budget",
    created_at: "",
    updated_at: "",
    type: "Balanced",
    id: "",
  });
  const { data } = api.budget.getBudgets.useQuery();

  useEffect(() => {
    if (data) {
      setBudgets(data.budgets);
      if (selectedType) {
        const selectedBudget = data.budgets.find(
          (b) => b.type === selectedType,
        )!;
        setBudget(selectedBudget);
      }
    }
  }, [data, selectedType]);

  const { mutate } = api.budget.update.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });

  const onRecommendationGenerated = (recommendation: string) => {
    mutate({
      id: budget?.id,
      recommendation: recommendation,
    });

    setBudget((prevBudget) => ({
      ...prevBudget,
      recommendation: recommendation,
    }));
  };

  const getStatusColor = () => {
    if (budget?.total_remaining < 0) return "text-red-500";
    if (budget?.percent_spent >= 90) return "text-red-500";
    if (budget?.percent_spent >= 75) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>{budget?.name}</span>
          <DollarSign className="h-5 w-5 text-primary" />
        </CardTitle>
        <CardDescription>{budget?.description}</CardDescription>
        <div className="mt-4 flex gap-2 rounded-lg bg-muted p-1">
          {budgets.map(({ type }) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as BudgetType)}
              className={`flex-1 rounded-md px-2 py-1.5 text-xs transition-colors ${
                selectedType === type
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted-foreground/10"
              }`}
            >
              {type === "Saving" && "Saving"}
              {type === "Balanced" && "Balanced"}
              {type === "Debt" && "Debt"}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-between space-y-6">
        {/* Budget Overview */}
        <div>
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Spent</span>
              <span className="font-bold">
                <AnimatedCounter value={budget?.total_spent} duration={2000} />
              </span>
            </div>
            <Progress
              value={budget?.percent_spent > 100 ? 100 : budget?.percent_spent}
              className={`h-2 ${budget?.percent_spent > 100 ? "bg-red-200" : ""}`}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Budget Summary */}
          <div className="mb-6 grid grid-cols-1 gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <div className="text-xs text-muted-foreground">Total Budget</div>
              <div className="text-lg font-bold">
                {formatCurrency(budget?.total_income)}
              </div>
            </div>
            <div className="rounded-lg bg-primary/10 p-3">
              <div className="text-xs text-muted-foreground">Remainder</div>
              <div
                className={`text-lg font-bold ${getStatusColor()} flex items-center gap-1`}
              >
                {formatCurrency(budget?.total_remaining)}
                {budget?.total_remaining < 0 && (
                  <AlertCircle className="h-4 w-4" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        {/* <div className="flex-grow overflow-auto">
          <h3 className="mb-3 text-sm font-medium">Categorías de Gastos</h3>
          <div className="max-h-[calc(100vh-450px)] space-y-3 overflow-y-auto pr-2">
            {budget.categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${category.color}`}
                  ></div>
                  <span className="text-sm">{category.name}</span>
                </div>
                <span className="text-sm font-medium">${category.amount}</span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Recomendaciones basadas en el tipo de presupuesto */}
        <div className="mt-4 rounded-lg bg-muted/50 p-3">
          <h3 className="mb-2 flex items-center text-sm font-medium">
            <SparkleIcon className="mr-2 h-4 w-4"></SparkleIcon>
            Recommendation
          </h3>
          <p className="text-xs text-muted-foreground">
            {budget?.recommendation}
          </p>
          <div className="mt-2">
            {budget?.id && (
              <GenerateRecommendationAiButton
                onRecommendationGenerated={onRecommendationGenerated}
                type_budget={selectedType}
              />
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mx-auto mt-auto pt-4">
        {/* <Button variant="outline" size="sm" className="flex items-center gap-1">
          <PieChart className="h-4 w-4" />
          <span>Análisis</span>
        </Button> */}
        {/* <Button size="sm" className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4" />
          <span>Adjust</span>
        </Button> */}
      </CardFooter>
    </Card>
  );
}
