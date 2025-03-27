import { cookies } from "next/headers";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface SignInResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
}
export const authRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(8) }))
    .mutation(async ({ input }) => {
      
      const urlApiBase = new URL('http://127.0.0.1:8000/api/v1');
      
      try {
        const requestSignIn = await fetch(`${urlApiBase.toString()}/sign-in`, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
          },
          body: JSON.stringify({
            email: input.email,
            password: input.password,
          }),
        });
  
        if (!requestSignIn.ok) {
          const errorText = await requestSignIn.text();
          throw new Error(`Error ${requestSignIn.status}: ${errorText}`);
        }
  
        const responseData = (await requestSignIn.json()) as SignInResponse;
        return {
          accessToken: responseData.access_token,
          refreshToken: responseData.refresh_token,
          expiresIn: responseData.expires_in,
          expiresAt: responseData.expires_at,
          tokenType: responseData.token_type,
        };
      } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to sign in');
      }
    }),
  resetPassword: publicProcedure
  .input(z.object({ email: z.string().email() }))
  .mutation(async ({ input }) => {
    const urlApiBase = new URL('http://127.0.0.1:8000/api/v1');
    try {
      const requestResetPassword = await fetch(`${urlApiBase.toString()}/reset-password`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({
          email: input.email,
        }),
      });

      if (!requestResetPassword.ok) {
        console.log('Error:', requestResetPassword.status);
        const errorText = await requestResetPassword.text();
        throw new Error(`Error ${requestResetPassword.status}: ${errorText}`);
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Failed to reset password');
    }
  }),

  updatePassword: publicProcedure
  .input(z.object({ password: z.string().min(8) }))
  .mutation(async ({ ctx,input }) => {
    const urlApiBase = new URL('http://127.0.0.1:8000/api/v1');
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')
    console.log(accessToken?.value)
  
    try {
      const requestUpdatePassword = await fetch(`${urlApiBase.toString()}/update-password`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${accessToken?.value}`,
        },
        body: JSON.stringify({
          password: input.password,
        }),
      });

      if (!requestUpdatePassword.ok) {
        console.log('Error:', requestUpdatePassword.status);
        const errorText = await requestUpdatePassword.text();
        throw new Error(`Error ${requestUpdatePassword.status}: ${errorText}`);
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Failed to update password');
    }
  }),
});
