import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "~/env";

export interface IncomeDetail {
    income: Income
}

export interface Transaction {
    id: string
    amount: number
    description: string
    created_at: string
    category: string
    budget_id: string
    
}

export interface Income {
    id: string
    transaction_id: string
    source: string
    amount: number
    created_at: string
    updated_at: string
}
export const incomeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ source: z.string(), amount: z.number(), budget_id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      
      const urlApiBase = new URL(env.API_BASE_URL);
      const transaction_id = "1";
      try {
        const requestCreateTransaction = await fetch(`${urlApiBase.toString()}/transaction`, {
            method: 'POST',
            headers: {
              "Content-Type": 'application/json',
              "Authorization": `Bearer ${ctx.session.accessToken}`,
            },
            body: JSON.stringify({
              budget_id: transaction_id,
              source: input.source,
              amount: input.amount,
              category: "income",
            }),
          });
        if (!requestCreateTransaction.ok) {
            const errorText = await requestCreateTransaction.text();
            throw new Error(`Error ${requestCreateTransaction.status}: ${errorText}`);
            }
        const responseDataTransaction = (await requestCreateTransaction.json()) as Transaction;
        const requestCreateIncome = await fetch(`${urlApiBase.toString()}/income`, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${ctx.session.accessToken}`,
          },
          body: JSON.stringify({
            transaction_id: responseDataTransaction.id,
            source: input.source,
            amount: input.amount,
          }),
        });
  
        if (!requestCreateIncome.ok) {
          const errorText = await requestCreateIncome.text();
          throw new Error(`Error ${requestCreateIncome.status}: ${errorText}`);
        }
  
        const responseData = (await requestCreateIncome.json()) as IncomeDetail;
        return responseData;
      } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to create income');
      }
    }),
  
//   getBudgets: protectedProcedure
//     .query(async ({ ctx }) => {
//       const urlApiBase = new URL(env.API_BASE_URL);
//       try { 
//         const requestGetBudgets = await fetch(`${urlApiBase.toString()}/budgets`, {
//           method: 'GET',
//           headers: {
//             "Content-Type": 'application/json',
//             "Authorization": `Bearer ${ctx.session.accessToken}`,
//           },
//         });
  
//         if (!requestGetBudgets.ok) {
//           const errorText = await requestGetBudgets.text();
//           throw new Error(`Error ${requestGetBudgets.status}: ${errorText}`);
//         }
  
//         const responseData = (await requestGetBudgets.json()) as BudgetsDetail;
//         return responseData;
//       } catch (error) {
//         console.error('Fetch error:', error);
//         throw new Error('Failed to get budgets');
//       }
//     }),

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
