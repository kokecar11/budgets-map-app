"use server";
import { signIn } from "~/server/auth";
import { type z } from "zod";
import { type loginFormSchema } from "~/lib/zod";

export const loginAction = async ({email, password}: z.infer<typeof loginFormSchema>) => {
    try {

        await signIn("credentials", { email, password, redirect: false });
        return true;
    }catch (error) {
        console.error('Fetch error:', error);
        return null
    }
}