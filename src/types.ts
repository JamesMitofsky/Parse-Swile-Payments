import { z } from "zod";

const CurrencySchema = z.object({
  iso_3: z.string(),
  symbol: z.string(),
  title: z.string(),
});

const AmountSchema = z.object({
  value: z.number(),
});

const TransactionSchema = z.object({
  status: z.string(),
  payment_method: z.union([z.string(), z.null()]),
  date: z.string(),
  amount: AmountSchema,
});

const TagSchema = z
  .object({
    short: z.string().nullable(),
  })
  .nullable();

const BaseOperationSchema = z.object({
  responseBody: z.object({
    items: z.array(
      z.object({
        name: z.string(),
        amount: AmountSchema,
        date: z.string(),
        transactions: z.array(TransactionSchema),
        tag: TagSchema,
      })
    ),
  }),
});

export const ArrayOfOperationsSchema = z.array(
  BaseOperationSchema.passthrough()
);
