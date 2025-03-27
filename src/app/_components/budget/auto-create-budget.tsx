"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "~/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  total_amount: z.coerce.number().min(0, {
    message: "Total amount must be at least 0.",
  }),
  description: z.string(),
});

export function AutoCreateBudgetForm() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = api.budget.autoCreate.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });

  function onSubmit() {
    mutate(undefined);
    toast({
      title: "Budeget created",
      description: "Your budget has been created successfully.",
      variant: "default",
    });
  }

  return (
    <Button variant={"secondary"} onClick={onSubmit}>
      <Plus className="mr-2 h-4 w-4" />
      Auto Create Budget
    </Button>
  );
}
