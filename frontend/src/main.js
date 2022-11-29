import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./firebase-config.js";

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;

loadFonts();

createApp(App).use(router).use(store).use(vuetify).mount("#app");
