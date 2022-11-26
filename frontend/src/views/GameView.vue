<template>
  <div SeachNumber>
    <GameSearchNumVue />
  </div>
</template>

<script>
// @ is an alias to /src
//import GameBoard from "@/components/GameBoard.vue";
import GameSearchNumVue from "@/components/GameSearchNum.vue";
export default {
  name: "GameView",
  components: {
    //GameBoard,
    GameSearchNumVue,
  },
};
</script>

<style scoped>
.mb-20 {
  margin-bottom: 20px;
}
.TicTacToe {
  border: 2px solid #333;
  background-color: #ddd;
  margin-left: 20%;
  margin-right: 20%;
  text-align: center;
  padding: 10px;
}
</style>
