import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Content from '../pages/Content.vue'
import * as type from '../store/mutations_type.js'
import store from '../store/index.js'
import TaoNews from "../pages/TaoNews";

Vue.use(Router);

const routes = [
  // {
  //   path: '/home/:type',
  //   name: 'home',
  //   component: Home
  // },

  {
    path: '/:customerName/:type',
    name: 'news',
    component: TaoNews
  },
  {
    path: '/content',
    name: 'content',
    component: Content
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
    // if (to.name === from.name && to.fullPath !== from.fullPath) {
    //   window.location.reload();
    // }
  }
});

export default router
