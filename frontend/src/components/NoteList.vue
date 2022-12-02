<template>
  <v-container>
    <v-row justify="start" align="center">
      <v-col cols="12" sm="4" v-for="(note, i) in notes" :key="i" class="mt-1">
        <v-card elevation="2" shaped>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">{{
                note.title
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ note.genre }}</v-list-item-subtitle>
              <v-list-item-subtitle>
                投稿者：{{ note.person }}</v-list-item-subtitle
              >
              <v-list-item-subtitle> {{ note.date }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <!-- <main class="main">
      <section class="section-wrap">
        <div class="section-inner"> -->
    <!--ここに記録-->
    <!--ここにテキストボックスから入力された日付ジャンルを表示-->
    <!-- {%- for i in range(date_array|length) %}
          <div class="content-wrap">
            <label for="label1">{{ date_array }}</label>
            <input type="checkbox" id="label1" class="switch" />
            <div class="content">
              <p>{{ genre_array[i] }}</p>
              <p>{{ contents_array[i] }}</p>
            </div>
          </div>
          {%- endfor %}
        </div>
      </section>
      <form action="/" method="POST" enctype="multipart/form-data">
        <section class="section-modal">
          <div id="div-modal" class="modal">
            <div class="modal-content">
              <div class="modal-header">
                <h1>記録</h1>
                <span class="modal-close">x</span>
              </div>
              <div>
                <select class="genre-select">
                  <option value="">ジャンルを選択してください。</option>
                  <option value="genre1">ごはん</option>
                  <option value="genre2">トイレ</option>
                  <option value="genre3">睡眠</option>
                  <option value="genre4">お風呂</option>
                  <option value="genre5">体重</option>
                  <option value="genre6">体温</option>
                </select>
              </div>
              <div class="modal-body">
                <input type="datetime-local" class="input-time" />
                <p>
                  内容を入力してください。<br />
                  <textarea
                    class="input-text"
                    placeholder="ここに入力"
                  ></textarea
                  ><br />
                </p>
                <button id="record-button" class="record-btn">記録</button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </main> -->

    <!--ボタンを作成-->
    <!-- <button type="button" id="modal-open" class="add_btn">
      <img src="image\pencil.jpg" alt="＋" />
    </button> -->
    <!-- <v-row class="right">
      <div class="text-center">
        <v-btn color="green" dark class="mr-4" @click="openModal">追加 </v-btn>
      </div>
    </v-row> -->
  </v-container>
</template>

<script>
export default {
  name: "NotePage",
  props: {
    notes: Array,
  },
  data() {},
  methods: {},
};
// const buttonOpen = document.getElementById("modal-open");
// const modal = document.getElementById("div-modal");
// const buttonClose = document.getElementsByClassName("modal-close")[0];

// //ボタンが押されたとき
// buttonOpen.addEventListener("click", modalOpen);
// function modalOpen() {
//   modal.style.display = "block";
// }

// // バツ印がクリックされた時
// buttonClose.addEventListener("click", modalClose);
// function modalClose() {
//   modal.style.display = "none";
// }

// // モーダルコンテンツ以外がクリックされた時
// addEventListener("click", outsideClose);
// function outsideClose(e) {
//   if (e.target == modal) {
//     modal.style.display = "none";
//   }
// }
</script>
