import type { Metadata } from "next";
// import SubscriptionForm from "../_components/subscription-form";

export const metadata: Metadata = {
  title: "Budgets Map",
  description:
    "Unlock the potential of your financial future with our powerful financial management tools. Take control, set your course, and shape your own path to success.",
};

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center">
      <div className="z-10 mx-auto w-full max-w-screen-xl px-4 text-center">
        <h1 className="mb-5 mt-3 text-4xl font-extrabold text-primary sm:text-7xl">
          Master your finances <br />&{" "}
          <span className="animate-hero-title bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-500 bg-clip-text text-transparent">
            Design your own destiny
          </span>{" "}
        </h1>
        <h2 className="mx-auto max-w-xl text-zinc-500 dark:text-zinc-300">
          Unlock the potential of your financial future with our powerful
          financial management tools. Take control, set your course, and shape
          your own path to success.
        </h2>
        {/* <SubscriptionForm /> */}
      </div>
    </div>
  );
}
