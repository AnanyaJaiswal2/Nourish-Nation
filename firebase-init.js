import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBYDQbOvU-k7c2_4H6U8_i4WGzJGvEBUBc",
  authDomain: "sexy-fad4f.firebaseapp.com",
  databaseURL: "https://sexy-fad4f.firebaseio.com", // Make sure this is correct
  projectId: "sexy-fad4f",
  storageBucket: "sexy-fad4f.appspot.com",
  messagingSenderId: "1027119287374",
  appId: "1:1027119287374:web:14b6c186b0b99f8c5d071f"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

import { ref, set } from "firebase/database";

// Add a new donation
function addDonation(foodType, quantity) {
  const donationRef = ref(database, 'donations/' + Date.now());
  set(donationRef, {
    foodType: foodType,
    quantity: quantity,
    donorId: auth.currentUser.uid,
    timestamp: Date.now()
  });
}

import { ref, onValue } from "firebase/database";

// Read donations
function loadDonations() {
  const donationsRef = ref(database, 'donations');
  onValue(donationsRef, (snapshot) => {
    const data = snapshot.val();
    console.log("All donations:", data);
  });
}

// Real-time updates
onValue(ref(database, 'donations'), (snapshot) => {
    updateUI(snapshot.val());
  });

// Test connection
set(ref(database, 'connection_test'), { timestamp: Date.now() })
  .then(() => console.log("Connected!"))
  .catch((error) => console.error("Connection failed:", error));