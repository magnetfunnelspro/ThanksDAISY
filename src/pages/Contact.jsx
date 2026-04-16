import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    number: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const PHONE_NUMBER = "917903005374";
  const WHATSAPP_NUMBER = "917903005374";
  const EMAIL = "support@thanksdaisy.com";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================
  // WHATSAPP DIRECT CHAT
  // =========================
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello, I want to inquire about the bouquets.`,
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  // =========================
  // EMAIL
  // =========================
  const handleEmail = () => {
    const subject = encodeURIComponent("Bouquet Inquiry");
    const body = encodeURIComponent(
      "Hi, I would like to know more about your products.",
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  // =========================
  // CALL
  // =========================
  const handleCall = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  // =========================
  // FORM SUBMIT (Telegram)
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(form.number)) {
      alert("Please enter a valid WhatsApp number");
      return;
    }

    const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
    const CONTACT_CHAT_ID = import.meta.env.VITE_CONTACT_CHAT_ID;

    const text = `
🌸 New Contact Inquiry

👤 Name: ${form.name}
📞 Number: ${form.number}
💬 Message: ${form.message}

⏰ Time: ${new Date().toLocaleString()}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CONTACT_CHAT_ID,
          text,
        }),
      });

      setSuccess(true);
      setForm({ name: "", number: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="w-full p-8 px-4 flex flex-col gap-12 font-['Space_Grotesk'] text-stone-800">
      {/* HEADER */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Contact Us</h2>

        {/* Quick Action */}
        <div className="grid grid-cols-3 gap-4">
          {/* WhatsApp */}
          <button
            onClick={handleWhatsApp}
            className="p-4 rounded-md flex flex-col items-center gap-2 bg-pink-50"
          >
            <i className="ri-whatsapp-line text-2xl text-pink-600"></i>
            <h4 className="font-semibold text-pink-600">WhatsApp</h4>
            <p className="text-sm text-pink-400 text-center">
              Chat with our team
            </p>
          </button>

          {/* Email */}
          <button
            onClick={handleEmail}
            className="p-4 rounded-md flex flex-col items-center gap-2 bg-pink-50"
          >
            <i className="ri-mail-line text-2xl text-pink-600"></i>
            <h4 className="font-semibold text-pink-600">Email</h4>
            <p className="text-sm text-pink-400 text-center">
              Send us an email
            </p>
          </button>

          {/* Call */}
          <button
            onClick={handleCall}
            className="p-4 rounded-md flex flex-col items-center gap-2 bg-pink-50"
          >
            <i className="ri-customer-service-line text-2xl text-pink-600"></i>
            <h4 className="font-semibold text-pink-600">Call Us</h4>
            <p className="text-sm text-pink-400 text-center">
              Talk to our expert
            </p>
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="flex flex-col gap-4">
        <h4 className="text-lg font-semibold">Or Send a Message</h4>

        {!success ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="p-4 text-sm font-semibold rounded-md border-2 border-b-4 border-pink-600 outline-none placeholder:text-pink-400 text-pink-600"
            />

            <input
              type="tel"
              name="number"
              placeholder="WhatsApp Number"
              value={form.number}
              onChange={handleChange}
              required
              className="p-4 text-sm font-semibold rounded-md border-2 border-b-4 border-pink-600 outline-none placeholder:text-pink-400 text-pink-600"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              className="p-4 text-sm font-semibold rounded-md border-2 border-b-4 border-pink-600 outline-none placeholder:text-pink-400 text-pink-600 resize-none"
            ></textarea>

            <button
              type="submit"
              className="p-4 font-semibold rounded-md border-2 border-b-4 border-pink-600 text-white bg-pink-600"
            >
              Send Message
            </button>
          </form>
        ) : (
          <div className="p-4 text-center font-semibold rounded-md text-pink-600 bg-pink-50">
            Message sent! We'll contact you soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
