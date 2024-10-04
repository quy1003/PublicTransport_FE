// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA7-mbNqkW2bJ6phd3gL-5SI_aQcY5C-4A",
  authDomain: "chatappv2-22ba0.firebaseapp.com",
  databaseURL: "https://chatappv2-22ba0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatappv2-22ba0",
  storageBucket: "chatappv2-22ba0.appspot.com",
  messagingSenderId: "611447569425",
  appId: "1:611447569425:web:d6dfd0aa7ab72560ca85b0"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Cấu hình cơ sở dữ liệu

export { db };
