import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAKffEAxpYDzK4rjEzelGN9m9Le5HUuXQQ",
    authDomain: "am-project-4d7de.firebaseapp.com",
    projectId: "am-project-4d7de",
    storageBucket: "am-project-4d7de.appspot.com",
    messagingSenderId: "906257899428",
    appId: "1:906257899428:web:6621108fa7e3214814ab31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;