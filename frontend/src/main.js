import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2nu7GuWecfS2YVlTO1fa4QgDKG-NjDmk",
  authDomain: "otasuke-f5bf7.firebaseapp.com",
  projectId: "otasuke-f5bf7",
  storageBucket: "otasuke-f5bf7.appspot.com",
  messagingSenderId: "92203841168",
  appId: "1:92203841168:web:773cf9ccb8ce2cc2b74a15",
  measurementId: "G-R2Q36QYYPK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
auth.languageCode = "it";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
// provider.setCustomParameters({
//   'login_hint": "user@example.com'
// });

// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

export default { app, auth };

loadFonts();
createApp(App).use(router).use(store).use(vuetify).mount("#app");
