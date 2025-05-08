import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBZG6zYJuXuiKrjMQf5uQeZrpc1ZNSHyDo",
    authDomain: "project001-1aeaf.firebaseapp.com",
    projectId: "project001-1aeaf",
    storageBucket: "project001-1aeaf.firebasestorage.app",
    messagingSenderId: "283417338190",
    appId: "1:283417338190:web:c6ffef2fc7bad2e45e7e1f"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

document.addEventListener("DOMContentLoaded", () => {
    const guestLinks = document.querySelectorAll(".guest-links");
    const userNoProfileEl = document.querySelector(".user-no-profile");
    const userWithProfileEl = document.querySelector(".user-with-profile");
    const navUsernameEl = document.querySelector(".nav-username");
    const navAvatarEl = document.querySelector(".nav-avatar");

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Hide guest nav
            guestLinks.forEach((link) => (link.style.display = "none"));

            const userDocRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                const avatarSrc = data.Avatar || "../../assests/profile_creation/avatarboy.png"; // fallback

                // show user with profile
                userWithProfileEl.style.display = "flex";
                userNoProfileEl.style.display = "none";
                if (navUsernameEl) navUsernameEl.textContent = data.UserName || "User";
                if (navAvatarEl) navAvatarEl.src = avatarSrc;
            } else {
                // no profile yet
                userWithProfileEl.style.display = "none";
                userNoProfileEl.style.display = "flex";
            }
        } else {
            // Not logged in
            guestLinks.forEach((link) => (link.style.display = "block"));
            userWithProfileEl.style.display = "none";
            userNoProfileEl.style.display = "none";
        }
    });
});
