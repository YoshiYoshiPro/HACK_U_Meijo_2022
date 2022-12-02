import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import TaskView from "@/views/TaskView.vue";
import GameView from "@/views/GameView.vue";
import LoginView from "@/views/LoginView.vue";
import NoteView from "@/views/NoteView.vue";

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
    path: "/note",
    name: "note",
    component: NoteView,
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
  store.commit("setUserUid", localStorage.uuid);
  store.commit("setUserName", localStorage.name);
  store.commit("setUserPhoto", localStorage.photo);

  let currentUserStatus = store.getters["isLoggedIn"];
  let requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  console.log(currentUserStatus);
  console.log(store.getters["getUserUid"]);
  if (currentUserStatus != "") {
    next();
  } else if (!requiresAuth) {
    next();
  } else if (requiresAuth && !currentUserStatus) {
    next("/login");
  } else {
    next();
  }
});

export default router;
