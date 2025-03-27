import { type Metadata } from "next";
// import { useRouter } from "next/router";
import DetailBudget from "~/app/_components/budget/detail-budget";

export const metadata: Metadata = {
  title: "Budgets Map | Budgets",
  description: "Budgets Map",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log(id);
  return (
    <main>
      <div className="flex items-end justify-end p-4">
        <div className="flex flex-none"></div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DetailBudget id={id} />
        <div className="min-h-[100vh] flex-1 rounded-xl bg-red-200 md:min-h-min" />
      </div>
    </main>
  );
}
