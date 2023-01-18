<template>
  <div>
    <h1>我是首页</h1>
    <ul class="list">
      <li v-for="item in firstpageData" :key="item.id">
        <div @click="handleDetail(item.name)">姓名: {{ item.name }}</div>
        <div>年龄：{{ item.age }}</div>
        <div>爱好：{{ item.hobby }}</div>
        <div>爱车：{{ item.car }}</div>
      </li>
    </ul>
    <DetailContent :name="name" style="margin: 20px 0px" />
    <t-loading text="加载中..." size="26px" :loading="pageLoading">
      <ul class="githubArea">
        <li
          v-for="(val, index) in headData"
          :key="val.id"
          @click="detailPerson(index, val.type)"
        >
          <div>id：{{ val.id }}</div>
          <img :src="val.avatar_url" alt="" />
        </li>
      </ul>
    </t-loading>
    <h1 @click="handlLogout" style="cursor: pointer" v-if="!!headData">登出</h1>
  </div>
</template>

<script>
import firstpageData from "@/mock/firstpageData";
import DetailContent from "../../components/firstpageCPT/DetailContent.vue";
import { getHeadImg } from "../../services/api";
export default {
  created() {
    this.getHeadImgData();
  },
  components: {
    DetailContent,
  },
  data() {
    return {
      pageLoading: false,
      firstpageData,
      name: "NULL",
      reqKeyWords: {
        q: "carlos",
      },
      headData: "",
    };
  },
  methods: {
    handleDetail(props) {
      this.name = props;
    },
    handlLogout() {
      sessionStorage.removeItem("token");
      this.$router.push("/");
    },
    getHeadImgData() {
      this.pageLoading = true;
      getHeadImg(this.reqKeyWords).then((res) => {
        this.pageLoading = false;
        if (res.status == 200 && res.data.items) {
          this.headData = res.data.items;
        } else {
          this.$message.error(res.status);
        }
      });
    },
    detailPerson(id, type) {
      this.$router.push({
        path: "/about",
        query: {
          id,
          type,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  li {
    display: flex;
    justify-content: space-evenly;
  }
}
.githubArea {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style-type: none;
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
