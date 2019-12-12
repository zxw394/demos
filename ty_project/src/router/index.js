import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/taskManage"
  },
  {
    path: "/taskManage",
    name: "taskManage",
    component: () => import(/* webpackChunkName: "taskManage" */ "@/components/pages/TaskManage"),
  },
  {
    path: "/myTask",
    name: "myTask",
    component: () => import(/* webpackChunkName: "taskManage" */ "@/components/pages/MyTask"),
  },
  {
    path: "/resource",
    name: "resource",
    component: () => import(/* webpackChunkName: "resource" */ "@/components/pages/Resource"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
