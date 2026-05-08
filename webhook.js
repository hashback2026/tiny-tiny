function webhookHandler(req, res) {
  console.log("Webhook received:");
  console.log(req.body);

  return res.status(200).json({
    success: true,
  });
}

module.exports = { webhookHandler };
