const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("../config/serviceAccountKey.json"); // Ensure this path is correct

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://metroniq-bdde0.firebaseio.com", // Updated with your actual database URL
  });
  console.log("Firebase Admin SDK initialized.");
} catch (error) {
  console.error("Error initializing Firebase Admin SDK: ", error);
}

const db = admin.firestore();

// Check Firestore connection
db.collection("test").get()
  .then(() => {
    console.log("Connected to Firestore successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to Firestore: ", error);
  });

// Example data to populate the database
const userId = "12345ABC";
const userData = {
  address: "123 Elm Street, NY",
  consumerId: userId,
  createdAt: "2025-01-01T10:00:00Z",
  email: "user@example.com",
  mobileNumber: "+1234567890",
  name: "John Doe",
  finalBill: 150.75,
  notificationPreferences: {
    lowBalance: true,
    highUsage: false,
  },
  deviceControlEnabled: true,
  tariffRate: {
    ratePerKWh: 0.15,
    currency: "USD",
  },
  appliances: {
    A1: {
      applianceName: "AC",
      powerRating: 2000,
      status: "ON",
      connectedAt: "2025-01-01T12:00:00Z",
      usageThreshold: 500,
    },
    A2: {
      applianceName: "Fridge",
      powerRating: 150,
      status: "OFF",
      connectedAt: "2025-01-02T08:00:00Z",
      usageThreshold: 300,
    },
  },
  liveUsage: {
    U1: {
      applianceId: "A1",
      applianceName: "AC",
      usage: 2.5,
      status: "ON",
      timestamp: "2025-01-10T14:30:00Z",
    },
    U2: {
      applianceId: "A2",
      applianceName: "Fridge",
      usage: 1.2,
      status: "OFF",
      timestamp: "2025-01-10T14:30:00Z",
    },
  },
  usageHistory: {
    H1: {
      applianceId: "A1",
      applianceName: "AC",
      interval: "hourly",
      usage: 5.0,
      timestamp: "2025-01-09T15:00:00Z",
    },
    H2: {
      applianceId: "A2",
      applianceName: "Fridge",
      interval: "hourly",
      usage: 2.0,
      timestamp: "2025-01-09T15:00:00Z",
    },
  },
  bills: {
    "2025-01": {
      calculatedBill: 120.5,
      finalBill: 120.5,
      generatedAt: "2025-01-10T12:00:00Z",
      totalUsage: 800.0,
    },
    "2024-12": {
      calculatedBill: 100.0,
      finalBill: 100.0,
      generatedAt: "2024-12-31T12:00:00Z",
      totalUsage: 750.0,
    },
  },
  alerts: {
    AL1: {
      alertType: "highUsage",
      message: "Your AC usage is unusually high!",
      timestamp: "2025-01-10T16:00:00Z",
      isRead: false,
    },
    AL2: {
      alertType: "lowBalance",
      message: "Your balance is below $20.",
      timestamp: "2025-01-10T17:00:00Z",
      isRead: true,
    },
  },
};

// Create or overwrite the user's data in Firestore
function createUserData() {
  console.log("createUserData function called.");
  db.collection("users")
    .doc(userId)
    .set(userData)
    .then(() => {
      console.log("User data added successfully!");
    })
    .catch((error) => {
      console.error("Error adding user data: ", error);
    });
}

createUserData();