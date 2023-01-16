<template>
  <div class="page">
    <t-form
      :data="formData"
      ref="form"
      @reset="onReset"
      @submit="onSubmit"
      :colon="true"
      :labelWidth="0"
      style="width: 20%"
    >
      <t-form-item name="account">
        <t-input
          clearable
          v-model="formData.account"
          placeholder="请输入账户名"
        >
          <desktop-icon slot="prefix-icon"></desktop-icon>
        </t-input>
      </t-form-item>
      <t-form-item name="password">
        <t-input
          type="password"
          clearable
          v-model="formData.password"
          placeholder="请输入密码"
        >
          <lock-on-icon slot="prefix-icon"></lock-on-icon>
        </t-input>
      </t-form-item>
      <t-form-item>
        <t-button
          type="reset"
          variant="outline"
          theme="primary"
          style="margin-right: 20px"
          >重置</t-button
        >
        <t-button
          style="width: 100%"
          theme="primary"
          type="submit"
          :loading="loginLoading"
          :disabled="loginLoading"
          >登录</t-button
        >
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import { DesktopIcon, LockOnIcon } from "tdesign-icons-vue";
// import * as api from "../../services/api";

export default {
  components: {
    DesktopIcon,
    LockOnIcon,
  },
  data() {
    return {
      loginLoading: false,
      formData: {
        account: "",
        password: "",
      },
      reqKeyWord: {
        // 查询头像参数
        q: "",
      },
    };
  },

  methods: {
    onReset() {
      this.$message.success("重置成功");
    },
    onSubmit({ validateResult, firstError }) {
      const {
        formData: { account, password },
        reqKeyWord,
      } = this;
      reqKeyWord.q = account;
      // loading 和 disable 开启
      this.loginLoading = true;
      if (validateResult === true) {
        if (account === "carlos" && password === "123456") {
            sessionStorage.setItem("token", password);
            this.$router
              .push({
                path: "/firstpage",
                query: {
                
                },
              })
          this.loginLoading = false;
        } else {
          this.$message.error("请检查您输入的信息");
          this.loginLoading = false;
        }
      } else {
        console.log("Errors: ", validateResult);
        this.$message.warning(firstError);
        this.loginLoading = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bgi.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
