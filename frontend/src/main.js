import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./firebase-config.js";

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
createApp(App).use(store).use(router).mount("#app");
