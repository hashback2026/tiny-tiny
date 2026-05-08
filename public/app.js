async function sendBulk() {
  const amount = document.getElementById("amount").value;
  const transactionCode = document.getElementById("transactionCode").value;
  const numbers = document.getElementById("numbers").value;

  const resultBox = document.getElementById("result");

  resultBox.innerText = "Processing...";

  try {
    const res = await fetch("/api/send-bulk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        transactionCode,
        numbers,
      }),
    });

    const data = await res.json();

    resultBox.innerText = JSON.stringify(data, null, 2);
  } catch (error) {
    resultBox.innerText = error.message;
  }
}
