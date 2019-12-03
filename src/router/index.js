import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Search from '../pages/Search'
import Collect from '../pages/Collect'
import Session from '../pages/Session'
import About from '../pages/About'
import Content from '../pages/Content.vue'
import * as type from '../store/mutations_type.js'
import store from '../store/index.js'
import KaiYao from "../pages/KaiYao";
import TaoNews from "../pages/TaoNews";
import B1 from "../pages/B1";
import Content_kaiyao from "../pages/Content_kaiyao";

Vue.use(Router);

const routes = [
  // {
  //   path: '/home/:type',
  //   name: 'home',
  //   component: Home
  // },
  {
    path: '/taoNews/:type',
    name: 'taoNews',
    component: Home
  },
  {
    path: '/kaiyao/:type',
    name: 'kaiyao',
    component: KaiYao
  },
  {
    path: '/b1/:type',
    name: 'b1',
    component: B1
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/collect',
    name: 'collect',
    component: Collect
  },
  {
    path: '/session',
    name: 'session',
    component: Session
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/content',
    name: 'content',
    component: Content
  },
  {
    path: '/content_kaiyao',
    name: 'content_kaiyao',
    component: Content_kaiyao
  },
  {
    path: '*',
    redirect: '/taoNews/info_cate'
  }
];

const router = new Router({
  routes
});

let curContentId = -1;

router.beforeEach((to, from, next) => {
  debugger;
  if(to.fullPath.indexOf("/kycont") !== -1) {
    let href = to.fullPath.replace('kycont', 'content_kaiyao');
    window.open('#' + href, '_blank');
  }
  else {
    next();
    if (to.name === from.name && to.fullPath !== from.fullPath) {
      window.location.reload();
    }
  }
});

export default router
