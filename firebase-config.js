
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const firebaseConfig = {
        apiKey: "AIzaSyC7PhfZwbP7QcZO8vCKwSQuuTjKt7Br4OQ",
        authDomain: "playmax-6bc40.firebaseapp.com",
        databaseURL: "https://playmax-6bc40-default-rtdb.firebaseio.com",
        projectId: "playmax-6bc40",
        storageBucket: "playmax-6bc40.firebasestorage.app",
        messagingSenderId: "972267905771",
        appId: "1:972267905771:web:485787c59922ce951094ae",
        measurementId: "G-GMYC8DCLTF"
    };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);


export { db, ref, set, auth };
