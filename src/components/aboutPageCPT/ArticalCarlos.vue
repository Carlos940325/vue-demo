<template>
  <div class="articlePage">
    <div class="express" @click="$router.push('/express')"></div>
    <t-divider></t-divider>
    <t-loading :loading="articleData ? false : true">
      <div style="font: 50px bolder;margin-bottom: 30px;">{{ articleData.title }}</div>
      <h3>{{ articleData.body }}</h3>
    </t-loading>
  </div>
</template>

<script>
import { getArticleById } from "../../services/culture";

export default {
  mounted() {
    this.getArticle();
  },
  props: {
    prop: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      articleData: "",
    };
  },
  methods: {
    getArticle() {
      const { id } = this.prop;
      getArticleById(id).then((res) => {
        this.articleData = res.data;
        console.log(this.articleData);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.articlePage {
  height: 100vh;
  width: 100%;
}
.express {
  background: url("../../assets/express.jpeg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 400px;
  cursor: pointer;
}
</style>
