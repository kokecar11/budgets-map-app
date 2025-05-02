"use client";
import { Suspense } from "react";
import { UpdatePasswordForm } from "~/components/update-password-form";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Suspense>
        <UpdatePasswordForm />
      </Suspense>
    </div>
  );
}
