<template>
  <div>
    <div id="loginBox">
      <v-btn @click="signIn">Googleでログイン</v-btn>
      <button @click="loginAnonymous">匿名でログイン</button>
    </div>
    <button @click="logout" id="logoutBtn">ログアウト</button>
  </div>
  <!-- <div class="links">
    <button @click="signIn" class="button--green">sign</button>
  </div> -->
</template>

<script>
// script タグ内を抜粋
import firebase from "firebase/auth";

export default {
  methods: {
    signIn: function () {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
  },
};
</script>
