import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC5UNPqs1zXwkgn52JGXioJKWLl8obqSbU",
    authDomain: "mygame-d0898.firebaseapp.com",
    projectId: "mygame-d0898",
    storageBucket: "mygame-d0898.appspot.com",
    messagingSenderId: "80289685285",
    appId: "1:80289685285:web:e9269d1993d14208bb84cc",
    measurementId: "G-BD0XCN33R6"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
