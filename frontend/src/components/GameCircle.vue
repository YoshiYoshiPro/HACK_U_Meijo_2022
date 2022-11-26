<template>
  <button class="circle" @click="handleClick">
    {{ value }}
  </button>
</template>

<script>
export default {
  name: "GameCircle",
  props: {
    value: Number,
  },
  emits: ["click"],

  setup(props, context) {
    const handleClick = () => {
      context.emit("click");
    };

    return {
      handleClick,
    };
  },
};
</script>

<style scoped>
.circle {
  height: 60px;
  width: 60px;
  padding: 0;
  margin: 5px;
  border: 2px solid black;
  font-size: 25px;
  cursor: pointer;
}
</style>
