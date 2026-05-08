const fetch = require("node-fetch");

async function sendStkPush(amountKes, phone, transactionCode) {
  let msisdn = phone
    .replace(/\s+/g, "")
    .replace(/[^0-9]/g, "");

  if (msisdn.startsWith("0")) {
    msisdn = "254" + msisdn.slice(1);
  } else if (msisdn.length === 9) {
    msisdn = "254" + msisdn;
  }

  const url = "https://api.tinypesa.com/api/v1/express/initialize/";

  const payload = {
    amount: amountKes,
    msisdn,
    account_no: transactionCode,
    callback_url: process.env.TINYPESA_WEBHOOK_URL,
  };

  try {
    const res = await fetch(
      `${url}?${new URLSearchParams({
        username: process.env.TINYPESA_USERNAME,
      })}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Apikey: process.env.TINYPESA_LINK_API_KEY,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    return {
      success: res.ok,
      phone: msisdn,
      data,
    };
  } catch (error) {
    return {
      success: false,
      phone: msisdn,
      error: error.message,
    };
  }
}

module.exports = { sendStkPush };
