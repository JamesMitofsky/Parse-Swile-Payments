import fs from "fs";
import path from "path";
import { ArrayOfOperationsSchema, OperationType } from "./types";

// Asynchronously read the JSON file and console.log its contents
fs.readFile(path.join(__dirname, "requests.json"), "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  try {
    const jsonObj = JSON.parse(data);

    // Validate and parse the object using the Zod schema. If it passes, the `operation` is now a typed object according to the Operation interface
    const swileNetworkTraffic = ArrayOfOperationsSchema.parse(jsonObj);

    // For ease of manipulation, group all of the `items` in `responseBody` into a single array
    const operations: OperationType[] = swileNetworkTraffic.flatMap(
      ({ responseBody: { items } }) => items
    );

    const successfulOperations = operations.reduce((acc, operation) => {
      // Filter transactions within each item based on the specified criteria.
      const filteredTransactions = operation.transactions.filter(
        ({ payment_method }) => payment_method === "Wallets::MealVoucherWallet"
        // status !== "DECLINED" && // Ensures the transaction did not fail.
        // (status === "VALIDATED" || status === "CAPTURED") // Ensures it's a company transaction or a voucher use.
      );

      // If there are no transactions left after filtering, skip this operation
      if (filteredTransactions.length === 0) return acc;

      // Otherwise, we know the operation is...
      // 1. not a 'CreditCard' payment_method.
      // 2. not a 'DECLINED' transaction.
      // 3. either a 'VALIDATED' or 'CAPTURED' transaction (meaning I either spent or received Swile vouchers).

      // Overwrite transactions with the filtered list.
      const modifiedItem = {
        ...operation,
        transactions: filteredTransactions,
      };

      acc.push(modifiedItem);

      return acc;
    }, [] as OperationType[]);

    const formatNumbersAndDates = successfulOperations.map((operation) => ({
      ...operation,
      amount: (operation.amount.value / 100).toFixed(2),
      date: new Date(operation.date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    }));

    // print most recent transactions last
    const operationsWithMostRecentFirst = formatNumbersAndDates.reverse();

    console.log(JSON.stringify(operationsWithMostRecentFirst, null, 2));

    // the statuses that interest me are declined and captured
  } catch (err) {
    console.error("Validation failed:", err);
  }
});
