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

    operations.forEach((operation) => {
      operation.responseBody.items.forEach((item) => {
        const succeededTransactions = item.transactions.filter(
          ({ status }) => status !== "DECLINED"
        );
        console.log(JSON.stringify(succeededTransactions, null, 2));
      });
    });

    // the statuses that interest me are declined and captured
  } catch (err) {
    console.error("Validation failed:", err);
  }
});
