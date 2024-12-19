import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export interface BudgetDetail {
    budget: Budget
}

export interface BudgetsDetail {
    budgets: Budget[]
}
  
export interface Budget {
    name: string
    total_amount: number
    description: string
    updated_at: string
    created_at: string
    id: string
}
export const budgetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string(), total_amount: z.number(), description: z.string() }))
    .mutation(async ({ input, ctx }) => {
      
      const urlApiBase = new URL('http://127.0.0.1:8000/api/v1');
      
      try {
        const requestCreateBudget = await fetch(`${urlApiBase.toString()}/budget`, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${ctx.session.accessToken}`,
          },
          body: JSON.stringify({
            name: input.name,
            description: input.description,
            total_amount: input.total_amount,
          }),
        });
  
        if (!requestCreateBudget.ok) {
          const errorText = await requestCreateBudget.text();
          throw new Error(`Error ${requestCreateBudget.status}: ${errorText}`);
        }
  
        const responseData = (await requestCreateBudget.json()) as BudgetDetail;
        return responseData;
      } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to create budget');
      }
    }),
  
  getBudgets: protectedProcedure
    .query(async ({ ctx }) => {
        
      const urlApiBase = new URL('http://127.0.0.1:8000/api/v1');
      
      try {
        const requestGetBudgets = await fetch(`${urlApiBase.toString()}/budgets`, {
          method: 'GET',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${ctx.session.accessToken}`,
          },
        });
  
        if (!requestGetBudgets.ok) {
          const errorText = await requestGetBudgets.text();
          throw new Error(`Error ${requestGetBudgets.status}: ${errorText}`);
        }
  
        const responseData = (await requestGetBudgets.json()) as BudgetsDetail;
        return responseData;
      } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to create budget');
      }
    })
    
    
});
