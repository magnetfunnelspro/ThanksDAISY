import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { useCart } from "../../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  const [orderFor, setOrderFor] = useState("self");

  const [form, setForm] = useState({
    senderName: "",
    receiverName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    relation: "",
    message: "",
    date: "",
    timeSlot: "",
  });

  const [showRelation, setShowRelation] = useState(false);
  const [showTime, setShowTime] = useState(false);

  // GET COUPON FROM CART
  const { finalTotal, discount, couponCode } = useMemo(() => {
    const couponData = JSON.parse(localStorage.getItem("coupon")) || {};
    const disc = Number(couponData.discount) || 0;
    return {
      discount: disc,
      couponCode: couponData.code || null,
      finalTotal: totalPrice - disc,
    };
  }, [totalPrice]);

  // Delhi NCR Pincodes
  const validPincodes = [
    // --- DELHI (CORE) ---
    "110001",
    "110002",
    "110003",
    "110004",
    "110005",
    "110006",
    "110007",
    "110008",
    "110009",
    "110010",
    "110011",
    "110012",
    "110016",
    "110017",
    "110019",
    "110020",
    "110021",
    "110024",
    "110027",
    "110030",
    "110034",
    "110044",
    "110058",
    "110075",
    "110085",
    "110092",

    // --- NOIDA & GHAZIABAD (UP) ---
    "201301",
    "201303",
    "201304",
    "201305",
    "201307",
    "201310", // Noida/Greater Noida
    "201001",
    "201002",
    "201005",
    "201009",
    "201010",
    "201014", // Ghaziabad/Indirapuram

    // --- GURGAON & FARIDABAD (HARYANA) ---
    "122001",
    "122002",
    "122003",
    "122017",
    "122018", // Gurgaon
    "121001",
    "121002",
    "121003",
    "121004", // Faridabad
  ];

  const isDeliverable = validPincodes.includes(form.pincode);

  // Pincode Auto Detect
  const [isFetchingZip, setIsFetchingZip] = useState(false);

  const fetchLocation = async (pin) => {
    if (pin.length !== 6) return;
    setIsFetchingZip(true);

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();

      if (data[0].Status === "Success") {
        const loc = data[0].PostOffice[0];

        setForm((prev) => ({
          ...prev,
          city: loc.District,
          state: loc.State,
        }));
      }
    } finally {
      setIsFetchingZip(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Record Voice
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        setAudioBlob(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access denied or not supported.");
    }
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
    // Stop all tracks to turn off the recording light/icon in browser
    mediaRecorder.stream.getTracks().forEach((track) => track.stop());

    const clearVoice = () => {
      if (audioBlob) {
        URL.revokeObjectURL(audioBlob); // Clean up memory
        setAudioBlob(null);
      }
    };
  };

  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    } else {
      setRecordingTime(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Format time utility: 0 -> "0:00"
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Send Data to Telegram
  const sendToTelegram = async (order) => {
    const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_DATABASE_CHAT_ID;

    const text = `
🌸 New Order

🆔 Order ID - ${order.id}
👤 Name - ${order.address.senderName}
👤 Receiver - ${order.address.receiverName || "N/A"}
💑 Relation - ${order.address.relation || "N/A"}
📞 Contact - ${order.address.phone}

📍 Address - ${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}

📦 Order SUMMARY 
${order.items.map((i) => `${i.name} x ${i.qty}`).join("\n")}

🎟 Coupon - ${order.coupon || "None"}
💸 Discount - ₹${order.discount}

💰 Total - ₹${order.total}
🕒 Timeslot - ${order.address.timeSlot}
📅 Date - ${order.address.date}
💌 Message - ${order.address.message || "N/A"}
`;

    try {
      // Send text first
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text }),
      });

      // 2. Send Voice Note if it exists
      if (audioBlob) {
        const formData = new FormData();
        formData.append("chat_id", CHAT_ID);
        // We name the file 'voice.ogg' so Telegram recognizes it as a voice message
        formData.append("voice", audioBlob, "voice.ogg");
        formData.append("caption", `Voice for Order: ${order.id}`);

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendVoice`, {
          method: "POST",
          // Note: Do NOT set Content-Type header; fetch handles boundaries for FormData automatically
          body: formData,
        });
      }
    } catch (error) {
      console.error("Telegram Sync Error:", error);
      // We don't throw the error here so that the UI can still navigate to /thanks
    }
  };

  // Order Placement
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    // 1. VALIDATION FIRST
    if (
      !form.senderName ||
      !form.phone ||
      !form.street ||
      !form.pincode ||
      !form.date ||
      !form.timeSlot
    ) {
      alert("Fill required fields");
      return; // Exit here. isProcessing is still false.
    }

    if (!isDeliverable) {
      alert("Only Delhi NCR delivery available 🚫");
      return; // Exit here. isProcessing is still false.
    }

    // 2. SET PROCESSING ONLY AFTER VALIDATION PASSES
    setIsProcessing(true);

    const order = {
      id: "ORD" + Date.now(),
      items: cart,
      total: finalTotal,
      discount,
      coupon: couponCode,
      address: form,
      status: "Processing",
    };

    localStorage.setItem("order", JSON.stringify(order));

    try {
      // 3. TELEGRAM SYNC
      await sendToTelegram(order);

      // 4. CLEANUP
      if (typeof clearCart === "function") clearCart();
      localStorage.removeItem("coupon");

      // 5. NAVIGATE
      navigate("/thanks", {
        state: { name: form.senderName, orderId: order.id },
      });
    } catch (err) {
      console.error("Order process error:", err);
      // If something goes wrong, reset the button so they can try again
      setIsProcessing(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full p-8 px-4 flex flex-col gap-8 font-['Space_Grotesk'] text-stone-800">
      {/* ORDER TYPE */}
      <div className="flex flex-col gap-4">
        <h4 className="text-lg font-semibold">Who are you ordering for?</h4>

        <div className="flex gap-4">
          <button
            onClick={() => setOrderFor("self")}
            className={`p-4 font-semibold rounded-md border-2 border-r-4 border-b-4 border-pink-600 text-pink-600 ${
              orderFor === "self" ? "text-white bg-pink-600" : ""
            }`}
          >
            Myself
          </button>

          <button
            onClick={() => setOrderFor("someone")}
            className={`p-4 font-semibold rounded-md border-2 border-r-4 border-b-4 border-pink-600 text-pink-600 ${
              orderFor === "someone" ? "bg-pink-600 text-white" : ""
            }`}
          >
            Someone Else
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="flex flex-col gap-4">
        {/* Names */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            required
            type="text"
            name="senderName"
            placeholder="Your Name"
            value={form.senderName}
            onChange={handleChange}
            className="p-4 border rounded-md outline-none"
          />

          {orderFor === "someone" && (
            <input
              type="text"
              name="receiverName"
              placeholder="Receiver's Name"
              value={form.receiverName}
              onChange={handleChange}
              className="p-4 border rounded-md outline-none"
            />
          )}
        </div>

        {/* Phone */}
        <input
          required
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="p-4 border rounded-md outline-none"
        />

        {/* Address */}
        <div className="grid md:grid-cols-2 gap-4">
          <textarea
            required
            name="street"
            placeholder="Street Address"
            onChange={handleChange}
            className="p-4 border rounded-md outline-none"
          />
          <input
            required
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) => {
              handleChange(e);
              fetchLocation(e.target.value);
            }}
            className="p-4 border rounded-md outline-none"
          />
          <input
            name="city"
            placeholder={isFetchingZip ? "Detecting City..." : "City"}
            value={form.city}
            readOnly
            className={`p-4 border rounded-md outline-none ${isFetchingZip ? "animate-pulse" : ""}`}
          />
          <input
            name="state"
            placeholder="State"
            value={form.state}
            readOnly
            className="p-4 border rounded-md outline-none"
          />
        </div>

        {/* Relation */}
        {orderFor === "someone" && (
          <div className="relative">
            <div
              onClick={() => setShowRelation(!showRelation)}
              className="p-4 border rounded-md flex justify-between cursor-pointer"
            >
              {form.relation || "Select Relation"}
              <i className="ri-arrow-down-s-line"></i>
            </div>

            {showRelation && (
              <div className="absolute w-full mt-2 rounded-md border bg-white z-10">
                {[
                  "Girlfriend",
                  "Boyfriend",
                  "Wife",
                  "Husband",
                  "Friend",
                  "Family",
                  "Other",
                ].map((r) => (
                  <div
                    key={r}
                    onClick={() => {
                      setForm({ ...form, relation: r });
                      setShowRelation(false);
                    }}
                    className="p-4 border-b hover:bg-pink-50 cursor-pointer"
                  >
                    {r}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Delivery Date */}
        <input
          required
          type="date"
          name="date"
          min={new Date().toISOString().split("T")[0]}
          value={form.date}
          onChange={handleChange}
          className="w-full p-4 border rounded-md outline-none"
        />

        {/* Time */}
        <div className="relative">
          <div
            onClick={() => setShowTime(!showTime)}
            className="p-4 border rounded-md flex justify-between cursor-pointer"
          >
            {form.timeSlot || "Select Time Slot"}
            <i className="ri-arrow-down-s-line"></i>
          </div>

          {showTime && (
            <div className="absolute w-full mt-2 rounded-md border bg-white z-10">
              {[
                "Morning (8 AM - 12 PM)",
                "Afternoon (12 PM - 4 PM)",
                "Evening (4 PM - 8 PM)",
              ].map((t) => (
                <div
                  key={t}
                  onClick={() => {
                    setForm({ ...form, timeSlot: t });
                    setShowTime(false);
                  }}
                  className="p-4 border-b hover:bg-pink-50 cursor-pointer"
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message */}
        <textarea
          name="message"
          placeholder="Add a personal message (any words, if any promise this will be safe)"
          value={form.message}
          onChange={handleChange}
          className="p-4 border rounded-md outline-none resize-none"
        />

        {/* Voice Message Section */}
        <div className="p-4 border rounded-md flex flex-col gap-2">
          <label className="text-sm font-semibold">Voice Note (Optional)</label>
          <div className="flex items-center justify-between gap-4">
            {!isRecording ? (
              <button
                type="button"
                onClick={startRecording}
                className="p-2 px-4 rounded-md font-semibold flex items-center gap-2 text-pink-600 bg-pink-50"
              >
                <i className="ri-mic-line text-lg"></i>
                {audioBlob ? "Record Again" : "Record Voice"}
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                className="p-2 px-4 rounded-md font-semibold flex items-center gap-2 text-white bg-pink-600 animate-pulse"
              >
                <i className="ri-stop-circle-line text-lg"></i>
                Stop Recording
              </button>
            )}

            {isRecording && (
              <span className="text-sm animate-pulse text-red-600">
                {formatTime(recordingTime)}
              </span>
            )}

            {audioBlob && !isRecording && (
              <div className="flex items-center gap-2">
                <audio
                  src={URL.createObjectURL(audioBlob)}
                  controls
                  className="h-8 w-40"
                />
                <button
                  onClick={() => setAudioBlob(null)}
                  className="text-red-600"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            )}
          </div>
          <p className="text-xs text-stone-600">
            Record a sweet message for the recipient!
          </p>
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <div className="border-t pt-4 flex flex-col gap-4">
        <h4 className="font-semibold text-xl">Order Summary</h4>

        <div className="flex flex-col gap-2">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.name} x {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
        )}

        <div className="flex justify-between font-semibold border-t pt-4">
          <span>Total</span>
          <span>₹{finalTotal}</span>
        </div>
      </div>

      {/* ACTION */}
      <button
        onClick={handlePlaceOrder}
        disabled={isProcessing}
        className={`w-full p-4 rounded-md font-semibold text-white transition-all ${
          isProcessing
            ? "bg-stone-400 cursor-not-allowed"
            : "bg-pink-600 hover:bg-pink-700 active:scale-95"
        }`}
      >
        {isProcessing ? "Processing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
