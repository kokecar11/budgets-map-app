import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "~/env";

export interface TransactionDetail {
    transaction: Transaction
}

export interface TransactionsDetail {
    transactions: Transaction[]
}
export interface Transaction {
    id: string
    amount: number
    description: string
    created_at: string
    category: string
    type: string
}

export interface ValueSummary {
    current_month: number
    previous_month: number
    growth: number
}

export interface Summary {
    income: ValueSummary
    expense: ValueSummary
    saving: ValueSummary
}

export const transactionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ category: z.string(), amount: z.number(), description: z.string(), type: z.string() }))
    .mutation(async ({ input, ctx }) => {
      console.log('input:', input);
      const urlApiBase = new URL(env.API_BASE_URL);
      
      try {
        const requestCreateTransaction = await fetch(`${urlApiBase.toString()}/transaction`, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${ctx.session.accessToken}`,
          },
          body: JSON.stringify({
            category: input.category,
            description: input.description,
            amount: input.amount,
            type: input.type
          }),
        });
  
        if (!requestCreateTransaction.ok) {
          const errorText = await requestCreateTransaction.text();
          throw new Error(`Error ${requestCreateTransaction.status}: ${errorText}`);
        }
  
        const responseData = (await requestCreateTransaction.json()) as TransactionDetail;
        return responseData;
      } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to create transaction');
      }
    }),
  
  getTransactions: protectedProcedure
    .query(async ({ ctx }) => {
      const urlApiBase = new URL(env.API_BASE_URL);
      try { 
        const requestGetTransactions = await fetch(`${urlApiBase.toString()}/transactions`, {
          method: 'GET',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${ctx.session.accessToken}`,
          },
        });
  
        if (!requestGetTransactions.ok) {
          const errorText = await requestGetTransactions.text();
          throw new Error(`Error ${requestGetTransactions.status}: ${errorText}`);
        }
  
        const responseData = (await requestGetTransactions.json()) as TransactionsDetail;
        return responseData;
      } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to get transactions');
      }
    }),
  getSummary: protectedProcedure
    .query(async ({ ctx }) => {
      const urlApiBase = new URL(env.API_BASE_URL);
      try { 
        const requestGetSummary = await fetch(`${urlApiBase.toString()}/summary`, {
          method: 'GET',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${ctx.session.accessToken}`,
          },
        });
  
        if (!requestGetSummary.ok) {
          const errorText = await requestGetSummary.text();
          throw new Error(`Error ${requestGetSummary.status}: ${errorText}`);
        }
  
        const responseData = (await requestGetSummary.json()) as Summary;
        return responseData;
      } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to get Summary');
      }
    }),
//   getBudgetById: protectedProcedure
//     .input(z.object({ id: z.string() }))
//     .query(async ({ ctx, input }) => {
//       const urlApiBase = new URL(env.API_BASE_URL);
//       try { 
//         const requestGetBudget = await fetch(`${urlApiBase.toString()}/budget/${input.id}`, {
//           method: 'GET',
//           headers: {
//             "Content-Type": 'application/json',
//             "Authorization": `Bearer ${ctx.session.accessToken}`,
//           },
//         });
  
//         if (!requestGetBudget.ok) {
//           const errorText = await requestGetBudget.text();
//           throw new Error(`Error ${requestGetBudget.status}: ${errorText}`);
//         }
  
//         const responseData = (await requestGetBudget.json()) as BudgetDetail;
//         return responseData;
//       } catch (error) {
//         console.error('Fetch error:', error);
//         throw new Error('Failed get budget');
//       }
//     })
      
    
    
});
