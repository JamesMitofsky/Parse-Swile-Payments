import { z } from "zod";

const AmountSchema = z.object({
  value: z.number(),
});

const TransactionSchema = z.object({
  status: z.union([
    z.literal("DECLINED"),
    z.literal("CAPTURED"),
    z.literal("VALIDATED"),
  ]),
  payment_method: z.union([
    z.literal("CreditCard"),
    z.literal("Wallets::MealVoucherWallet"),
    z.null(),
  ]),
});

const OperationSchema = z.object({
  name: z.string(),
  amount: AmountSchema,
  date: z.string(),
  transactions: z.array(TransactionSchema),
});

export type OperationType = z.infer<typeof OperationSchema>;

export const BaseOperationSchema = z.object({
  responseBody: z.object({
    items: z.array(OperationSchema),
  }),
});

export const ArrayOfOperationsSchema = z.array(
  BaseOperationSchema.passthrough()
);
