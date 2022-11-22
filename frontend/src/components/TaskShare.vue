<template>
  <h1>今日のタスク</h1>
  <div class="taskList">
    <section>
      <div v-for="(task, i) in tasks" :key="i">
        <input
          :id="'task' + i"
          type="checkbox"
          :value="task.name"
          v-model="selectedTasks"
        />
        <label :for="task"
          >{{ task.name }}-{{ task.detail }}:{{ task.person }}:{{
            task.time
          }}</label
        >
      </div>
    </section>
  </div>
  <button v-on:click="openModal()">追加</button>
  <div id="overlay" v-show="showContent">
    <div id="content">
      <h2>追加タスク</h2>
      <div>
        <p>
          タスク名
          <input type="text" v-model="taskName" />
        </p>
        <p>
          担当
          <input type="text" v-model="taskPerson" />
        </p>
        <p>
          開始時間
          <input type="text" v-model="taskStart" />
        </p>
        <p>
          タスク詳細
          <textarea type="text" v-model="taskDetail"></textarea>
        </p>
      </div>
      <div>
        <button v-on:click="taskAdd()">追加</button>
        <button v-on:click="closeModal()">close</button>
      </div>
    </div>
  </div>
  <div>
    <p>すべてのタスク</p>
    <div v-for="(task, i) in selectedTasks" :key="i">
      <p>・{{ task }}</p>
    </div>
  </div>
  <div>
    <p>完了タスク</p>
    <div v-for="(task, i) in selectedTasks" :key="i">
      <p>・{{ task }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskShare",
  data() {
    return {
      tasks: [
        { name: "掃除", person: "母", time: "9時", detail: "リビングの掃除" },
        { name: "洗濯", person: "父", time: "22:00", detail: "" },
        {
          name: "皿洗い",
          detail: "夕食後の皿洗い",
          person: "父",
          time: "20:00",
        },
      ],
      finishTasks: [],
      remainingTasks: [],
      showContent: false,
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
  width: 50%;
  padding: 1em;
  background: #fff;
}
</style>
