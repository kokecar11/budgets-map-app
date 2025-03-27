import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "~/env";

export interface DebtDetail {
    debt: Debt
}

export interface DebtDetails {
    debts: Debt[]
}

export interface DebtPaymentDetail {
    debt_payment: DebtPayment
}

export interface DebtPayment {
    transaction_id: string
    payment_date: string
    installment_number: number
    created_at: string
    deleted_at: string
    debt_id: string
    id: string
    amount_paid: number
    status: string
    updated_at: string
}

export interface Debt {
    id: string
    amount: number
    due_date: string
    minimum_payment: number
    status: string
    creditor: string
    description?: string
    transaction_id: string
    installment_count: number
    debt_payments?: DebtPayment[]
    created_at: string
    updated_at: string
    total_paid: number
    paid_installments: number
    next_payment_date: string
    estimated_completion_date: string
    interest_rate: number
    payment_frequency: string
}
export const debtRouter = createTRPCRouter({
    createDebt: protectedProcedure
    .input(z.object({ 
        creditor: z.string(), 
        amount: z.number(), 
        description: z.string(), 
        due_date: z.date(), 
        installment_count: z.number(), 
        minimum_payment: z.number(),
        status: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
        const urlApiBase = new URL(env.API_BASE_URL);
        try {
            const requestCreateDebt = await fetch(`${urlApiBase.toString()}/debt`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${ctx.session.accessToken}`,
                },
                body: JSON.stringify({
                    creditor: input.creditor,
                    amount: input.amount,
                    description: input.description,
                    due_date: input.due_date,
                    status: input.status,
                    installment_count: input.installment_count,
                    minimum_payment: input.minimum_payment,
                }),
            });
            
    
            if (!requestCreateDebt.ok) {
            const errorText = await requestCreateDebt.text();
            throw new Error(`Error ${requestCreateDebt.status}: ${errorText}`);
            }
    
            const responseData = (await requestCreateDebt.json()) as DebtDetail;
            return responseData;
        } catch (error) {
            console.error('Fetch error:', error);
            throw new Error('Failed to create income');
        }
    }),
    getDebts: protectedProcedure
    .query(async ({ ctx }) => {
        const urlApiBase = new URL(env.API_BASE_URL);
        try {
            const requestDebts = await fetch(`${urlApiBase.toString()}/debts`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${ctx.session.accessToken}`,
                },
            });
            if (!requestDebts.ok) {
                const errorText = await requestDebts.text();
                throw new Error(`Error ${requestDebts.status}: ${errorText}`);
            }
            const responseData = (await requestDebts.json()) as DebtDetails;
            return responseData;
        } catch (error) {
            console.error('Fetch error:', error);
            throw new Error('Failed to get debts');
        }
    }
    ),
    createDebtPayment: protectedProcedure
    .input(z.object({ 
        amount_paid: z.number(), 
        debt_id: z.string(), 
        description: z.string(), 
        payment_date: z.date(), 
        installment_number: z.number(), 
        status: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
        const urlApiBase = new URL(env.API_BASE_URL);
        try {
            const requestCreateDebtPayment = await fetch(`${urlApiBase.toString()}/debt-payment`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${ctx.session.accessToken}`,
                },
                body: JSON.stringify({
                    debt_id: input.debt_id,
                    amount_paid: input.amount_paid,
                    description: input.description,
                    payment_date: input.payment_date,
                    status: input.status,
                    installment_number: input.installment_number,
                }),
            });
            if (!requestCreateDebtPayment.ok) {
                const errorText = await requestCreateDebtPayment.text();
                throw new Error(`Error ${requestCreateDebtPayment.status}: ${errorText}`);
                }
    
            const responseData = (await requestCreateDebtPayment.json()) as DebtPaymentDetail;
            return responseData;
        } catch (error) {
            console.error('Fetch error:', error);
            throw new Error('Failed to create income');
        }
    }),    
});
