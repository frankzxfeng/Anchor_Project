import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

//获取原型对象上的push函数
const originalPush = Router.prototype.push;
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const Login = () => import("views/login/Login");
const Home = () => import("../components/content/home/Home");
const MessageBack = () => import("views/messageBack/MessageBack");
const CallBack = () => import("views/callBack/CallBack");
const Erro = () =>import("views/erro/Erro");

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "/home",
          component: MessageBack
        },
        {
          path: "/messageback",
          component: MessageBack
        },
        {
          path: "/callback",
          component: CallBack
        }
      ]
    },
    {
      path: "/erro",
      component: Erro
    }
  ],
  mode: "hash",
});

export default router;
