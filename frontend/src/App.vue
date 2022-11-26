<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>
      Navigation Lists
    </v-navigation-drawer>
    <v-app-bar color="primary" dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>OTASUKE</v-toolbar-title>
      <v-space></v-space>
      <v-btn text>Button</v-btn>
    </v-app-bar>
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
