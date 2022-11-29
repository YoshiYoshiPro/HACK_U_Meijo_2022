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
  height: 95px;
  width: 95px;
  margin: 5px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  vertical-align: top;
}

.NumCell {
  height: 75px;
  width: 75px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px;
  border-style: solid;
  border-color: orangered;
  border-radius: 15%;
  background-color: beige;
  font-size: 35px;
}
</style>
