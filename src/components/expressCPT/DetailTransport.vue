<template>
  <div>
    <h1 style="margin-top: 20px">物流查询</h1>
    <t-divider />
    <div class="expContent">
      <t-select
        class="expSelect"
        v-model="selectedVal"
        :options="expressOptions"
        clearable
        placeholder="请选择快递公司"
      >
        <div slot="panelTopContent" style="padding: 6px 6px 0 6px">
          <t-input
            v-model="searchVal"
            placeholder="请输入关键词搜索"
            @change="onSearch"
          />
        </div>
      </t-select>
      <t-input class="expNumber" v-model="expNumber" placeholder="请输入物流单号" clearable @enter="onEnter" />
      <t-button @click="handleGetTransportInfo" style="margin-top: 25px"> 搜索物流 </t-button>
    </div>
  </div>
</template>

<script>
import { getExpressDetail } from "../../services/tool";
const OPTIONS = [
  { label: "申通", value: "shentong" },
  { label: "EMS", value: "ems" },
  { label: "顺丰", value: "shunfeng" },
  { label: "圆通", value: "yuantong" },
  { label: "中通", value: "zhongtong" },
  { label: "韵达", value: "yunda" },
  { label: "天天", value: "tiantian" },
  { label: "汇通", value: "huitongkuaidi" },
  { label: "德邦", value: "debangwuliu" },
  { label: "宅急送", value: "zhaijisong" },
];
export default {
  data() {
    return {
      expressOptions: OPTIONS,
      selectedVal: "",
      searchVal: "",
      expNumber: ''
    };
  },
  methods: {
    onSearch() {
      this.expressOptions = OPTIONS.filter(
        (item) => item.label.indexOf(this.searchVal) !== -1
      );
    },
    onEnter() {
      console.log('trigger enter');
    },
    // onChange(val) {
    //   console.log(this.expNumber, val);
    // },
    handleGetTransportInfo() {
      let obj = {
        // com: this.selectedVal,
        hao: this.expNumber
      }
      getExpressDetail(obj).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.expSelect,.expNumber {
  width: 50%;
  margin-bottom: 25px;
}
.expContent {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
