<template>
  <button class="NumCellButton" @click="handleClick">
    <div class="NumCell">
      {{ value }}
    </div>
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
.NumCellButton {
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  vertical-align: top;
}

.NumCell {
  height: 80%;
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px;
  border-style: solid;
  border-color: orangered;
  border-radius: 15%;
  background-color: beige;
}
</style>
