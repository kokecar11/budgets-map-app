import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "~/env";

export interface BudgetDetail {
    budget: Budget
}

export interface BudgetsDetail {
    budgets: Budget[]
}

export interface Transaction {
    id: string
    amount: number
    description: string
    transaction_date: string
    category: string
    budget_id: string
    
}

export interface Budget {
    id: string
    name: string
    description: string
    recommendation: string
    type: string
    total_income: number
    total_spent: number
    total_remaining: number
    percent_spent: number
    updated_at: string
    created_at: string
}
export const budgetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string(), total_amount: z.number(), description: z.string() }))
    .mutation(async ({ input, ctx }) => {
      
      const urlApiBase = new URL(env.API_BASE_URL);
      
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
    autoCreate: protectedProcedure
    .mutation(async ({ ctx }) => {
      
      const urlApiBase = new URL(env.API_BASE_URL);
      
      try {
        const requestCreateBudget = await fetch(`${urlApiBase.toString()}/budget/generate-current-month`, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${ctx.session.accessToken}`,
          },
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

  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().optional(), recommendation: z.string().optional(), description: z.string().optional()}))
    .mutation(async ({ input, ctx }) => {
      const urlApiBase = new URL(env.API_BASE_URL);

      const { id, ...inputData } = input;
    
      
      const body = Object.fromEntries(
        Object.entries(inputData).filter(([_, value]) => value !== undefined)
      );

      try {
        const requestUpdateBudget = await fetch(`${urlApiBase.toString()}/budget/${id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${ctx.session.accessToken}`,
          },
          body: JSON.stringify(body),
        });
  
        if (!requestUpdateBudget.ok) {
          const errorText = await requestUpdateBudget.text();
          throw new Error(`Error ${requestUpdateBudget.status}: ${errorText}`);
        }
  
        const responseData = (await requestUpdateBudget.json()) as BudgetDetail;
        return responseData;
      }
      catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to update budget');
      }
    }),
  
  getBudgets: protectedProcedure
    .query(async ({ ctx }) => {
      const urlApiBase = new URL(env.API_BASE_URL);
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
        throw new Error('Failed to get budgets');
      }
    }),

  getBudgetById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const urlApiBase = new URL(env.API_BASE_URL);
      try { 
        const requestGetBudget = await fetch(`${urlApiBase.toString()}/budget/${input.id}`, {
          method: 'GET',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${ctx.session.accessToken}`,
          },
        });
  
        if (!requestGetBudget.ok) {
          const errorText = await requestGetBudget.text();
          throw new Error(`Error ${requestGetBudget.status}: ${errorText}`);
        }
  
        const responseData = (await requestGetBudget.json()) as BudgetDetail;
        return responseData;
      } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed get budget');
      }
    })
      
    
    
});
