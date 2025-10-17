// Firebase client initialization
// Paste your Firebase web app credentials in the config object below.
// How to get these:
// 1) Go to Firebase Console > Project Settings > Your apps (Web)
// 2) Click "Config" to copy the keys and paste them here.
// 3) DO NOT commit real credentials to a public repository.

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// REPLACE all placeholder strings with your actual Firebase keys
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase and export Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


