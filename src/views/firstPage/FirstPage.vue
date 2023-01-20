<template>
  <div>
    <t-layout style="height: 100vh">
      <t-header>
        <t-head-menu value="item1" height="120px">
          <img
            slot="logo"
            width="136"
            class="logo"
            src="https://www.tencent.com/img/index/menu_logo_hover.png"
            alt="logo"
          />
          <t-menu-item value="item1">已选内容</t-menu-item>
          <t-menu-item value="item2">菜单内容一</t-menu-item>
          <t-menu-item value="item3">菜单内容二</t-menu-item>
          <t-menu-item value="item4" :disabled="true">菜单内容三</t-menu-item>
          <template #operations>
            <div v-if="$route.fullPath === '/firstpage/default' ? true : false">
              <span class="searchTip"
                >点我可以筛选哦<icon name="arrow-right"
              /></span>
              <a href="javascript:;"
                ><icon class="t-menu__operations-icon" name="search"
              /></a>
            </div>

            <a href="javascript:;"
              ><icon class="t-menu__operations-icon" name="notification-filled"
            /></a>
            <a href="javascript:;" @click="handlLogout"
              ><icon class="t-menu__operations-icon" name="logout"
            /></a>
          </template>
        </t-head-menu>
      </t-header>
      <t-layout>
        <t-aside style="border-top: 1px solid var(--component-border)">
          <t-menu
            theme="light"
            :defaultValue="menuActiveName"
            :collapsed="collapsed"
            @change="changeHandler"
            height="550px"
            width="180px"
          >
            <template #logo>
              <img
                width="100%"
                :src="iconUrl"
                alt="logo"
                style="height: 100%; border-radius: 3px"
              />
            </template>
            <t-menu-group title="Main Nav">
              <t-menu-item
                value="dashboard"
                to="/firstpage/dashboard"
              >
                <template #icon>
                  <icon name="app" />
                </template>
                仪表盘
              </t-menu-item>
            </t-menu-group>
            <t-menu-group title="Check Nav">
              <t-submenu title="查询组" value="2-1">
                <template #icon>
                  <icon name="server" />
                </template>
                <t-menu-item value="default" to="/firstpage/default"
                  >获取接口数据</t-menu-item
                >
                <t-menu-item value="about" to="/firstpage/about?id=1"
                  >文章页</t-menu-item
                >
                <t-menu-item value="expressWeather" to="/firstpage/express">工具查询</t-menu-item>
                <!-- <t-menu-item value="2-1-4">树状筛选列表项</t-menu-item> -->
              </t-submenu>
              <t-menu-item value="2-2">
                <template #icon>
                  <icon name="edit-1" />
                </template>
                表单项
              </t-menu-item>
              <t-menu-item value="2-3">
                <template #icon>
                  <icon name="root-list" />
                </template>
                详情页
              </t-menu-item>
              <t-menu-item value="2-4">
                <template #icon>
                  <icon name="check" />
                </template>
                结果页
              </t-menu-item>
            </t-menu-group>
            <t-menu-group title="More">
              <t-menu-item value="item3">
                <template #icon>
                  <icon name="user" />
                </template>
                个人页
              </t-menu-item>
              <!-- <t-menu-item value="item4">
                <template #icon>
                  <icon name="login" />
                </template>
                登录页
              </t-menu-item> -->
            </t-menu-group>
            <template #operations>
              <t-button
                class="t-demo-collapse-btn"
                variant="text"
                shape="square"
                @click.native="changeCollapsed"
              >
                <icon name="view-list" />
              </t-button>
            </template>
          </t-menu>
        </t-aside>
        <t-layout>
          <t-content class="routerContent">
            <!-- <DetailContent /> -->
            <keep-alive>
              <router-view />
            </keep-alive>
          </t-content>
          <t-footer
            >Copyright @ 2019-{{ new Date().getFullYear() }} Tencent. All Rights
            Reserved</t-footer
          >
        </t-layout>
      </t-layout>
    </t-layout>
  </div>
</template>

<script>
// import firstpageData from "@/mock/firstpageData";
import { Icon } from "tdesign-icons-vue";
export default {
  created() {
    if (this.$router.currentRoute.fullPath !== "/firstpage/dashboard") {
      this.$router.push("/firstpage/dashboard");
    }
  },
  mounted() {},
  components: {
    Icon,
  },
  data() {
    return {
      menuActiveName: "/firstpage/dashboard",
      headData: false,
      collapsed: false,
      iconUrl: require("../../assets/logo.jpeg"),
      menuLogo: require("../../assets/logo.jpeg"),
      miniLogo: require("../../assets/mini_logo.png"),
    };
  },
  methods: {
    isData(data) {
      this.headData = data;
    },
    handlLogout() {
      sessionStorage.removeItem("token");
      this.$router.push("/");
    },
    changeHandler(active) {
      console.log("change", active);
      this.menuActiveName = active;
    },
    changeCollapsed() {
      this.collapsed = !this.collapsed;
      this.iconUrl = this.collapsed ? this.miniLogo : this.menuLogo;
    },
  },
};
</script>

<style lang="less" scoped>
.t-layout__sider {
  width: unset;
}
.t-layout__footer {
  padding: 13.5px;
}
.routerContent {
  display: flex;
  padding: 13.5px 13.5px 0px 13.5px;
  height: 1px;
  overflow-y: auto;
}
.searchTip {
  color: firebrick;
  font-size: large;
  font-weight: bold;
  animation: tipMove 4s ease forwards;
}
@keyframes tipMove {
  0% {
    opacity: 1;
  }
  15% {
    opacity: 0.2;
  }
  30% {
    opacity: 1;
  }
  45% {
    opacity: 0.2;
  }
  60% {
    opacity: 1;
  }
  75% {
    opacity: 0.2;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
