import Vue from "vue";
import VueRouter from "vue-router";
import CarlosLogin from "../views/login/CarlosLogin.vue";
import { message } from "tdesign-vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: CarlosLogin,
  },

  {
    path: "/firstpage",
    name: "firstpage",
    redirect: "/firstpage/dashboard", // 进入首页默认进入哪一个子路由页面
    component: () => import("../views/firstPage/FirstPage.vue"),
    children: [
      {
        path: "/firstpage/dashboard",
        name: "dashboard",
        component: () => import("../views/dashboard/DashBoard.vue"),
      },
      {
        path: "/firstpage/default",
        name: "firstpageDefaultPage",
        meta: {},
        component: () => import("../components/firstpageCPT/DetailContent.vue"),
      },
      {
        path: "/firstpage/about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
      },
      {
        path: "/firstpage/express",
        name: "express",
        component: () => import("../views/express/ExpressCarlos.vue"),
      },
      {
        path: "/firstpage/tableList",
        name: "tableList",
        component: () => import("../views/tableList/TableCarlos.vue"),
      },
    ],
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
