<template>
  <div class="SearchNum">
    <GameSearchNumVue />
  </div>
</template>

<script>
// @ is an alias to /src
import GameSearchNumVue from "@/components/GameSearchNum.vue";
export default {
  name: "GameView",
  components: {
    GameSearchNumVue,
  },
};
</script>
