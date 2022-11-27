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
  emits: ["click"], //正直，このemitsが何かよくわかっていない

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
  height: 75px;
  width: 75px;
  padding: 0;
  margin: 5px;
  border: 2px solid black;
  font-size: 35px;
  cursor: pointer;
}
</style>
