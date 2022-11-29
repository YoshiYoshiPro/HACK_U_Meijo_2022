import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue from "vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

createApp(App).use(router).use(store).use(vuetify).mount("#app");

// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";

import firebase from "firebase";

Vue.config.productionTip = false;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

new Vue({
  vuetify,
  router, // router を使う
  render: (h) => h(App),
}).$mount("#app");
