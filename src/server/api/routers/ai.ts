import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "~/env";


export interface RecommendationDetail {
    recommendations: string
}
export const AiRouter = createTRPCRouter({
    generateRecommendation: protectedProcedure
      .input(z.object({ type_budget: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const urlApiBase = new URL(env.API_BASE_URL);
        try { 
          const requestGenerateRecommendation = await fetch(`${urlApiBase.toString()}/recommendations/${input.type_budget.toLowerCase()}`, {
            method: 'GET',
            headers: {
              "Content-Type": 'application/json',
              "Authorization": `Bearer ${ctx.session.accessToken}`,
            },
          });
    
          if (!requestGenerateRecommendation.ok) {
            const errorText = await requestGenerateRecommendation.text();
            throw new Error(`Error ${requestGenerateRecommendation.status}: ${errorText}`);
          }
    
          const responseData = (await requestGenerateRecommendation.json()) as RecommendationDetail;
          return responseData;
        } catch (error) {
          console.error('Fetch error:', error);
          throw new Error('Failed to generate recommendation');
        }
      }), 
  });
