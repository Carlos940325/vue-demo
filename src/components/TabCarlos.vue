<template>
  <div style="width: 100%;">
    <div class="expTab">
      <div class="tabSide">
        <div class="express" @click="handleSelect('exp')">
          <span
            :class="
              tabSelected == 'exp' ? 'tabTextSelected' : 'tabTextUnselect'
            "
            >物流查询</span
          >
        </div>
        <div class="weather" @click="handleSelect('wth')">
          <span
            :class="
              tabSelected != 'exp' ? 'tabTextSelected' : 'tabTextUnselect'
            "
            >天气查询</span
          >
        </div>
        <span
          :class="[tabSelected == 'exp' ? 'slider-default' : 'slider-right']"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            tabSelected: "exp",
        }
    },
    methods: {
       handleSelect(tab){
        this.tabSelected = tab
        this.$emit('selectedTab',this.tabSelected)
       }
    }
}
</script>

<style lang="less" scoped>
    .expTab {
  margin: 20px 0px;
  display: flex;
  justify-content: center;
  .tabSide {
    position: relative;
    height: 80px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: #eef2f3;
    border-radius: 5px;
    width: 60%;
    color: forestgreen;
    .tabTextUnselect {
      z-index: 111;
      position: relative;
      color: #8e9eab;
      transition: all 1s;
    }
    .tabTextSelected {
      z-index: 111;
      position: relative;
      color: #333333;
      transition: all 1s;
    }
    .weather,
    .express {
      cursor: pointer;
      height: 70px;
      width: 90px;
      background: #eef2f3;
      border-radius: 6px;
      width: 49%;
      line-height: 68px;
      font-size: 30px;
      font-weight: bold;
    }
    .slider-default,
    .slider-right {
      position: absolute;
      height: 70px;
      background: #fff;
      border-radius: 6px;
      width: 49%;
      line-height: 68px;
      font-weight: bold;
      font-size: 30px;
      transition: all 1s;
      box-shadow: 0px 0px 5px 0px grey;
    }
    .slider-default {
      left: 0.8%;
      cursor: pointer;
    }
    .slider-right {
      left: 50.3%;
      cursor: pointer;
    }
  }
}
</style>