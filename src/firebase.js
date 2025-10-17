// Firebase client initialization
// Paste your Firebase web app credentials in the config object below.
// How to get these:
// 1) Go to Firebase Console > Project Settings > Your apps (Web)
// 2) Click "Config" to copy the keys and paste them here.
// 3) DO NOT commit real credentials to a public repository.

import { initializeApp } from 'firebase/app';
import { initializeFirestore, setLogLevel } from 'firebase/firestore';

// REPLACE all placeholder strings with your actual Firebase keys
const firebaseConfig = {
    apiKey: "AIzaSyA9OdApM_qwjq25vjy1An7bP9v0zWSuE2I",
    authDomain: "tribute-prof.firebaseapp.com",
    projectId: "tribute-prof",
    storageBucket: "tribute-prof.firebasestorage.app",
    messagingSenderId: "514177885691",
    appId: "1:514177885691:web:41959e9e003c494067575e",
    measurementId: "G-PCN1WK8XF6"
};

// Initialize Firebase and export Firestore
const app = initializeApp(firebaseConfig);

// Use long polling automatically if needed (fixes some network/proxy environments)
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

// Verbose Firestore logs in dev to surface exact errors in the console
if (import.meta && import.meta.env && import.meta.env.DEV) {
  setLogLevel('debug');
}


