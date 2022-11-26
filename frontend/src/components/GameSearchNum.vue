<template>
  <div>
    <h2>{{ Message }}</h2>
  </div>
  <div class="SearchNum">
    <div
      class="BoardRow"
      v-for="(Row, RowIndex) in CircleIndexTable"
      :key="RowIndex"
    >
      <GameCircleVue
        v-for="CircleIndex in Row"
        :key="CircleIndex"
        :value="State.Circles[CircleIndex]"
        @click="HandleClickCircleAt(CircleIndex)"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import GameCircleVue from "./GameCircle.vue";
import _ from "lodash";

export default {
  name: "GameSarchNum",
  components: {
    GameCircleVue,
  },

  props: {
    Size: {
      type: Number,
      default: 2,
    },
  },

  setup(props) {
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };
    const CircleIndexTable = _.chunk(
      [...Array(props.Size * props.Size).keys()],
      props.Size
    );

    const State = ref({
      Circles: Array(props.Size * props.Size).fill(null),
      ClickedArray: Array(props.Size * props.Size).fill(false),
      NextClickNum: 1,
    });
    for (let i = 0; i < State.value.Circles.length; i++) {
      State.value.Circles[i] = i + 1;
    }

    shuffle(State.value.Circles);

    const Message = computed(() => {
      if (State.value.NextClickNum === GameEndNum) {
        return "Success!";
      } else if (State.value.NextClickNum > 1) {
        return "Playing...";
      }
      return "Please Start Game !";
    });

    const GameEndNum = props.Size * props.Size + 1;

    const HandleClickCircleAt = (index) => {
      if (State.value.Circles[index] !== State.value.NextClickNum) {
        return;
      }
      if (State.value.NextClickNum === GameEndNum) {
        return;
      }
      State.value.NextClickNum += 1;
      State.value.Circles[index] = null;
    };
    return {
      CircleIndexTable,
      State,
      Message,
      HandleClickCircleAt,
    };
  },
};
</script>
<style scoped>
.SearchNum {
  border: 2px solid black;
}

.BoardRow:after {
  clear: both;
  content: "";
  display: table;
}
</style>
