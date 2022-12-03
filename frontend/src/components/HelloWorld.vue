<template>
  <v-container justify="center">
    <v-row justify="center" align="center" class="mt-6">
      <v-col cols="12">
        <video controls ref="previewVideo" class="video">
          <source :src="require('../assets/1.mp4')" type="video/mp4" />
        </video>
      </v-col>
      <v-col cols="12">
        <video controls ref="previewVideo" class="video">
          <source :src="require('../assets/2.mp4')" type="video/mp4" />
        </video>
      </v-col>
      <v-col cols="12">
        <video controls ref="previewVideo" class="video">
          <source :src="require('../assets/3.mp4')" type="video/mp4" />
        </video>
      </v-col>
      <v-col cols="12">
        <video controls ref="previewVideo" class="video">
          <source :src="require('../assets/4.mp4')" type="video/mp4" />
        </video>
      </v-col>
      <v-col cols="12">
        <video controls ref="previewVideo" class="video">
          <source :src="require('../assets/5.mp4')" type="video/mp4" />
        </video>
      </v-col>
      <v-col cols="12">
        <video controls ref="previewVideo" class="video">
          <source :src="require('../assets/6.mp4')" type="video/mp4" />
        </video>
      </v-col>
      <v-col cols="12">
        <video controls ref="previewVideo" class="video">
          <source :src="require('../assets/7.mp4')" type="video/mp4" />
        </video>
      </v-col>
      <v-col cols="12">
        <video controls ref="previewVideo" class="video">
          <source :src="require('../assets/8.mp4')" type="video/mp4" />
        </video>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    // src: require("../assets/game.mp4"),
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader/tree/next",
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify/tree/next",
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify",
      },
    ],
    importantLinks: [
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com",
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify",
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs",
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify",
      },
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com",
      },
      {
        text: "Roadmap",
        href: "https://vuetifyjs.com/introduction/roadmap/",
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
    ],
  }),
  //   created:{
  //     function(){
  //       handleFileSelect(event) {
  //   // ファイルのチェック
  //   const file = event.target.files[0]
  //   if (!file || !file.type.match('video/*')) return

  //   // ファイルの読み込み
  //   const reader = new FileReader()
  //   reader.onload = (evt) => {
  //     this.src = evt.target.result
  //     this.createThumbnails(this.src)
  //   }
  //   reader.readAsDataURL(file)
  // }
  //     }
  //   }
};
</script>
<style>
.video {
  padding: 0;
  margin: 0;
  width: 400px;
  height: 400px;
  align-content: center;
  margin: auto;
}
</style>
