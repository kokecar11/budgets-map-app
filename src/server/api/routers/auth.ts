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
        const requestSignIn = await fetch(`${urlApiBase.toString()}/signin`, {
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
          console.log('Error:', requestSignIn.status);
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

});
