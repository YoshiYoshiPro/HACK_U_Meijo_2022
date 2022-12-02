<template>
  <v-row justify="center" align="center" class="mt-6">
    <v-col cols="12">
      <div class="ma-1 ml-4 pa-3 grey lighten-4">
        <p class="title text-h4">ノート</p>
        <v-row class="ma-6 mr-8">
          <p class="title-text text-h6">右のボタンから記録をしましょう。</p>
          <v-btn color="green" dark class="ml-auto" @click="openModal"
            >記録
          </v-btn>
        </v-row>

        <v-row justify="center">
          <v-col cols="10">
            <v-select :items="genres" dense solo v-model="selectedGenre">
            </v-select>
          </v-col>
        </v-row>
        <div class="task grey lighten-4">
          <NotePage :notes="filteredNotes" />
        </div>
      </div>
    </v-col>
  </v-row>

  <div class="text-center">
    <v-dialog v-model="dialog" width="500" class="purple darken-2">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          ノートの追加
        </v-card-title>
        <v-row justify="center">
          <v-col cols="10">
            <v-select
              v-model="noteGenre"
              outlined
              class="genre-select"
              :items="genres"
            >
            </v-select>
          </v-col>
          <v-col cols="10">
            <v-text-field
              v-model="noteTitle"
              label="タイトル"
              class="mx-2"
            ></v-text-field>
          </v-col>
          <v-col cols="10">
            <v-text-field
              v-model="notePerson"
              label="投稿者"
              class="mx-2"
            ></v-text-field>
          </v-col>
          <v-col cols="10">
            <v-textarea
              v-model="noteDetail"
              label="内容"
              class="mx-2"
            ></v-textarea>
          </v-col>
          <v-col cols="10">
            <v-btn :disabled="noteTitle === ''" color="primary" @click="addBtn">
              追加
            </v-btn>
            <v-btn color="primary" class="mx-auto" @click="closeModal">
              閉じる
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import NotePage from "@/components/NoteList.vue";

export default {
  name: "NoteView",
  data() {
    return {
      notes: [
        {
          genre: "育児",
          title: "ノートタイトル",
          person: "投稿者",
          date: "??/??/??",
        },
        {
          genre: "育児",
          title: "ノートタイトル",
          person: "投稿者",
          date: "??/??/??",
        },
        {
          genre: "育児",
          title: "ノートタイトル",
          person: "投稿者",
          date: "??/??/??",
        },
        {
          genre: "育児",
          title: "ノートタイトル",
          person: "投稿者",
          date: "??/??/??",
        },
        {
          genre: "家事",
          title: "ノートタイトル",
          person: "投稿者",
          date: "??/??/??",
        },
        {
          genre: "家事",
          title: "ノートタイトル",
          person: "投稿者",
          date: "??/??/??",
        },
        {
          genre: "家事",
          title: "ノートタイトル",
          person: "投稿者",
          date: "??/??/??",
        },
        {
          genre: "家事",
          title: "ノートタイトル",
          person: "投稿者",
          date: "??/??/??",
        },
      ],
      genres: [
        "All",
        "家事",
        "育児",
        "ごはん",
        "トイレ",
        "睡眠",
        "お風呂",
        "体重",
        "体温",
      ],
      selectedGenre: "All",
      dialog: false,
      noteGenre: "",
      noteTitle: "",
      notePerson: "",
      noteDetail: "",
      noteDate: "",
    };
  },
  components: {
    NotePage,
  },
  computed: {
    filteredNotes: function () {
      if (this.selectedGenre === "All") {
        return this.notes;
      }
      return this.notes.filter((note) => note.genre === this.selectedGenre);
    },
  },
  methods: {
    addBtn: function () {
      this.notes.push({
        genre: this.noteGenre,
        title: this.noteTitle,
        person: this.notePerson,
        detail: this.noteDetail,
        date: new Date().toLocaleDateString(),
      });
      this.noteGenre = "";
      this.noteTitle = "";
      this.notePerson = "";
      (this.noteDetail = ""), (this.noteDate = "");
    },
    openModal: function () {
      this.dialog = true;
    },
    closeModal: function () {
      this.dialog = false;
    },
  },
};
</script>
