<template>
  <v-app>
    <v-navigation-drawer app>Navigation Lists</v-navigation-drawer>
    <v-app-bar color="primary" dark app>
      <v-toolbar-title>Vuetify</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer color="primary" dark app>Vuetify</v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
