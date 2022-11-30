import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

/* import Firebase */
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyC2nu7GuWecfS2YVlTO1fa4QgDKG-NjDmk",
  authDomain: "otasuke-f5bf7.firebaseapp.com",
  projectId: "otasuke-f5bf7",
  storageBucket: "otasuke-f5bf7.appspot.com",
  messagingSenderId: "92203841168",
  appId: "1:92203841168:web:773cf9ccb8ce2cc2b74a15",
  measurementId: "G-R2Q36QYYPK",
};
const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);

export default firebaseApp;
// firebase.initializeApp(config);

// export const firestore = firebase.firestore();

// export default firebase;
// // Use this to initialize the firebase App
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// // Use these for db & auth
// const db = firebaseApp.firestore();
// const auth = firebase.auth();

// export { auth, db };

// new Vue({
//   render: h => h(App),
// }).$mount("#app");

loadFonts();

createApp(App).use(router).use(store).use(vuetify).mount("#app");
