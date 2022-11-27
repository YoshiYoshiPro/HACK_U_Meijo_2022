<template>
  <div :style="Message">
    <h1>{{ Message.Text }}</h1>
  </div>
  <div class="SearchNum">
    <div class="BoardWrap">
      <div
        class="BoardRow"
        v-for="(Row, RowIndex) in CircleIndexTable"
        :key="RowIndex"
      >
        <GameNumCell
          v-for="CircleIndex in Row"
          :class="{ Hide: State.Circles[CircleIndex] === null }"
          :key="CircleIndex"
          :value="State.Circles[CircleIndex]"
          @click="HandleClickCircleAt(CircleIndex)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import GameNumCell from "./GameNumCell.vue";
import _ from "lodash";

export default {
  name: "GameSarchNum",
  components: {
    GameNumCell,
  },

  props: {
    Size: {
      type: Number,
      default: 3,
    },
  },

  setup(props) {
    const shuffle = (array) => {
      //配列をシャッフルする関数
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };
    const CircleIndexTable = _.chunk(
      //セルをテーブル状に表示するための二次元配列
      [...Array(props.Size * props.Size).keys()],
      props.Size
    );

    const State = ref({
      Circles: Array(props.Size * props.Size).fill(null), //セルに表示する数字を格納する配列
      NextClickNum: 1, //次にクリックするべき数字
    });
    for (let i = 0; i < State.value.Circles.length; i++) {
      //配列をいったん連番で初期化 比較演算子 <= は無限ループを起こすようなのでこのロジックで書いている
      State.value.Circles[i] = i + 1;
    }
    shuffle(State.value.Circles); //配列をシャッフル

    const Message = computed(() => {
      //ゲーム終了時のメッセージテキスト，カラー
      if (State.value.NextClickNum === GameEndNum) {
        return {
          Text: "Success!",
          color: "cornflowerblue",
        };
      } else if (State.value.NextClickNum > 1) {
        return {
          Text: "Playing...",
        };
      }
      return {
        Text: "Please Start Game !",
      };
    });

    const GameEndNum = props.Size * props.Size + 1;

    const HandleClickCircleAt = (index) => {
      if (State.value.Circles[index] !== State.value.NextClickNum) {
        //クリックした数字が正しくない場合
        return;
      } else if (State.value.NextClickNum === GameEndNum) {
        //ゲームが終了している場合
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
  justify-content: center;
  align-items: center;
}

.BoardWrap {
  display: inline-block;
  margin: 20px;
  aspect-ratio: 3/4;
  color: dodgerblue;
}

.Hide {
  border: 0px;
  background-color: #fff;
}
</style>
