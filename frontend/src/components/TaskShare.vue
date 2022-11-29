<template>
  <h1>今日のタスク</h1>
  <div class="taskList">
    <section>
      <div v-for="(task, i) in tasks" :key="i">
        <input
          :id="'task' + i"
          type="checkbox"
          :value="task.name"
          v-model="finishTasks"
        />
        <label :for="task"
          >{{ task.name }}-{{ task.detail }}:{{ task.person }}:{{
            task.time
          }}</label
        >
      </div>
    </section>
  </div>
  <button v-on:click="openModal()" id="addBtn">追加</button>
  <div id="overlay" v-show="showContent">
    <div id="content">
      <h2>追加タスク</h2>
      <div>
        <div class="addElement">
          <p class="left">タスク名</p>
          <input class="left addTask" type="text" v-model="taskName" />
        </div>
        <div class="addElement">
          <p class="left">担当</p>
          <input class="left addTask" type="text" v-model="taskPerson" />
        </div>
        <div class="addElement">
          <p class="left">開始時間</p>
          <input class="left addTask" type="text" v-model="taskStart" />
        </div>
        <div class="addElement">
          <p class="left">タスク詳細</p>
          <textarea
            class="left addTask"
            type="text"
            v-model="taskDetail"
          ></textarea>
        </div>
        <div class="addElement">
          <label>毎日?</label>
          <input :id="everydayTask" type="checkbox" v-model="everyday" />
        </div>
      </div>
      <div>
        <input type="button" v-on:click="taskAdd()" id="addBtn" value="追加" />
        <input
          type="button"
          v-on:click="closeModal()"
          id="closeBtn"
          value="close"
        />
      </div>
    </div>
  </div>
  <div>
    <p>毎日タスク</p>
    <div v-for="(task, i) in everydayTasks" :key="i">
      <p>・{{ task }}</p>
    </div>
  </div>
  <div>
    <p>完了タスク</p>
    <div v-for="(task, i) in finishTasks" :key="i">
      <p>・{{ task }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskShare",
  data() {
    return {
      tasks: [], //今日のタスク
      finishTasks: [], //今日のタスクで完了したもの
      showContent: false,
      everyday: false,
      everydayTasks: [], //毎日のタスクに登録
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
        this.everydayTasks.push(this.taskName);
      }
    },
    openModal: function () {
      console.log("open");
      this.showContent = true;
    },
    closeModal: function () {
      console.log("close");
      this.showContent = false;
    },
    finishTask: function () {
      this.tasks;
    },
  },
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#overlay {
  /*要素を重ねた時の順番*/
  z-index: 1;

  /*画面全体を覆う設定*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  /*画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  z-index: 2;
  width: 40%;
  padding: 1em;
  background: #fff;
  border-radius: 20px;
  font-size: large;
}
.left {
  text-align: left;
  margin: 0px;
}
.addTask {
  width: 100%;
}
.addElement {
  margin: 20px;
}
#addBtn {
  width: 100px;
  height: 50px;
  border-radius: 20px;
  background-color: aqua;
  margin: 10px;
}
#closeBtn {
  width: 100px;
  height: 50px;
  border-radius: 20px;
  background-color: aqua;
  margin: 10px;
}
</style>
