import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

/* import Firebase */
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC2nu7GuWecfS2YVlTO1fa4QgDKG-NjDmk",
  authDomain: "otasuke-f5bf7.firebaseapp.com",
  projectId: "otasuke-f5bf7",
  storageBucket: "otasuke-f5bf7.appspot.com",
  messagingSenderId: "92203841168",
  appId: "1:92203841168:web:773cf9ccb8ce2cc2b74a15",
  measurementId: "G-R2Q36QYYPK",
};
firebase.initializeApp(firebaseConfig);

// new Vue({
//   render: h => h(App),
// }).$mount("#app");

loadFonts();

createApp(App).use(router).use(store).use(vuetify).mount("#app");
