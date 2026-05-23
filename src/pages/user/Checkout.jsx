import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Context
import { useCart } from "../../context/CartContext";

// Meta Pixel
import { trackPixel } from "../../utils/metaPixel";
import { trackCustomPixel } from "../../utils/metaPixel";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  const [orderFor, setOrderFor] = useState("self");

  const [form, setForm] = useState({
    senderName: "",
    receiverName: "",
    phone: "",
    receiverPhone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    relation: "",
    referral: "",
    message: "",
    date: "",
    timeSlot: "",
  });

  // CHANGE THIS TO TRUE/FALSE
  const allowTodayOrders = true;

  const today = new Date();

  const todayDateString = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const currentHour = today.getHours();

  // Delivery slots
  const deliverySlots = [
    {
      label: "Morning (10 AM - 2 PM)",
      closeHour: 12,
    },
    {
      label: "Afternoon (2 PM - 6 PM)",
      closeHour: 16,
    },
    {
      label: "Evening (6 PM - 10 PM)",
      closeHour: 20,
    },
    {
      label: "Midnight (12 AM*) +₹600",
      closeHour: 22,
    },
  ];

  // Check if selected date is today
  const isTodaySelected = form.date === todayDateString;

  // Filter slots for same-day delivery
  const availableTimeSlots = deliverySlots.filter((slot) => {
    // Tomorrow/future => show all slots
    if (!isTodaySelected) return true;

    // Today => close slot 2 hours before
    return currentHour < slot.closeHour;
  });

  // Date Picker
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      setForm((prev) => ({
        ...prev,
        date: formattedDate,
      }));
    }
  }, [selectedDate]);

  const [showRelation, setShowRelation] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showReferral, setShowReferral] = useState(false);

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
    // Delhi (UT)
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
    "110013",
    "110014",
    "110015",
    "110016",
    "110017",
    "110018",
    "110019",
    "110020",
    "110021",
    "110022",
    "110023",
    "110024",
    "110025",
    "110026",
    "110027",
    "110028",
    "110029",
    "110030",
    "110031",
    "110032",
    "110033",
    "110034",
    "110035",
    "110036",
    "110037",
    "110038",
    "110039",
    "110040",
    "110041",
    "110042",
    "110043",
    "110044",
    "110045",
    "110046",
    "110047",
    "110048",
    "110049",
    "110051",
    "110052",
    "110053",
    "110054",
    "110055",
    "110056",
    "110057",
    "110058",
    "110059",
    "110060",
    "110061",
    "110062",
    "110063",
    "110064",
    "110065",
    "110066",
    "110067",
    "110068",
    "110069",
    "110070",
    "110071",
    "110072",
    "110073",
    "110074",
    "110075",
    "110076",
    "110077",
    "110078",
    "110079",
    "110080",
    "110081",
    "110082",
    "110083",
    "110084",
    "110085",
    "110086",
    "110087",
    "110088",
    "110089",
    "110090",
    "110091",
    "110092",
    "110093",
    "110094",
    "110095",
    "110096",
    "110097",

    // Ghaziabad
    "201001",
    "201002",
    "201003",
    "201004",
    "201005",
    "201006",
    "201007",
    "201008",
    "201009",
    "201010",
    "201011",
    "201012",
    "201013",
    "201014",
    "201015",
    "201016",
    "201017",
    "201018",
    "201019",
    "201101",
    "201102",
    "201201",
    "201204",
    "201206",

    // Noida
    "201301",
    "201302",
    "201303",
    "201304",
    "201305",
    "201306",
    "201307",
    "201308",
    "201309",

    // Greater Noida
    "201310",
    "201311",
    "201312",
    "201313",
    "201314",
    "201315",
    "201316",
    "201317",
    "201318",
    "203207",

    // Gurgaon / Gurugram
    "122001",
    "122002",
    "122003",
    "122004",
    "122005",
    "122006",
    "122007",
    "122008",
    "122009",
    "122010",
    "122011",
    "122012",
    "122015",
    "122016",
    "122017",
    "122018",
    "122051",
    "122101",
    "122102",
    "122103",
    "122105",
    "122106",
    "122107",
    "122108",
    "122109",
    "122413",

    // Faridabad
    "121001",
    "121002",
    "121003",
    "121004",
    "121005",
    "121006",
    "121007",
    "121008",
  ];

  const isDeliverable = validPincodes.includes(form.pincode);

  // Pincode Auto Detect
  const [isFetchingZip, setIsFetchingZip] = useState(false);

  const fetchLocation = async (pin) => {
    if (pin.length !== 6) return;

    setIsFetchingZip(true);

    try {
      const res = await fetch(`https://api.zippopotam.us/in/${pin}`);

      if (!res.ok) {
        throw new Error("Invalid pincode");
      }

      const data = await res.json();

      setForm((prev) => ({
        ...prev,
        city: data.places?.[0]?.["place name"] || "",
        state: data.places?.[0]?.state || "",
      }));
    } catch (error) {
      console.error("Pincode fetch error:", error);

      setForm((prev) => ({
        ...prev,
        city: "",
        state: "",
      }));
    } finally {
      setIsFetchingZip(false);
    }

    const available = validPincodes.includes(pin);

    trackCustomPixel("DeliveryCheck", {
      pincode: pin,
      available,
    });
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
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
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
📢 Referral - ${order.address.referral || "N/A"}
📞 Sender Contact - ${order.address.phone}
📞 Receiver Contact - ${order.address.receiverPhone || "N/A"}

📍 Address - ${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}

📦 Order SUMMARY 
${order.items.map((i) => `${i.name} x ${i.qty}`).join("\n")}

🎟 Coupon - ${order.coupon || "None"}
💸 Discount - ₹${order.discount}

💰 Total - ₹${order.total}
💳 Payment Mode - ${order.paymentMethod}

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
  const midnightCharge = form.timeSlot === "Midnight (12 AM*) +₹600" ? 600 : 0;

  // Shipping Charges
  const shippingCost = totalPrice >= 1199 ? 0 : 250;

  const grandTotal = finalTotal + shippingCost + midnightCharge;

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async (paymentMethod) => {
    if (
      !form.senderName ||
      (orderFor === "someone" && !form.senderName) ||
      !form.phone ||
      (orderFor === "someone" && !form.receiverPhone) ||
      !form.street ||
      !form.pincode ||
      !form.date ||
      !form.timeSlot
    ) {
      alert("Fill required fields");
      return;
    }

    if (!isDeliverable) {
      alert("Sorry, we are currently available in Delhi NCR.");
      return;
    }

    trackPixel("AddShippingInfo", {
      city: form.city,
      state: form.state,
      pincode: form.pincode,
    });

    const orderId = "ORD" + Date.now();
    const orderData = {
      id: orderId,
      items: cart,
      total: grandTotal,
      discount,
      coupon: couponCode,
      address: form,
      paymentMethod: paymentMethod, // Store the method
      status: "Processing",
    };

    if (paymentMethod === "COD") {
      processFinalOrder(orderData);
    } else {
      initiateRazorpay(orderData);
    }
  };

  // Separate the final sync logic
  const processFinalOrder = async (order, paymentResponse = null) => {
    setIsProcessing(true);

    try {
      localStorage.setItem("order", JSON.stringify(order));

      await sendToTelegram(order);

      if (typeof clearCart === "function") clearCart();

      localStorage.removeItem("coupon");

      trackPixel(
        "Purchase",
        {
          transaction_id: paymentResponse?.razorpay_payment_id || order.id,
          value: grandTotal,
          currency: "INR",
          contents: cart.map((item) => ({
            id: item.id,
            quantity: item.qty,
            item_price: item.price,
          })),
          content_ids: cart.map((item) => item.id),
          num_items: cart.length,
        },
        order.id,
      );

      navigate("/thanks", {
        state: {
          name: form.senderName,
          orderId: order.id,
        },
      });
    } catch (err) {
      console.error("Order process error:", err);
      setIsProcessing(false);
      alert("Something went wrong.");
    }
  };

  // Razorpay Logic
  const initiateRazorpay = (orderData) => {
    const options = {
      key: import.meta.env.VITE_RZP_LIVE_KEY_ID,
      amount: orderData.total * 100,
      currency: "INR",
      name: "Thanks Daisy",
      description: `Order ${orderData.id}`,
      image: "/BrandLogo.png",
      handler: function (response) {
        // Payment Successful
        const paidOrder = {
          ...orderData,
          paymentId: response.razorpay_payment_id,
          status: "Paid",
        };
        processFinalOrder(paidOrder, response);
      },
      prefill: {
        name: form.senderName,
        contact: form.phone,
      },
      theme: {
        color: "#57534e",
      },
    };

    trackPixel("AddPaymentInfo", {
      value: grandTotal,
      currency: "INR",
    });

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", function (response) {
      trackCustomPixel("PaymentFailed", {
        code: response.error.code,
        reason: response.error.description,
        source: response.error.source,
        step: response.error.step,
      });
    });
  };

  return (
    <div className="w-full p-8 px-4 xl:px-16 flex flex-col xl:flex-row gap-8 font-['Space_Grotesk'] text-stone-800">
      {/* Form */}
      <div className="w-full xl:w-[60%] flex flex-col gap-8">
        {/* ORDER TYPE */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold">Who are you ordering for?</h4>

          <div className="xl:text-sm flex gap-4">
            <button
              onClick={() => setOrderFor("self")}
              className={`p-4 font-semibold rounded-md border-2 border-r-4 border-b-4 border-stone-800 text-stone-800 ${
                orderFor === "self" ? "text-white bg-stone-800" : ""
              }`}
            >
              Myself
            </button>

            <button
              onClick={() => setOrderFor("someone")}
              className={`p-4 font-semibold rounded-md border-2 border-r-4 border-b-4 border-stone-800 text-stone-800 ${
                orderFor === "someone" ? "bg-stone-800 text-white" : ""
              }`}
            >
              Someone Else
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="xl:text-sm flex flex-col gap-4">
          {/* Names */}
          <div className="grid grid-cols-1 gap-4">
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
          <div className="grid grid-cols-1 gap-4">
            <input
              required
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="p-4 border rounded-md outline-none"
            />

            {orderFor === "someone" && (
              <input
                type="tel"
                name="receiverPhone"
                placeholder="Receiver's Phone Number"
                value={form.receiverPhone}
                onChange={handleChange}
                className="p-4 border rounded-md outline-none"
              />
            )}
          </div>

          {/* Address */}
          <div className="grid md:grid-cols-2 gap-4">
            <textarea
              required
              name="street"
              placeholder="Street Address"
              onChange={handleChange}
              className="p-4 border rounded-md outline-none"
            />
            <div className="flex flex-col gap-2">
              <input
                required
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e) => {
                  handleChange(e);

                  const value = e.target.value;

                  if (value.length === 6) {
                    fetchLocation(value);
                  }
                }}
                className="p-4 border rounded-md outline-none"
              />
              <span
                className={`text-xs px-2 ${
                  form.pincode.length === 6
                    ? isDeliverable
                      ? "text-green-600"
                      : "text-red-600"
                    : ""
                }`}
              >
                {form.pincode.length === 6 &&
                  (isDeliverable
                    ? "Great! Next-day delivery available in your area."
                    : "Sorry, we are currently available only in Delhi NCR.")}
              </span>
            </div>
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
          <div className="w-full flex flex-col gap-2">
            {!allowTodayOrders && (
              <p className="text-xs pl-2 text-stone-600 font-medium">
                *We have closed booking for today due to heavy demand.
              </p>
            )}

            <div className="relative w-full">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);

                  // Reset time slot if date changes
                  setForm((prev) => ({
                    ...prev,
                    timeSlot: "",
                  }));
                }}
                minDate={
                  allowTodayOrders
                    ? new Date()
                    : new Date(new Date().setDate(new Date().getDate() + 1))
                }
                dateFormat="dd MMMM, yyyy"
                placeholderText="Select Delivery Date"
                wrapperClassName="w-full"
                className="w-full p-4 pr-12 border rounded-md outline-none placeholder:text-stone-800 bg-white text-stone-800"
                calendarClassName="rounded-xl border shadow-xl"
                popperPlacement="bottom-start"
                showPopperArrow={false}
                fixedHeight
              />

              <i className="ri-calendar-line absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-lg"></i>
            </div>
          </div>

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
              <div className="absolute w-full mt-2 rounded-md border bg-white z-10 overflow-hidden">
                {availableTimeSlots.length > 0 ? (
                  availableTimeSlots.map((slot) => (
                    <div
                      key={slot.label}
                      onClick={() => {
                        setForm({
                          ...form,
                          timeSlot: slot.label,
                        });

                        setShowTime(false);
                      }}
                      className="p-4 border-b last:border-b-0 hover:bg-stone-50 cursor-pointer"
                    >
                      {slot.label}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-sm text-red-600">
                    No delivery slots available for today.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Referral Source */}
          <div className="relative">
            <div
              onClick={() => setShowReferral(!showReferral)}
              className="p-4 border rounded-md flex justify-between cursor-pointer"
            >
              {form.referral || "How did you hear about us?"}
              <i className="ri-arrow-down-s-line"></i>
            </div>

            {showReferral && (
              <div className="absolute w-full mt-2 rounded-md border bg-white z-10">
                {[
                  "Facebook",
                  "Instagram",
                  "Creator/Influencer",
                  "Google",
                  "Friend or Relative",
                  "Other",
                ].map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setForm({ ...form, referral: item });
                      setShowReferral(false);
                    }}
                    className="p-4 border-b hover:bg-pink-50 cursor-pointer"
                  >
                    {item}
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
            <label className="text-sm font-semibold">Voice Note</label>
            <div className="flex items-center justify-between gap-4">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="p-2 px-4 rounded-md xl:text-sm font-semibold flex items-center gap-2 text-stone-800 bg-stone-100"
                >
                  <i className="ri-mic-line text-lg"></i>
                  {audioBlob ? "Record Again" : "Record Voice"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="p-2 px-4 rounded-md font-semibold flex items-center gap-2 text-white bg-stone-800 animate-pulse"
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
            <p className="text-xs text-stone-800">
              Record a sweet message for the recipient!
            </p>
          </div>
        </div>
      </div>

      {/* Order */}
      <div className="w-full xl:w-[40%] flex flex-col gap-8">
        {/* ORDER SUMMARY */}
        <div className="border-t pt-4 flex flex-col gap-4">
          <h4 className="font-semibold text-xl">Order Summary</h4>

          <div className="flex flex-col gap-2">
            {/* Products */}
            <div className="flex flex-col gap-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="font-semibold">
                    {item.name} x {item.qty}
                  </span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="font-semibold">Discount</span>
                <span className="text-green-600">-₹{discount}</span>
              </div>
            )}

            {/* Shipping Charge */}
            <div className="flex justify-between">
              <span className="font-semibold">Delivery Charges</span>
              <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
            </div>

            {/* Midnight Delivery */}
            {midnightCharge > 0 && (
              <div className="flex justify-between">
                <span className="font-semibold">Midnight Delivery Charge</span>
                <span>₹{midnightCharge}</span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="flex justify-between font-semibold border-t pt-4">
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex flex-col xl:flex-row gap-2">
          <button
            onClick={() => handlePlaceOrder("ONLINE")} // Pass "Online"
            disabled={isProcessing}
            className={`w-full p-4 rounded-md font-semibold text-white transition-all ${
              isProcessing ? "bg-stone-600 cursor-not-allowed" : "bg-stone-800"
            }`}
          >
            {isProcessing ? "Processing Order..." : "Pay Online"}
          </button>
          <button
            onClick={() => handlePlaceOrder("COD")} // Pass "COD"
            disabled={isProcessing}
            className={`w-full p-4 rounded-md font-semibold border-2 border-r-4 border-b-4 border-stone-800 text-stone-800 transition-all ${
              isProcessing ? "cursor-not-allowed" : "bg-white"
            }`}
          >
            {isProcessing ? "Processing Order..." : "Cash on Delivery"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
