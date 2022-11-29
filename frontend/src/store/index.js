import { createStore } from "vuex";
// import { firebaseApp } from "../main.js";
// import * as firebaseApp from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default createStore({
  state: {
    userUid: "",
    userName: "",
    userPhoto: "",
  },
  getters: {
    getUserUid(state) {
      return state.userUid;
    },
    getUserName(state) {
      return state.userName;
    },
    isLoggedIn(state) {
      return !!state.userName;
    },
    getUserPhoto(state) {
      return state.userPhoto;
    },
  },
  mutations: {
    setUserUid(state, userUid) {
      state.userUid = userUid;
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    setUserPhoto(state, userPhoto) {
      state.userPhoto = userPhoto;
    },
  },
  actions: {
    login({ commit }) {
      console.log("login action");
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log("success : " + user.uid + " : " + user.displayName);
        commit("setUserUid", user.uid);
        commit("setUserName", user.displayName);
        commit("setUserPhoto", user.photoURL);
        console.log(user);
        localStorage.name = user.displayName;
        localStorage.uuid = user.uid;
        localStorage.photo = user.photoURL;
        console.log(localStorage);
      });
    },
    logout({ commit }) {
      console.log("logout action");
      // firebaseApp.auth.signOut();
      commit("setUserUid", "");
      commit("setUserName", "");
      commit("setUserPhoto", "");
    },
  },
  modules: {},
});
