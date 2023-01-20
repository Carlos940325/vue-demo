<template>
  <div>
    <t-card>
    <t-loading text="加载中..." size="26px" :loading="pageLoading">
      <ul class="githubArea">
        <li
          v-for="val in headData"
          :key="val.id"
        >
          <div>id：{{ val.id }}</div>
          <img :src="val.avatar_url" alt="" />
        </li>
      </ul>
    </t-loading>
  </t-card>
  </div>
</template>

<script>
import { getHeadImg } from "../../services/api";
export default {
  created() {
    this.getHeadImgData();
  },
  data() {
    return {
      pageLoading: false,
      reqKeyWords: {
        q: "carlos",
      },
      headData: "",
    };
  },
  methods: {
    getHeadImgData() {
      this.pageLoading = true;
      getHeadImg(this.reqKeyWords).then((res) => {
        this.pageLoading = false;
        if (res.status == 200 && res.data.items) {
          this.headData = res.data.items.slice(0,20);
          this.$emit("getDataTag", true);
        } else {
          this.$message.error(res.status);
        }
      });
    },
    // detailPerson(id, type) {
    //   this.$router.push({
    //     path: "/firstpage/about",
    //     query: {
    //       id,
    //       type,
    //     },
    //   });
    // },
  },
};
</script>

<style lang="less" scoped>
.githubArea {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style-type: none;
  overflow-y: auto;
  li {
    margin: 10px;
    img {
      height: 200px;
      width: 200px;
      border-radius: 8px;
      border: 1px solid sandybrown;
    }
  }
}
</style>
