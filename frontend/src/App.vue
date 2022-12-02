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
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/men/81.jpg"
            title="山田太郎"
            subtitle="hogehoge@gmail.com"
          ></v-list-item>
        </template>

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
import { mapGetters } from "vuex";
import IndexLogin from "./components/IndexLogin.vue";

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
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
    }),
  },
  components: { IndexLogin },
};
</script>
