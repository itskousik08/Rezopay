const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/check-revenue", async (req, res) => {
  const { key, secret } = req.body;

  try {
    const instance = new Razorpay({
      key_id: key,
      key_secret: secret
    });

    const payments = await instance.payments.all({
      count: 100
    });

    let total = 0;

    payments.items.forEach(p => {
      if (p.status === "captured") {
        total += p.amount;
      }
    });

    res.json({
      success: true,
      revenue: total / 100
    });

  } catch (err) {
    res.json({
      success: false,
      error: "Invalid API Key"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
