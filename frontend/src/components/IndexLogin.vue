<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="400"
        />
      </v-col>

      <v-col class="mb-4">
        <h3 class="mb-3">現代版おばあちゃんの知恵袋SNS</h3>

        <h1 class="display-2 font-weight-bold mb-3">OTASUKE</h1>

        <p class="subheading font-weight-regular mb-8">
          家事・育児支援WEBアプリケーション
          <br />
        </p>
      </v-col>
    </v-row>
    <div id="loginBox">
      <v-row justify="center">
        <v-btn
          height="40"
          width="200"
          prepend-icon="mdi-google"
          style="text-transform: none"
          elevation="4"
          @click="signIn()"
        >
          Googleでログイン
        </v-btn>
      </v-row>
      <br />
      <br />
      <v-row justify="center">
        <v-btn
          height="40"
          width="200"
          prepend-icon="mdi-incognito"
          color="orange"
          elevation="4"
          @click="signInAnonymous"
        >
          匿名でログイン
        </v-btn>
      </v-row>
    </div>

    <!-- <v-btn @click="signOut" id="logoutBtn">ログアウト</v-btn> -->
  </v-container>
  <!-- <div class="links">
    <button @click="signIn" class="button--green">sign</button>
  </div> -->
</template>

<script>
// script タグ内を抜粋
// import firebase from "firebase/app";
// import {
//   GoogleAuthProvider,
//   getAuth,
//   signInWithPopup,
//   // onAuthStateChanged,
//   signInAnonymously,
//   signOut,
// } from "firebase/auth";
import store from "../store";

export default {
  computed: {},
  methods: {
    signIn: function () {
      store.dispatch("loginGoogle").then(() => {
        console.log("google login");
      });
      // const provider = new GoogleAuthProvider();
      // const auth = getAuth();
      // console.log(auth.currentUser);
      // signInWithPopup(auth, provider).then((result) => {
      //   const user = result.user;
      //   console.log(user);
      //   console.log(getAuth().currentUser);
      // });
    },
    signInAnonymous: function () {
      console.log("login anonymous");
      store.dispatch("loginAnonymous").then(() => {
        console.log("anonymous login");
      });
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
      // if (auth.currentUser == null) {
      //   signInAnonymously(auth).then(() => {
      //     console.log(getAuth().currentUser);
      //   });
      // }
    },
    signOut: function () {
      store.dispatch("logout");
      // const auth = getAuth();
      // signOut(auth)
      //   .then(() => {
      //     console.log("Sign-out successful.");
      //     console.log(getAuth().currentUser);
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });
    },
  },
};
</script>
