import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.alertStatus) next();
      else {
        store.commit("ALERT", true);
        store.commit("TRACK_ROUTE", {
          warning: true,
          log: `Unauthorized Attempt "/route-logs" -- ${new Date().toLocaleString()}`,
        });
        next({ path: from.FullPath });
      }
    },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: ":id",
        name: "Chart",
        component: () => import("../components/Chart.vue"),
        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
