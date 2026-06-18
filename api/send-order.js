const brevo = require("@getbrevo/brevo");

module.exports = async (req, res) => {
if (req.method !== "POST") {
return res.status(405).json({
error: "Method not allowed",
});
}

try {
const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const order = req.body;

await apiInstance.sendTransacEmail({
  sender: {
    name: "Thanks Daisy",
    email: process.env.SENDER_EMAIL,
  },

  to: [
    {
      email: process.env.RECEIVER_EMAIL,
    },
  ],

  subject: `🌸 New Order | ${order.id} | ₹${order.total}`,

  htmlContent: `
  <div style="font-family:Arial,sans-serif;max-width:700px">

    <h1>🌸 New Order Received</h1>

    <hr>

    <h2>Order Details</h2>

    <p><strong>Order ID:</strong> ${order.id}</p>
    <p><strong>Status:</strong> ${order.status}</p>
    <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
    <p><strong>Total:</strong> ₹${order.total}</p>

    <hr>

    <h2>Customer Details</h2>

    <p><strong>Sender Name:</strong> ${order.address.senderName}</p>
    <p><strong>Sender Phone:</strong> ${order.address.phone}</p>

    <p><strong>Receiver Name:</strong> ${
      order.address.receiverName || "N/A"
    }</p>

    <p><strong>Receiver Phone:</strong> ${
      order.address.receiverPhone || "N/A"
    }</p>

    <p><strong>Relation:</strong> ${
      order.address.relation || "N/A"
    }</p>

    <p><strong>Referral:</strong> ${
      order.address.referral || "N/A"
    }</p>

    <hr>

    <h2>Delivery Details</h2>

    <p><strong>Date:</strong> ${order.address.date}</p>

    <p><strong>Time Slot:</strong>
    ${order.address.timeSlot}
    </p>

    <p>
    <strong>Address:</strong><br/>
    ${order.address.street}<br/>
    ${order.address.city}<br/>
    ${order.address.state}<br/>
    ${order.address.pincode}
    </p>

    <hr>

    <h2>Products</h2>

    <ul>
    ${order.items
      .map(
        (item) => `
        <li>
          ${item.name}
          × ${item.qty}
          — ₹${item.price * item.qty}
        </li>
      `
      )
      .join("")}
    </ul>

    <hr>

    <h2>Pricing</h2>

    <p><strong>Coupon:</strong>
    ${order.coupon || "None"}
    </p>

    <p><strong>Discount:</strong>
    ₹${order.discount || 0}
    </p>

    <p><strong>Grand Total:</strong>
    ₹${order.total}
    </p>

    <hr>

    <h2>Customer Message</h2>

    <p>${order.address.message || "N/A"}</p>

  </div>
  `,
});

return res.status(200).json({
  success: true,
});


} catch (err) {
console.error("Brevo Error:", err);


return res.status(500).json({
  success: false,
  error: err.message,
});


}
};
