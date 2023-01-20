<template>
  <div class="page">
    <t-row class="firstPart">
      <t-col :span="3" class="col">
        <span style="font-size: 22px">{{ allWthData.province }}</span>
        <span
          >今天：{{ todayWthData.dayweather }} {{ todayWthData.daytemp }}° ~
          {{ todayWthData.nighttemp }}°</span
        >
        <span>{{ todayWthData.wind }}{{ todayWthData.power }}级</span>
      </t-col>
      <t-col :span="6">
        <span></span>
        <span></span>
      </t-col>
      <t-col :span="3" class="col2">
        <span>{{ month }}月{{ today }}日</span>
        <span>{{ setCorrectWeek(todayWthData.week) }}</span>
        <span>农历腊月二十九</span>
      </t-col>
    </t-row>
    <t-row class="secondPart">
      <t-col :span="12" class="col">
        <div class="detail">
          <div class="detail_1">{{ todayWthData.temp }}°</div>
          <div class="detail_2">
            <!-- <div></div> -->
            <div class="qpi">48 优</div>
            <div>
              {{ todayWthData.weather }}
              &nbsp;&nbsp;
              {{ todayWthData.wind }}
              &nbsp;&nbsp;
              {{ todayWthData.power }}
              级
            </div>
          </div>
        </div>
      </t-col>
    </t-row>
    <t-row class="thirdPart">
      <t-col :span="4" class="col">
        <span>湿度15.0%</span>
        <span>紫外线强</span>
        <span>日出07:27</span>
        <span>日落17:18</span>
      </t-col>
      <t-col :span="8"></t-col>
    </t-row>

    <t-card
      style="
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        border: none;
      "
    >
      <t-row>
        <t-col
          :span="2"
          style="text-align: left; font-size: 22px; color: aliceblue"
          >未来四天预报</t-col
        >
      </t-row>
      <t-divider></t-divider>
      <ul class="futureList">
        <li v-for="item in allWthData.casts" :key="item.date">
          <div style="text-align: left; font-size: 22px">
            {{
              item.date.split("-")[2] == new Date().getDate()
                ? "今天"
                : item.date.split("-")[2] + "号"
            }}
          </div>
          <div>{{ item.daytemp }}° ~ {{ item.nighttemp }}°</div>
          <div>
            {{ item.wind }}
            &nbsp;&nbsp;
            {{ item.power }}
            级
          </div>
          <div>
            {{ item.weather }}
          </div>
          <div>{{ setCorrectWeek(item.week) }}</div>
        </li>
      </ul>
    </t-card>
  </div>
</template>
<script>
import { getWeather } from "@/services/weather";
import { getWeek } from "../../utils/getWeek.js";
export default {
  created() {
    this.getWeatherSuccess();
  },
  data() {
    return {
      todayWthData: "",
      allWthData: "",
    };
  },
  computed: {
    month() {
      return new Date().getMonth() + 1 > 9
        ? new Date().getMonth() + 1
        : "0" + (new Date().getMonth() + 1);
    },
    today() {
      return new Date().getDate();
    },
  },
  methods: {
    getWeatherSuccess() {
      getWeather("120000").then((res) => {
        let all_data = res.data.forecasts[0];
        all_data.casts.map((item) => {
          if (new Date().getHours() > 18) {
            item["power"] = item.nightpower;
            item["temp"] = item.nighttemp;
            item["weather"] = item.nightweather;
            item["wind"] = item.nightwind;
          } else {
            item["power"] = item.daypower;
            item["temp"] = item.daytemp;
            item["weather"] = item.dayweather;
            item["wind"] = item.daywind;
          }
        });
        this.allWthData = res.data.forecasts[0];
        this.todayWthData = all_data.casts[0];
        console.log(this.allWthData, this.todayWthData);
      });
    },
    setCorrectWeek(val) {
      return getWeek(val);
    },
  },
};
</script>
<style lang="less" scoped>
.page {
  .firstPart,
  .secondPart,
  .thirdPart {
    margin-bottom: 32px;
  }
  .col {
    color: #fff;
    display: flex;
    justify-content: space-between;

    .detail {
      display: flex;
      height: 100px;
      align-items: center;
      justify-content: flex-start;
      .detail_1 {
        font-weight: 900;
        font-size: 120px;
        margin-right: 30px;
      }
      .detail_2 {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .qpi {
          margin-top: 30%;
          background: rgb(130, 201, 30);
          border-radius: 12px;
          width: 54px;
        }
      }
    }
  }
  .col2 {
    color: #fff;
    display: flex;
    justify-content: space-between;
  }

  .futureList {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    color: #fff;
    li {
      div {
        height: 50px;
      }
    }
  }
}
</style>
