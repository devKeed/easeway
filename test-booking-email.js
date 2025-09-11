// Test script to verify booking email functionality
const fetch = require("node-fetch");

const testBookingData = {
  name: "Test Patient Production Email",
  email: "testpatient@example.com",
  phone: "+44 7460 091561",
  service: "Comprehensive Assessment",
  serviceCategory: "clinic",
  date: "2025-09-15",
  time: "10:00",
  sessionType: "new",
  sessionDuration: 30,
  message:
    "Testing email delivery to production admin email address: easeway.physiotherapy@easewaymedicare.co.uk",
  emergencyContact: "+44 7460 091562",
  medicalHistory: "Testing medical history field",
  currentMedications: "None for testing",
  previousPhysiotherapy: "No previous physiotherapy",
};

console.log("🧪 TESTING BOOKING EMAIL DELIVERY TO PRODUCTION ADMIN");
console.log("====================================================");
console.log("");
console.log(
  "📧 Target Admin Email: easeway.physiotherapy@easewaymedicare.co.uk"
);
console.log("📝 Test Booking Data:");
console.log(JSON.stringify(testBookingData, null, 2));
console.log("");
console.log("🚀 Submitting test booking...");

fetch("http://localhost:3001/api/bookings/public", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(testBookingData),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("✅ Booking API Response:");
    console.log(JSON.stringify(data, null, 2));

    if (data.success) {
      console.log("");
      console.log("🎉 SUCCESS! Booking created successfully");
      console.log(
        `📧 Admin notification should be sent to: easeway.physiotherapy@easewaymedicare.co.uk`
      );
      console.log(
        `📧 Patient confirmation should be sent to: ${testBookingData.email}`
      );
      console.log(`🔢 Confirmation Number: ${data.booking.confirmationNumber}`);
      console.log("");
      console.log("⚠️ NOTE: Check the terminal output for email delivery logs");
    } else {
      console.log("❌ FAILED: Booking creation failed");
      console.log("Error:", data.error);
    }
  })
  .catch((error) => {
    console.error("❌ ERROR: Failed to connect to API");
    console.error(error.message);
    console.log("");
    console.log("💡 Make sure the development server is running:");
    console.log("   npm run dev");
  });
