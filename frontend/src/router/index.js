import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import TaskView from "@/views/TaskView.vue";
import GameView from "@/views/GameView.vue";
import LoginView from "@/views/LoginView.vue";

// import firebase from "firebase/app";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/task",
    name: "task",
    component: TaskView,
    meta: { requiresAuth: true },
  },
  {
    path: "/game",
    name: "game",
    component: GameView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  // {
  //   path: "*",
  //   redirect: "/",
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    //戻るによる遷移は以前の位置を保持
    if (savedPosition) {
      return savedPosition;
    } else {
      if (to.hash) {
        return { selector: to.hast };
      } else {
        return { x: 0, y: 0 };
      }
    }
  },
});

router.beforeEach((to, from, next) => {
  // firebase.onAuth();
  let currentUserStatus = store.getters["isSignedIn"];
  let requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (!requiresAuth) {
    next();
  } else if (requiresAuth && !currentUserStatus) {
    next("/login");
  } else {
    next();
  }
});

export default router;
