import Vue from "vue";
import VueRouter from "vue-router";
import carlosLogin from "../views/login/carlosLogin.vue";
import { message } from "tdesign-vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: carlosLogin,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/firstpage",
    name: "firstpage",
    component: () => import("../views/firstPage/FirstPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由守卫

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    if (to.path == "/") {
      next();
    } else {
      next("/");
      message.error("请先登录！");
    }
  } else {
    if (to.path == "/") {
      next("/firstpage");
      message.error("您已经登陆，请勿重复登录，如需切换账户，请先退出");
    } else {
      next();
    }
  }
});

export default router;
