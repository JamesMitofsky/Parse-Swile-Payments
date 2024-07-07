import fs from "fs";
import path from "path";
import { ArrayOfOperationsSchema } from "./types";

// Asynchronously read the JSON file and console.log its contents
fs.readFile(path.join(__dirname, "requests.json"), "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  try {
    // Parse the JSON string to an object
    const jsonObj = JSON.parse(data);
    // Validate and parse the object using the Zod schema. If it passes, the `operation` is now a typed object according to the Operation interface
    const operations = ArrayOfOperationsSchema.parse(jsonObj);

    // Filter the operations to only include the ones that have at least one transaction with a status of "CAPTURED"
    const successfulOperations = operations.map(({ responseBody: { items } }) =>
      items.filter((item) =>
        item.transactions.some(({ status }) => status !== "DECLINED")
      )
    );

    const operationsWithReadableDate = successfulOperations.map((operation) =>
      operation.map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      }))
    );

    // reverse the order of the operations
    operationsWithReadableDate.reverse();

    console.log(JSON.stringify(operationsWithReadableDate, null, 2));

    // the statuses that interest me are declined and captured
  } catch (err) {
    console.error("Validation failed:", err);
  }
});
