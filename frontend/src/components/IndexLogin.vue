<template>
  <div>
    <div id="loginBox">
      <v-btn @click="signIn">Googleでログイン</v-btn>
      <v-btn @click="loginAnonymous">匿名でログイン</v-btn>
    </div>
    <v-btn @click="logout" id="logoutBtn">ログアウト</v-btn>
  </div>
  <!-- <div class="links">
    <button @click="signIn" class="button--green">sign</button>
  </div> -->
</template>

<script>
// script タグ内を抜粋
// import firebase from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export default {
  methods: {
    signIn: function () {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider);
    },
  },
};
</script>
