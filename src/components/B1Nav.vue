<template>
  <div class="home_nav">
    <ul class="home_nav_list" ref="b1nav">
      <router-link
        v-for="(item, index) in nav"
        class="home_nav_item"
        :key="index"
        :to="item.url + '/' +item.type"
        tag="li">{{item.text}}</router-link>
    </ul>
  </div>
</template>

<script>
import * as type from '../store/mutations_type.js'

export default {
  data () {
    return {
      customerName:'b1',
      nav: [
        // 综合展示渠道
        {url: '/b1', type: 'info_entertainment', text: '娱乐 '},
        {url: '/b1', type: 'info_car', text: '汽车'},
        {url: '/b1', type: 'info_finance', text: '财经'},
        {url: '/b1', type: 'info_education', text: '教育'},
				{url: '/b1', type: 'info_humor', text: '搞笑'},
				{url: '/b1', type: 'info_sports', text: '体育'},
				// {url: '/home', type: 'info_cate', text: '美食'},
				// {url: '/home', type: 'info_society', text: '社会'},
				{url: '/b1', type: 'info_health', text: '养生'},
				{url: '/b1', type: 'info_constellation', text: '星座'},
				{url: '/b1', type: 'info_game', text: '游戏'},
      ]
      // navPosition: 0
    }
  },
  watch: {
    $route (to, from) {
 
      if (!to.path.includes(this.customerName) && from.path.includes(this.customerName)) {
        this.$store.commit(type.SAVE_POSITION, {
          name: 'b1nav',
          position: this.$refs.b1nav.scrollLeft
        })
      } else if (to.path.includes(this.customerName) && !from.path.includes(this.customerName)) {
        this.$refs.b1nav.scrollLeft = this.$store.state.positions.b1nav
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';

  .home_nav {
    position: fixed;
    top: px2rem(0px);
    left: 0;
    width: 100%;
    height: px2rem(80px);
    background: #eee;
    z-index: 200;
    text-align: center;
  }
  .home_nav_list {
    display: flex;
    overflow: auto;
  }
  .home_nav_item {
    margin-top: px2rem(10px);
    line-height: px2rem(60px);
    text-align: center;
    @include font-dpr(18px);
    flex-shrink: 0;
    flex-basis: px2rem(90px);
    color: black;
  }
  .router-link-active {
    color: tomato;
    font-weight: bold;
  }
</style>
