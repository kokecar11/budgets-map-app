"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type z } from "zod";
import { loginAction } from "~/actions/auth-actions";
// import { api } from "~/trpc/react";
import { signIn } from "~/server/auth";
// import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "~/hooks/use-toast";
import { useForm } from "react-hook-form";
// import { useAuthStore } from "~/context/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "~/lib/zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  // const [open, setOpen] = useState(false);
  // const setTokens = useAuthStore((state) => state.setTokens);
  // const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // const { mutate } = api.auth.signIn.useMutation({
  //   onSuccess: async (data) => {
  //     setTokens({
  //       accessToken: data.accessToken,
  //       refreshToken: data.refreshToken,
  //     });
  //     await queryClient.invalidateQueries();
  //   },
  // });

  async function onSubmit({
    email,
    password,
  }: z.infer<typeof loginFormSchema>) {
    const response = await loginAction({ email, password });
    if (response) {
      toast({
        title: "Sign in successful",
        description: "Welcome back!",
        variant: "default",
      });
      router.push("/dashboard");
    } else {
      toast({
        title: "Error signing in",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
    // mutate(
    //   { email, password },
    //   {
    //     onSuccess: () => {
    //       toast({
    //         title: "Sign in successful",
    //         description: "Welcome back!",
    //         variant: "default",
    //       });
    //       router.push("/dashboard");
    //     },
    //     onError: (error) => {
    //       toast({
    //         title: "Error signing in",
    //         description: error.message,
    //         variant: "destructive",
    //       });
    //     },
    //   },
    // );
  }

  return (
    <Form {...form}>
      <form
        // action={async (formData) => {
        //   "use server";
        //   await signIn("credentials", formData);
        // }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          required
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="/reset-password"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
