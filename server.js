require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { processBulkStk } = require("./queue");
const { webhookHandler } = require("./webhook");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/api/send-bulk", async (req, res) => {
  try {
    const { numbers, amount, transactionCode } = req.body;

    if (!numbers || !amount) {
      return res.status(400).json({
        success: false,
        message: "Numbers and amount required",
      });
    }

    const cleaned = numbers
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);

    const results = await processBulkStk(
      cleaned,
      amount,
      transactionCode || "BULKPAY"
    );

    res.json({
      success: true,
      total: cleaned.length,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/api/webhook", webhookHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
