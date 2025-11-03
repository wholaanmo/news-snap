import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    addDoc, 
    doc, 
    deleteDoc, 
    updateDoc, 
    query, 
    orderBy, 
    Timestamp // Import Timestamp
} from "firebase/firestore";

// Firebase configuration 
const firebaseConfig = {
    apiKey: "AIzaSyCcwqseuLohaH4TjbZVavFL1KiHjCjBLlg",
    authDomain: "communitrade-a4527.firebaseapp.com",
    projectId: "communitrade-a4527",
    storageBucket: "communitrade-a4527.firebasestorage.app",
    messagingSenderId: "726620003639",
    appId: "1:726620003639:web:4c895f1acf03289ebf0eb2",
    measurementId: "G-T4XQJW8PYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export initialized Auth instance
export const db = getFirestore(app); // Export initialized Firestore instance

// Export all necessary functions for CRUD operations and configuration
export { 
    app, // Export the initialized app instance 
    collection, 
    getDocs, 
    addDoc, 
    doc, 
    deleteDoc, 
    updateDoc, 
    query, 
    orderBy,
    Timestamp 
};