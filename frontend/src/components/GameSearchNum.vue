<template>
  <meta name="viewport" content="width-device-wwidth,initial-scale=1" />

  <div class="SearchNumContainer">
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
              class="Cells"
              v-for="NumCellIndex in Row"
              :class="{
                Hide: State.NumCells[NumCellIndex] === null,
              }"
              :key="NumCellIndex"
              :value="State.NumCells[NumCellIndex]"
              @click="HandleClickNumCellAt(NumCellIndex)"
            />
          </div>
        </div>
      </div>
      <div class="Side Right">
        <div class="HintWrap">
          <button @click="HintClickAt">
            <div class="HintBulb" />
            <p><b>ヒント！</b></p>
          </button>
          <h2 class="HintNum" v-if="State.IsShowHint">
            {{ State.NextClickNum }}
          </h2>
        </div>
      </div>
    </div>

    <div class="Bottom Box">
      <div class="ResetWrap">
        <button class="Reset" @click="GameReset"><h2>Restart!</h2></button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
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
    onMounted(() => {
      State.value.ArrayInit(State.value.NumCells);
      State.value.shuffle(State.value.NumCells);
    });

    const NumCellIndexTable = _.chunk(
      //セルをテーブル状に表示するための二次元配列
      [...Array(props.Size * props.Size).keys()],
      props.Size
    );

    const State = ref({
      NumCells: Array(props.Size * props.Size).fill("init"), //セルに表示する数字を格納する配列
      NextClickNum: 1, //次にクリックするべき数字
      IsShowHint: false,

      ArrayInit: (array) => {
        for (let i = 0; i < array.length; i++) {
          array[i] = i + 1;
        }
      },
      shuffle: (array) => {
        //配列をシャッフルする関数
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      },
      CorrectClick: (index) => {
        State.value.NextClickNum += 1;
        State.value.NumCells[index] = null;
        State.value.IsShowHint = false;
      },

      StateInit: () => {
        State.value.ArrayInit(State.value.NumCells);
        State.value.shuffle(State.value.NumCells);
        State.value.NextClickNum = 1;
        State.value.IsShowHint = false;
      },
    });

    const PlaySound = ref({
      MissSound: new Audio(require("../assets/MissSound.mp3")),
      CorrectSound: new Audio(require("../assets/CorrectSound.mp3")),
      GameClearSound: new Audio(require("../assets/GameClearSound.mp3")),

      MissClick: () => {
        PlaySound.value.MissSound.currentTime = 0;
        PlaySound.value.MissSound.play();
      },

      CorrectClick: () => {
        PlaySound.value.CorrectSound.currentTime = 0;
        PlaySound.value.CorrectSound.play();
      },

      GameClear: () => {
        PlaySound.value.GameClearSound.currentTime = 0;
        PlaySound.value.GameClearSound.play();
      },
    });

    const Timer = ref({
      Active: false, // 実行状態
      Start: 0, // startを押した時刻
      Time: 0, // setInterval()の格納用
      Interval: 0, // 計測時間
      Accum: 0, // 累積時間

      TimerStart: () => {
        if (Timer.value.Active) return;
        Timer.value.Active = true;
        Timer.value.Start = Date.now();
        Timer.value.Time = setInterval(() => {
          Timer.value.Interval =
            Timer.value.Accum + (Date.now() - Timer.value.Start) * 0.001;
        }, 10); // 10msごとに現在時刻とstartを押した時刻の差を足す
      },

      TimerStop: () => {
        Timer.value.Active = false;
        Timer.value.Accum = Timer.value.Interval;
        clearInterval(Timer.value.Time);
      },

      TimerReset: () => {
        Timer.value.Interval = 0;
        Timer.value.Accum = 0;
        Timer.value.Start = Date.now();
      },
    });

    const Message = computed(() => {
      //ゲームの状態メッセージテキスト，カラー
      const GameEndNum = props.Size * props.Size + 1;

      if (State.value.NextClickNum === GameEndNum) {
        Timer.value.TimerStop();
        PlaySound.value.GameClear();
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

    const HandleClickNumCellAt = (index) => {
      if (State.value.NumCells[index] !== State.value.NextClickNum) {
        PlaySound.value.MissClick();
        return;
      }
      Timer.value.TimerStart();
      PlaySound.value.CorrectClick();
      State.value.CorrectClick(index);
    };

    const HintClickAt = () => {
      State.value.IsShowHint = !State.value.IsShowHint;
      return;
    };

    const GameReset = () => {
      State.value.StateInit();
      Timer.value.TimerStop();
      Timer.value.TimerReset();
    };

    return {
      NumCellIndexTable,
      State,
      Message,
      Timer,
      PlaySound,
      HandleClickNumCellAt,
      HintClickAt,
      GameReset,
    };
  },
};
</script>
<style scoped>
.SearchNumContainer {
  margin-left: 10%;
  margin-right: 10%;
}
@media screen and (max-width: 1000px) {
  .SearchNumContainer {
    margin-left: 0;
    margin-right: 0;
  }
}
.Box {
  /*Top Middle Bottom の3つに分けたすべてのBoxに適用*/
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: flex-start;
}

/*上部*/
.Top {
  border: 0;
  height: 120px;
  padding-top: 20px;
  padding-bottom: 50px;
  border-bottom: 4px dotted steelblue;
}
.Top .Center {
  text-align: center;
}
/*中間部*/
.Middle {
  vertical-align: top;
  padding-top: 10px;
  padding-bottom: 30px;
  min-height: 50vh;
}
.Middle .Center {
  padding: 0;
}
.BoardWrap {
  display: inline-block;
  color: blue;
}
.Cells {
  margin: 5px;
  height: 95px;
  width: 95px;
  font-size: 35px;
}
.Hide {
  visibility: hidden;
}
/*中間横部分 */
.Middle .Side {
  max-width: 300px;
  width: 10%;
  min-height: 100%;
}
.Side.Left {
  margin-left: auto;
  margin-right: auto;
}
.Side.Right {
  margin-right: auto;
  margin-left: auto;
}
.HintWrap {
  position: relative;
  width: 100%;
  height: auto;
  padding: 3px;
  border-radius: 10px;
  background-color: darkorange;
}

.HintWrap button {
  background-color: #6666ff;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.HintWrap p {
  font-size: 15px;
  margin: 1px;
  margin-bottom: 2px;
  color: beige;
}
.HintBulb {
  height: 40px;
  min-width: 30px;
  aspect-ratio: 3/4;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  background-image: url("../assets/LightBulb.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.HintNum {
  text-align: center;
  font-size: 40px;
  margin: 0px;
  color: #fff;
}

/*下部*/
.Bottom {
  height: 140px;
  border: 0;
  border-bottom: 4px;
  border-color: #eb6100;
  border-style: dotted;
}

.ResetWrap {
  display: inline-block;
  border: 0px solid black;
  margin: 10px;
  padding: 5px;
}

.Reset {
  width: 100px;
  height: 60px;
  border: 0;
  border-bottom: 5px solid #cc0100;
  border-radius: 10%;
  background-color: #eb6100;
  color: #fff;
  cursor: pointer;
}
.Reset:hover {
  margin-top: 3px;
  background: #f56500;
  border-bottom: 2px solid #cc0100;
}

@media screen and (max-width: 500px) {
  /*スマホ用のスタイル*/
  .SearchNumContainer {
    margin: 0;
    padding: 0;
  }

  .Box {
    /*Top Middle Bottom の3つに分けたすべてのBoxに適用*/
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: flex-start;
  }

  /*上部*/
  .Top {
    border: 0;
    height: 120px;
    padding-top: 20px;
    padding-bottom: 50px;
    border-bottom: 4px dotted steelblue;
  }
  .Top .Center {
    text-align: center;
  }
  /*中間部*/
  .Middle.Box {
    display: block;
    height: auto;
    margin-bottom: 0;
  }
  .Middle {
    vertical-align: top;
    padding-top: 10vh;
    padding-bottom: 30px;
    min-height: 50vh;
  }
  .Middle .Center {
    padding: 0;
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    bottom: 230px;
    width: 100%;
  }
  .BoardWrap {
    display: inline-block;
    color: blue;
  }
  .Cells {
    margin: 5px;
    height: 50px;
    width: 50px;
    font-size: 25px;
  }
  .Hide {
    visibility: hidden;
  }
  /*中間横部分 */
  .Middle .Side {
    width: auto;
    height: auto;
  }

  .Side.Left {
    display: none;
  }
  .Side.Right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30vw;
    height: auto;
  }
  .HintWrap {
    position: absolute;
    bottom: 120px;
    width: 120px;
    height: auto;
    padding: 3px;
    border-radius: 10px;
    background-color: darkorange;
    display: flex;
    flex-direction: column;
  }

  .HintWrap button {
    background-color: #6666ff;
    border-radius: 10px;
    width: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    order: 2;
  }
  .HintWrap p {
    font-size: 15px;
    margin: 1px;
    margin-bottom: 2px;
    color: beige;
  }
  .HintBulb {
    height: 40px;
    width: auto;
    padding: 10px;
  }
  .HintNum {
    text-align: center;
    font-size: 20px;
    margin: 5px;
    color: #fff;
    order: 1;
  }

  /*下部*/
  .Bottom {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 100px;
    border-bottom: 4px;
    border-color: #eb6100;
    border-style: dotted;
    padding-bottom: 10px;
  }
  .ResetWrap {
    display: inline-block;
    margin: auto;
  }
  .Reset {
    width: 100px;
    height: 60px;
    border: 0;
    border-bottom: 5px solid #cc0100;
    border-radius: 10%;
    background-color: #eb6100;
    color: #fff;
    cursor: pointer;
  }
  .Reset:hover {
    margin-top: 3px;
    background: #f56500;
    border-bottom: 2px solid #cc0100;
  }

  @media screen and (max-height: 700px) {
    .Middle {
      padding-top: 10px;
    }
    .Middle .Center {
      position: initial;
      bottom: 0px;
      width: 100%;
    }
    .HintWrap {
      position: absolute;
      bottom: 100px;
      width: auto;
      height: 50px;
      margin-bottom: 0px;
      padding: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
    }
    .HintWrap p {
      display: none;
    }
    .HintWrap button {
      background-color: #6666ff;
      border-radius: 0;
      width: 100%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .HintBulb {
      height: 40px;
      width: auto;
      padding: 10px;
    }
    .HintNum {
      text-align: center;
      font-size: 20px;
      margin: 5px;
      margin-left: 15px;
      margin-right: 15px;

      color: #fff;
    }

    .Reset {
      width: 100px;
      height: 40px;
      font-size: 15px;
      border: 0;
      border-bottom: 5px solid #cc0100;
      border-radius: 10%;
      background-color: #eb6100;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
