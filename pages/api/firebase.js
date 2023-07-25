// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyAxXXMN7hbqRxFdKg59I_13ijJiNPQMj5o',
   authDomain: 'gis-map-2a426.firebaseapp.com',
   projectId: 'gis-map-2a426',
   storageBucket: 'gis-map-2a426.appspot.com',
   messagingSenderId: '838398837021',
   appId: '1:838398837021:web:d331e294e3c59ad85661f4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
