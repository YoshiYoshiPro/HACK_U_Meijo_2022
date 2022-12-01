import { createStore } from "vuex";
// import { firebaseApp } from "../main.js";
// import * as firebaseApp from "firebase/auth";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signOut,
} from "firebase/auth";
import router from "../router";

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
    loginGoogle({ commit }) {
      console.log("login google");
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log("success : " + user.uid + " : " + user.displayName);
        commit("setUserUid", user.uid);
        commit("setUserName", user.displayName);
        commit("setUserPhoto", user.photoURL);
        console.log(user);
        router.push("/");
      });
    },
    loginAnonymous({ commit }) {
      console.log("login anonymous");
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        // 未ログイン時
        if (!user) {
          signInAnonymously(auth).then(() => {
            onAuthStateChanged(auth, (anonymous) => {
              console.log(anonymous);
              commit("setUserUid", anonymous.uid);
              router.push("/");
            });
          });
        }
        // ログイン時
        else {
          // TODO: ログインしているときにやる処理...
          console.log(user);
        }
      });
    },
    logout({ commit }) {
      console.log("logout action");
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("Sign-out successful.");
          commit("setUserUid", "");
          commit("setUserName", "");
          commit("setUserPhoto", "");
          console.log(getAuth().currentUser);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  modules: {},
});
