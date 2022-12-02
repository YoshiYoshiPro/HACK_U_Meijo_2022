<template>
  <v-app>
    <span v-if="isLoggedIn">
      <v-app-bar color="primary" dark app clipped-left>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>OTASUKE</v-toolbar-title>
        <v-toolbar-items>
          <v-select
            chips
            label="投稿"
            :items="tags"
            multiple
            hint="タグを選択してください"
            persistent-hint
            variant="underlined"
          ></v-select>
        </v-toolbar-items>
      </v-app-bar>

      <v-navigation-drawer app v-model="drawer" clipped>
        <!-- <span v-if="userPhoto === ''">
          <img :src="this.guestPhoto" />
        </span> -->
        <template v-slot:prepend>
          <v-list-item
            ines="two"
            :prepend-avatar="userPhoto"
            :title="userName"
            :subtitle="userEmail"
          ></v-list-item>
          <v-btn @click="signOut" class="ml-10" color="orange"
            >ログアウト</v-btn
          >
        </template>

        <!-- <v-list-item-content>
              <v-list-item-avatar
                ><v-img :src="userPhoto"></v-img
              ></v-list-item-avatar>
              <v-list-item-title>{{ userName }}</v-list-item-title>
              <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
            </v-list-item-content> -->

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home"
            title="ホーム"
            value="home"
            flat
            to="/"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-check-bold"
            title="タスク"
            value="task"
            flat
            to="/task"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-note"
            title="ノート"
            value="note"
            to="/note"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-calendar"
            title="イベント"
            value="event"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-gamepad-variant"
            title="ゲーム"
            value="game"
            flat
            to="/game"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-gamepad-variant"
            title="ログイン"
            value="login"
            flat
            to="/login"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view />
      </v-main>
    </span>

    <span v-else>
      <IndexLogin />
    </span>
  </v-app>
</template>

<script>
// import { mapGetters, storeKey } from "vuex";
import IndexLogin from "./components/IndexLogin.vue";
import store from "./store";

export default {
  name: "App",
  data() {
    return {
      items: [
        { title: "ホーム", icon: "mdi-home" },
        { title: "タスク", icon: "mdi-check-bold" },
        { title: "ノート", icon: "mdi-note" },
        { title: "イベント", icon: "mdi-calendar" },
        { title: "ゲーム", icon: "mdi-gamepad-variant" },
      ],
      tags: ["家事", "育児"],
      drawer: null,
      guestPhoto: "./assets/human.png",
    };
  },
  computed: {
    userName: function () {
      return store.getters["getUserName"];
    },
    userEmail: function () {
      return store.getters["getUserEmail"];
    },
    isLoggedIn: function () {
      return store.getters["isLoggedIn"];
    },
    userPhoto: function () {
      console.log(store.getters["getUserPhoto"]);
      return store.getters["getUserPhoto"];
    },
  },
  methods: {
    signOut: function () {
      store.dispatch("logout");
    },
  },
  components: { IndexLogin },
  // created: {
  //   function() {
  //     this.userName = store.getters["getUserName"];
  //   },
  // },
};
</script>
