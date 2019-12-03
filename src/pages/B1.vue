<template>
  <div>
		<div class="content">
      <c-home-nav></c-home-nav>
			 <transition name="fadeIn">
         <main class="position-box">
           <vue-better-scroll class="wrapper"
                              ref="scroll"
                              :pullUpLoad="pullUpLoadObj"
                              :startY="parseInt(startY)"
                              :listen-scroll="listenScrollObj"
                              @pulling-up="onPullingUp">
             <c-newslist
              :listCon="listCon"
              :customer-name="customerName"
              :type="this.$route.params.type"
              v-show="!loading && ifReturnMsg"
              @event="loadmoreNews"
              :flag="loadmore"
              :ifFlag="ifReturnMore">
             </c-newslist>
           </vue-better-scroll>
         </main>

       </transition>
		</div>
	</div>
</template>

<script>
import CLoading from '../components/Loading.vue'
import CWarning from '../components/Warning.vue'
import CHomeNav from '../components/B1Nav.vue'
import CNewslist from '../components/Newslist.vue'
import VueBetterScroll from '../components/BScroll'
import { mapActions, mapState } from 'vuex'

export default {
	data () {
		return {
			// touchPosition: 0
      customerName:'b1',

      listenScrollObj: true,

      // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
      pullDownRefreshObj: {
        threshold: 90,
        stop: 40,
        txt: '已刷新'
      },

      // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: '加载更多...',
          noMore: '没有更多数据啦'
        }
      },
      startY: 0, // 纵轴方向初始化位置
      scrollToTime: 700
		}
	},
	components: {
		CLoading,
		CWarning,
    CHomeNav,
    CNewslist,
    VueBetterScroll
	},
	created () {
    this.getNewest();
  },

	watch: {
		$route (to, from) {
			if (to.path.includes(this.customerName)) {
				const type = to.params.type;
				if (Object.keys(this.list[type]).length > 0) {
					this.$store.state.ifReturnMsg = true;
					return false
				}
				this.getNewest();
			}
		},
		ifReturnRefresh (val, oldVal) {
			if (val && this.newsLength) {
				this.$Message.success(`为您刷新${this.newsLength}条信息`)
			}
		}
	},
	methods: {
		...mapActions([
			'getNews',
			'getMoreNewsForB1',
			'refreshNews'
		]),

    getNewest () {
      let type = this.$route.params.type;
      this.getNews({
        type: type,
        customerName:this.customerName
      })
        .then(res =>{
          this.$refs.scroll.forceUpdate(true);
        });
    },
		loadmoreNews () {
			this.getMoreNewsForB1({
				type: this.$route.params.type,
        customerName: this.customerName
			})
        .then(res => {
          if (this.loadmore === true) {
            this.$refs.scroll.forceUpdate(true)
          } else {
            this.$refs.scroll.forceUpdate(false)
          }
        });
		},

    onPullingUp() {
      // 模拟上拉 加载更多数据
      console.log('上拉加载');
      this.loadmoreNews();
    }
	},
	computed: {
		...mapState([
			'list',
			'loading',
			'ifReturnMsg',
			'loadmore',
			'ifReturnMore',
			'newsLength',
			'ifReturnRefresh',
			'typePositions'
		]),
		listCon () {
			return this.list[this.$route.params.type || '__all__']
		}
	},
	// 离开页面时，记录新闻的类型
	beforeRouteLeave (to, from, next) {
		this.$store.commit('LOG_TYPE', from.params.type)
		next()
	}
}
</script>
<style lang="scss">
	@import '../assets/style/common.scss';
  .home_content {
    padding-top: px2rem(80px);
  }

  .position-box {
    position: fixed;
    top: px2rem(100px);
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
