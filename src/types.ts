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
