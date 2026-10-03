import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDj16COkHc8w8BTZ5kdnaPmAl0RlBmrSt8',
  authDomain: 'exculisive-login.firebaseapp.com',
  projectId: 'exculisive-login',
  storageBucket: 'exculisive-login.firebasestorage.app',
  messagingSenderId: '889598720098',
  appId: '1:889598720098:web:956e2c58695edb9a76393b',
  measurementId: 'G-H7EYJYQGB6'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup, signOut };
export default app;
