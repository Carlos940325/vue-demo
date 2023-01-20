<template>
  <div style="width: 100%">
    <t-card style="height: 100%;" :class="[currentTab == 'exp' ? 'selectExp' : 'selectWth']" >
      <TabCarlos @selectedTab="getTabName" />
      <keep-alive>
      <DetailTransport v-if="currentTab == 'exp'" />
      <WeatherCarlos v-else />
    </keep-alive>
    </t-card>
  </div>
</template>

<script>
import TabCarlos from "@/components/TabCarlos.vue";
import DetailTransport from "../../components/expressCPT/DetailTransport.vue";
import WeatherCarlos from "../../components/expressCPT/WeatherCarlos.vue";
export default {
  components: {
    DetailTransport,
    TabCarlos,
    WeatherCarlos,
  },
  data() {
    return {
      currentTab: "exp",
    };
  },
  methods: {
    getTabName(data) {
      this.currentTab = data;
    },
  },
};
</script>

<style lang="less" scoped>
  .selectExp{
    background-color: #fff;
    transition: all 3s;
  }
  .selectWth {
    background:linear-gradient(rgb(24, 50, 89), rgb(52, 130, 186));
    transition: all 3s;
  }
</style>
