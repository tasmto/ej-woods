// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBqr84FV0CJPT1bWXNXT6J1RYn9ghWMbgM',
  authDomain: 'ej-woods.firebaseapp.com',
  projectId: 'ej-woods',
  storageBucket: 'ej-woods.appspot.com',
  messagingSenderId: '837468106572',
  appId: '1:837468106572:web:2d42d71c5f41329b01e9e9',
  measurementId: 'G-6T6H7DW4TR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
