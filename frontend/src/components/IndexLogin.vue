<template>
  <div class="links">
    <a @click="signIn" class="button--green">signIn</a>
  </div>
</template>

<script>
// script タグ内を抜粋
import firebase from "firebase/app";

export default {
  methods: {
    signIn: function () {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
  },
};
</script>
