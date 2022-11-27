<template>
  <div class="TopBox">
    <div :style="Message">
      <h1>{{ Message.Text }}</h1>
    </div>
    <div>ここにタイマー</div>
  </div>
  <div class="MiddleBox">
    <div class="SearchNum">
      <div class="BoardWrap">
        <div
          class="BoardRow"
          v-for="(Row, RowIndex) in NumCellIndexTable"
          :key="RowIndex"
        >
          <GameNumCell
            v-for="NumCellIndex in Row"
            :class="{ Hide: State.NumCells[NumCellIndex] === null }"
            :key="NumCellIndex"
            :value="State.NumCells[NumCellIndex]"
            @click="HandleClickNumCellAt(NumCellIndex)"
          />
        </div>
      </div>
    </div>
    <div class="BottomBox">
      <div class="ResetWrap M30">
        <button class="Reset" @click="GameReset"><h2>Restart!</h2></button>
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
    const ArrayInit = (array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = i + 1;
      }
    };
    const NumCellIndexTable = _.chunk(
      //セルをテーブル状に表示するための二次元配列
      [...Array(props.Size * props.Size).keys()],
      props.Size
    );

    const State = ref({
      NumCells: Array(props.Size * props.Size).fill("init"), //セルに表示する数字を格納する配列
      NextClickNum: 1, //次にクリックするべき数字
    });
    ArrayInit(State.value.NumCells);
    shuffle(State.value.NumCells); //配列をシャッフル

    const Message = computed(() => {
      //ゲームの状態メッセージテキスト，カラー
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

    const HandleClickNumCellAt = (index) => {
      if (State.value.NumCells[index] !== State.value.NextClickNum) {
        //クリックした数字が正しくない場合
        return;
      } else if (State.value.NextClickNum === GameEndNum) {
        //ゲームが終了している場合
        return;
      }
      State.value.NextClickNum += 1;
      State.value.NumCells[index] = null;
    };

    const GameReset = () => {
      ArrayInit(State.value.NumCells);
      shuffle(State.value.NumCells);
      State.value.NextClickNum = 1;
    };
    return {
      NumCellIndexTable,
      State,
      Message,
      HandleClickNumCellAt,
      GameReset,
    };
  },
};
</script>
<style scoped>
.Mb30 {
  margin-bottom: 30px;
}

.M30 {
  margin: 30px;
}

.TopBox {
  border: 1px solid black;
}
.MiddleBox {
  border: 1px solid black;
}
.BottomBox {
  border: 1px solid black;
}

.SearchNum {
  border: 1px solid black;
}

.ResetWrap {
  display: inline-block;
  border: 2px solid black;
  padding: 5px;
}
.Reset {
  width: 100px;
  height: 100px;
  border: 1px solid aquamarine;
  border-radius: 50%;
  background-color: red;
  color: azure;
  cursor: pointer;
}
.BoardWrap {
  display: inline-block;
  margin: 20px;
  aspect-ratio: 10/12;
  color: dodgerblue;
}

.Hide {
  border: 0px;
  background-color: #fff;
}
</style>
