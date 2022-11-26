<template>
  <v-app>
    <v-app-bar color="primary" dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>OTASUKE</v-toolbar-title>
      <v-space></v-space>
      <v-toolbar-items>
        <v-btn text>投稿</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" clipped>
      Navigation Lists
    </v-navigation-drawer>
    <!-- <v-main>
      <router-view />
    </v-main> -->
    <v-footer color="primary" dark app>OTASUKE</v-footer>
  </v-app>
</template>

<script>
export default {
  // name: "App",

  data() {
    return {
      drawer: null,
    };
  },
};
</script>
