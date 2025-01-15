import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkYXqZSYCZq1N6pzr60GWkG5nS3f_EELA",
  authDomain: "metroniq-bdde0.firebaseapp.com",
  projectId: "metroniq-bdde0",
  storageBucket: "metroniq-bdde0.firebasestorage.app",
  messagingSenderId: "765262722554",
  appId: "1:765262722554:web:613754030c0bbbc52fe043",
  measurementId: "G-6JKPXTKRP8"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const firestore = getFirestore(app);
