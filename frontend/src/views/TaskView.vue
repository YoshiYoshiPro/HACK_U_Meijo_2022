<template>
  <div class="task">
    <TaskShare />
  </div>
</template>

<script>
// @ is an alias to /src
import TaskShare from "@/components/TaskShare.vue";

export default {
  name: "TaskView",
  components: {
    TaskShare,
  },
};
</script>
