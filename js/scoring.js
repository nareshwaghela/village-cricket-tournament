// firebase-config.js - Firebase Configuration
// ⚠️ IMPORTANT: Replace with your Firebase project credentials

const firebaseConfig = {
    // TODO: Replace these values with your Firebase project config
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID_HERE",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID_HERE",
    appId: "YOUR_APP_ID_HERE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Enable offline persistence (optional)
db.enablePersistence()
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            console.warn('Firestore persistence failed: Multiple tabs open');
        } else if (err.code == 'unimplemented') {
            console.warn('Firestore persistence not available in this browser');
        }
    });

console.log('🔥 Firebase Initialized Successfully');

// Export for use in other files
window.firebaseDB = db;
window.firebaseConfig = firebaseConfig;
