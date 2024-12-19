import { type Metadata } from "next";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Budgets Map | Dashboard",
  description: "Budgets Map Dashboard",
};

export default async function Page() {
  return (
    <main>
      <div className="flex">
        <Button>
          <Plus />
          Create Budget
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-green-200" />
          <div className="aspect-video rounded-xl bg-green-200" />
          <div className="aspect-video rounded-xl bg-green-200" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-red-200 md:min-h-min" />
      </div>
    </main>
  );
}
