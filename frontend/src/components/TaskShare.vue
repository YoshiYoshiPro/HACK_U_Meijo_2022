<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <div class="mx-10 ma-1 pa-3 grey lighten-4">
        <span class="text-h5"> 今日のタスク </span>
        <div v-for="(task, i) in tasks" :key="i" class="mt-1">
          <v-card elevation="2" shaped>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6"
                  ><input
                    type="checkbox"
                    :value="task.name"
                    v-model="finishTasks"
                    class="mr-3"
                  />{{ task.name }}</v-list-item-title
                >
                <v-list-item-subtitle
                  >担当者：{{ task.person }}</v-list-item-subtitle
                >
                <v-list-item-subtitle>
                  詳細 ：{{ task.detail }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </div>
      </div>
    </v-col>
    <div class="text-center">
      <v-btn color="primary" dark class="mr-4" @click="openModal">
        タスクの追加
      </v-btn>
    </div>

    <v-col cols="12">
      <div class="mx-10 ma-1 pa-3 grey lighten-4">
        <span class="text-h5"> 毎日のタスク </span>
        <div v-for="(task, i) in everydayTasks" :key="i" class="mt-1">
          <v-card elevation="2" shaped>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6">{{
                  task.name
                }}</v-list-item-title>
                <v-list-item-subtitle
                  >担当者：{{ task.person }}</v-list-item-subtitle
                >
                <v-list-item-subtitle>
                  詳細 ：{{ task.detail }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </div>
      </div>
    </v-col>

    <v-col cols="12">
      <div class="mx-10 ma-1 pa-3 grey lighten-4">
        <span class="text-h5"> 終了したタスク </span>
        <div v-for="(task, i) in finishTasks" :key="i" class="mt-1">
          <v-card elevation="2" shaped>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6">{{
                  task
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </div>
      </div>
    </v-col>
  </v-row>

  <div class="text-center">
    <v-dialog v-model="dialog" width="500" class="purple darken-2">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          タスクの追加
        </v-card-title>
        <v-row justify="center">
          <v-col cols="12">
            <v-text-field
              v-model="taskName"
              label="タスク名"
              class="mx-2"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="taskPerson"
              label="担当"
              class="mx-2"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="taskStart"
              label="開始時間"
              class="mx-2"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="taskDetail"
              label="詳細"
              class="mx-2"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-checkbox
              label="毎日？"
              v-model="everyday"
              class="mx-2"
            ></v-checkbox>
          </v-col>
          <v-col cols="12">
            <v-btn :disabled="taskName === ''" color="primary" @click="taskAdd">
              追加
            </v-btn>
            <v-btn color="primary" class="mx-auto" @click="closeModal">
              閉じる
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <button @click="get">get</button>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "TaskShare",
  data() {
    return {
      tasks: [], //今日のタスク
      finishTasks: [], //今日のタスクで完了したもの
      everyday: false,
      everydayTasks: [], //毎日のタスクに登録
      valid: false,
      dialog: false,
      taskName: "",
      taskPerson: "",
      taskStart: "",
      taskDetail: "",
    };
  },
  methods: {
    taskAdd: function () {
      console.log("add");

      this.tasks.push({
        name: this.taskName,
        person: this.taskPerson,
        time: this.taskStart,
        detail: this.taskDetail,
      });

      if (this.everyday == true) {
        this.everydayTasks.push({
          name: this.taskName,
          person: this.taskPerson,
          time: this.taskStart,
          detail: this.taskDetail,
        });
        this.everyday = false;
      }

      this.taskName = "";
      this.taskPerson = "";
      this.taskStart = "";
      this.taskDetail = "";
    },
    openModal: function () {
      console.log("open");
      this.dialog = true;
    },
    closeModal: function () {
      console.log("close");
      this.dialog = false;
    },
    finishTask: function () {
      this.tasks;
    },
    get: function () {
      const uuid = store.getters["getUserUid"];
      console.log(uuid);
    },
  },
  computed: {},
};
</script>
