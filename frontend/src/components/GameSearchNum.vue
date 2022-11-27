<template>
  <div class="Top Box">
    <div class="Center">
      <div :style="Message">
        <h1>{{ Message.Text }}</h1>
      </div>
      <div>
        <h2>クリア時間:{{ Timer.Interval.toFixed(2) }}秒</h2>
      </div>
    </div>
  </div>
  <div class="Middle Box">
    <div class="Side Left"></div>
    <div class="Center">
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
    <div class="Side Right">
      <div class="HintWrap">
        <button @click="HintClickAt"><h3>ヒント！</h3></button>
        <h2 v-if="State.IsShowHint">{{ State.NextClickNum }}</h2>
      </div>
    </div>
  </div>
  <div class="Bottom Box">
    <div class="ResetWrap">
      <button class="Reset" @click="GameReset"><h2>Restart!</h2></button>
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
      default: 5,
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
      IsShowHint: false,
    });
    ArrayInit(State.value.NumCells);
    shuffle(State.value.NumCells); //配列をシャッフル

    const Message = computed(() => {
      //ゲームの状態メッセージテキスト，カラー
      if (State.value.NextClickNum === GameEndNum) {
        TimerStop();
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
      if (!Timer.value.Active) {
        TimerStart();
      }
      State.value.NextClickNum += 1;
      State.value.NumCells[index] = null;
      State.value.IsShowHint = false;
    };

    const HintClickAt = () => {
      State.value.IsShowHint = true;
      return;
    };

    const Timer = ref({
      Active: false, // 実行状態
      Start: 0, // startを押した時刻
      Time: 0, // setInterval()の格納用
      Interval: 0, // 計測時間
      Accum: 0, // 累積時間
    });
    const TimerStart = () => {
      Timer.value.Active = true;
      Timer.value.Start = Date.now();
      Timer.value.Time = setInterval(() => {
        Timer.value.Interval =
          Timer.value.Accum + (Date.now() - Timer.value.Start) * 0.001;
      }, 10); // 10msごとに現在時刻とstartを押した時刻の差を足す
    };

    const TimerStop = () => {
      Timer.value.Active = false;
      Timer.value.Accum = Timer.value.Interval;
      clearInterval(Timer.value.Time);
    };
    const TimerReset = () => {
      Timer.value.Interval = 0;
      Timer.value.Accum = 0;
      Timer.value.Start = Date.now();
    };

    const GameReset = () => {
      ArrayInit(State.value.NumCells);
      shuffle(State.value.NumCells);
      TimerStop();
      TimerReset();
      State.value.NextClickNum = 1;
    };
    return {
      NumCellIndexTable,
      State,
      Message,
      Timer,
      HandleClickNumCellAt,
      HintClickAt,
      GameReset,
    };
  },
};
</script>
<style scoped>
.Box {
  /*Top Middle Bottom の3つに分けたすべてのBoxに適用*/
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: flex-start;
}

/*上部*/
.Top {
  border: 1px solid black;
  height: 150px;
}

/*中間部*/
.Middle {
  border: 1px solid black;
  vertical-align: top;
  min-height: 500px;
  max-height: 65vh;
}

.Center {
  border: 0px solid black;
  padding: 0;
}
.BoardWrap {
  border: 0px solid #444;
  display: inline-block;
  aspect-ratio: 10/12;
  color: dodgerblue;
}
.Hide {
  border: 0px;
  background-color: #fff;
}

/*中間横部分 */
.Middle .Side {
  width: 10%;
  min-height: 100%;
  display: inline-block;
  border: 0px solid black;
  margin: 10px;
}
.HintWrap {
  border: 0px solid black;
  position: relative;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10%;
  background-color: #ddd;
}

/*下部*/
.Bottom {
  border: 1px solid black;
  height: 140px;
}

.ResetWrap {
  display: inline-block;
  border: 2px solid black;
  background-color: cyan;
  margin: 10px;
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
</style>
