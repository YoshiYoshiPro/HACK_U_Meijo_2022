<template>
  <div>
    <div id="loginBox">
      <v-btn @click="signIn">Googleでログイン</v-btn>
      <v-btn @click="signInAnonymous">匿名でログイン</v-btn>
    </div>
    <v-btn @click="signOut" id="logoutBtn">ログアウト</v-btn>
  </div>
  <!-- <div class="links">
    <button @click="signIn" class="button--green">sign</button>
  </div> -->
</template>

<script>
// script タグ内を抜粋
// import firebase from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  // onAuthStateChanged,
  signInAnonymously,
  signOut,
} from "firebase/auth";

export default {
  methods: {
    signIn: function () {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      console.log(auth.currentUser);
      signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);
        console.log(getAuth().currentUser);
      });
    },
    signInAnonymous: function () {
      console.log("login anonymous");
      const auth = getAuth();
      // 下記では、ログアウト後に自動的に匿名ログインするようになっている
      // onAuthStateChanged(auth, (user) => {
      //   // 未ログイン時
      //   if (!user) {
      //     signInAnonymously(auth).then(() => {
      //       console.log(getAuth().currentUser);
      //     });
      //   }
      // });

      // 下記では、ログアウト後の自動匿名ログインは行われない、ボタンでのみログインされる
      if (auth.currentUser == null) {
        signInAnonymously(auth).then(() => {
          console.log(getAuth().currentUser);
        });
      }
    },
    signOut: function () {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("Sign-out successful.");
          console.log(getAuth().currentUser);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>
