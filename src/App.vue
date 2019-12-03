<template>
  <div id="app">
    <transition :name="page">
      <keep-alive>
        <router-view v-if="isRouterAlive" class="container"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
// import CFooter from './components/Footer.vue'
import CTop from './components/Top.vue'

export default {
  name: 'app',

  provide(){
    return {
      reload: this.reload
    }
  },

  data () {
    return {
      page: '',
      isRouterAlive: true
    }
  },

  methods: {
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  },

  components: {
    // CFooter,
  },
  watch: {
    $route (to, from) {
      if (to.path.includes('content')) {
        this.page = 'content-right'
      } else if (from.path.includes('content')) {
        this.page = 'content-left'
      } else {
        this.page = 'fadeIn'
      }
    }
  }
}
</script>

<style lang="scss">
  @import './assets/style/common.scss';
  @import './assets/style/newsList.scss';
  @import './assets/style/global.scss';
  @import './assets/style/transition.scss';

</style>
