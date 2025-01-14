// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './router';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkYXqZSYCZq1N6pzr60GWkG5nS3f_EELA",
  authDomain: "metroniq-bdde0.firebaseapp.com",
  projectId: "metroniq-bdde0",
  storageBucket: "metroniq-bdde0.firebasestorage.app",
  messagingSenderId: "765262722554",
  appId: "1:765262722554:web:613754030c0bbbc52fe043",
  measurementId: "G-6JKPXTKRP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

reportWebVitals();