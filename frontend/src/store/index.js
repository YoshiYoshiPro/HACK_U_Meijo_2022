import { createStore } from "vuex";
// import { firebaseApp } from "../main.js";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
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
    userEmail: "",
  },
  getters: {
    getUserUid(state) {
      return state.userUid;
    },
    getUserName(state) {
      return state.userName;
    },
    isLoggedIn(state) {
      return !!state.userUid;
    },
    getUserPhoto(state) {
      return state.userPhoto;
    },
    getUserEmail(state) {
      return state.userEmail;
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
    setUserEmail(state, userEmail) {
      state.userEmail = userEmail;
    },
  },
  actions: {
    // Google
    loginGoogle({ commit }) {
      console.log("login google");
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      // Google認証
      signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log("success : " + user.uid + " : " + user.displayName);
        commit("setUserUid", user.uid);
        commit("setUserName", user.displayName);
        commit("setUserPhoto", user.photoURL);
        commit("setUserEmail", user.email);
        console.log(user);
        localStorage.name = user.displayName;
        localStorage.uuid = user.uid;
        localStorage.photo = user.photoURL;
        localStorage.email = user.email;
        router.push("/");
        const docRef = doc(db, "users", user.email);
        setDoc(docRef, {
          name: user.displayName,
          uuid: user.uid,
          photo: user.photoURL,
        });
      });
    },

    // 匿名認証
    loginAnonymous({ commit }) {
      console.log("login anonymous");
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        // 未ログイン時
        if (!user) {
          // 匿名認証
          signInAnonymously(auth).then(() => {
            onAuthStateChanged(auth, (anonymous) => {
              console.log(anonymous);
              commit("setUserUid", anonymous.uid);
              commit("setUserName", "Anonymous");
              commit("setUserPhoto", "");
              localStorage.name = "ゲスト";
              localStorage.uuid = anonymous.uid;
              localStorage.photo = "";
              localStorage.email = "";
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

    // ログアウト
    logout({ commit }) {
      console.log("logout action");
      const auth = getAuth();
      // ログアウト実行
      signOut(auth)
        .then(() => {
          console.log("Sign-out successful.");
          commit("setUserUid", "");
          commit("setUserName", "");
          commit("setUserPhoto", "");
          commit("setUserEmail", "");
          console.log(getAuth().currentUser);
          localStorage.name = "";
          localStorage.uuid = "";
          localStorage.photo = "";
          localStorage.email = "";
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  modules: {},
});
