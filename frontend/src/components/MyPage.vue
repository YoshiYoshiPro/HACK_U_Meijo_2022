<template>
  <div>
    <button @click="login" id="loginBtn">ログイン</button>
    <button @click="logout" id="logoutBtn">ログアウト</button>
  </div>
  <!-- <div id="loggedInBtn">
    <span v-if="isLoggedIn">
      <v-btn color="blue-grey" class="white--text">
        <v-icon> mdi-account </v-icon>
      </v-btn>
    </span>
    <span v-else>
      <v-btn color="blue-grey" class="white--text" @click="login">
        <v-icon left> mdi-login </v-icon>
        <span> Login </span>
      </v-btn>
    </span>
  </div>

  <div id="myPage">
    <v-row justify="center">
      <v-col cols="12" align="center">
        <img :src="userPhoto" />
      </v-col>

      <v-col cols="12" align="center">
        <div class="text-h3">{{ userName }}</div>
      </v-col>
      <v-col cols="12" align="center">
        <div>
          <v-btn color="orange" class="white--text" @click="logout">
            <v-icon> mdi-logout-variant </v-icon>
            <v-list-item-title> ログアウト </v-list-item-title>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div> -->
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "MyPage",
  computed: {
    ...mapGetters({
      isLoggedIn: "index/isLoggedIn",
    }),
  },
  created: function () {
    this.userName = this.$store.getters["index/getUserName"];
    this.userPhoto = this.$store.getters["index/getUserPhoto"];
  },
  methods: {
    login() {
      this.$store.dispatch("login").then(() => {
        // console.log(this.$route.name)
        if (this.$route.name === "projects") {
          // console.log(this.$route.name)
          this.$router.push("/");
        }
      });
    },
    logout: function () {
      localStorage.removeItem("name");
      localStorage.removeItem("uuid");
      localStorage.removeItem("photo");
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>
<style>
#loginBtn {
  background-color: blue;
}
#logoutBtn {
  background-color: blue;
}
</style>
