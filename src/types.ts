import { z } from "zod";

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
  amount: z.object({
    value: z.number(),
  }),
});

const OperationSchema = z.object({
  name: z.string(),
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

// EXPORT TYPES

const CsvOperationSchema = z.object({
  name: z.string(),
  amount: z.string(),
  date: z.string(),
  transactions: z.array(TransactionSchema),
});

export type CsvOperationType = z.infer<typeof CsvOperationSchema>;
