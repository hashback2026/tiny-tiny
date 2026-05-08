const PQueue = require("p-queue").default;
const { sendStkPush } = require("./tinypesa");

const queue = new PQueue({
  interval: 2000,
  intervalCap: 1,
  concurrency: 1,
});

async function processBulkStk(numbers, amount, transactionCode) {
  const results = [];

  for (const phone of numbers) {
    queue.add(async () => {
      console.log(`Sending STK to ${phone}`);

      const result = await sendStkPush(
        amount,
        phone,
        transactionCode
      );

      results.push(result);
    });
  }

  await queue.onIdle();

  return results;
}

module.exports = { processBulkStk };
