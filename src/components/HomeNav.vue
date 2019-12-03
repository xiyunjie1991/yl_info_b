<template>
  <div class="home_nav">
    <ul class="home_nav_list" ref="homenav">
      <router-link
        v-for="(item, index) in nav"
        class="home_nav_item"
        :key="index"
        :to="item.url + '/' +item.type"
        tag="li">
        <div class="line">{{item.text}}</div>
        <div class="under_line"></div>
        
        </router-link>
    </ul>
  </div>
</template>

<script>
import * as type from '../store/mutations_type.js'

export default {
  data () {
    return {
      nav: [
        // {url: '/home', type: 'info_cate', text: '推荐'},
        // {url: '/home', type: 'info_entertainment', text: '娱乐 '},
        // {url: '/home', type: 'info_car', text: '汽车'},
        // {url: '/home', type: 'info_finance', text: '财经'},
        // {url: '/home', type: 'info_education', text: '教育'},
				// {url: '/home', type: 'info_humor', text: '搞笑'},
				// {url: '/home', type: 'info_sports', text: '体育'},
				// {url: '/home', type: 'info_health', text: '养生'},
				// {url: '/home', type: 'info_constellation', text: '星座'},
        // {url: '/home', type: 'info_game', text: '游戏'},
        
        {url: '/taoNews', type: 'info_cate', text: '推荐'},
        {url: '/taoNews', type: 'info_entertainment', text: '娱乐 '},
        {url: '/taoNews', type: 'info_car', text: '汽车'},
        {url: '/taoNews', type: 'info_finance', text: '财经'},
        {url: '/taoNews', type: 'info_education', text: '教育'},
				{url: '/taoNews', type: 'info_humor', text: '搞笑'},
				{url: '/taoNews', type: 'info_sports', text: '体育'},
				{url: '/taoNews', type: 'info_health', text: '养生'},
				{url: '/taoNews', type: 'info_constellation', text: '星座'},
				{url: '/taoNews', type: 'info_game', text: '游戏'},
      ]
      // navPosition: 1
    }
  },
  watch: {
    $route (to, from) {
      if (!to.path.includes('taoNews') && from.path.includes('taoNews')) {
        this.$store.commit(type.SAVE_POSITION, {
          name: 'homenav',
          position: this.$refs.homenav.scrollLeft
        })
      } else if (to.path.includes('taoNews') && !from.path.includes('taoNews')) {
        this.$refs.homenav.scrollLeft = this.$store.state.positions.homenav
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/style/common.scss';

  .home_nav {
    position: fixed;
    top: px2rem(0px);
    left: 0;
    width: 100%;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.04);
    height: px2rem(80px);
    z-index: 200;
    background-color: white;
    text-align: center;
  }
  .home_nav_list {
    padding: 2px;
    display: flex;
    overflow: auto;
  }
  .home_nav_item {
  
    margin-top: px2rem(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    height: px2rem(80px);
    @include font-dpr(15px);
    flex-shrink: 0;
    flex-basis: px2rem(90px);
    color:  #7D7D7D;
  }
  .router-link-active {
  
    color: #333333;
    font-weight: bold;
  
  }
  .line{
     margin-top: px2rem(10px);
  }
  .under_line{
       width: px2rem(24px);
       margin-bottom: px2rem(24px);
  }
   .router-link-active .under_line{
    border-bottom: solid #FE6D6B  px2rem(4px); 
    border-radius:  px2rem(2px);
     width: px2rem(24px);
     margin-bottom: px2rem(24px);
  }
</style>
