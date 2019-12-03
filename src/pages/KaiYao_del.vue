<template>
  <div>
		<div class="content home_content">
			<c-loading v-show="loading" class="loading"></c-loading>
			<c-warning v-show="!loading && !ifReturnMsg" class="warning" @reload="getNews({type: $route.params.type, channel:'kaiyao'})"></c-warning>
			 <transition name="fadeIn">
         <c-newslist
          :listCon="listCon"
          v-show="!loading && ifReturnMsg"
					@event="loadmoreNews"
					:flag="loadmore"
					:ifFlag="ifReturnMore"></c-newslist>
			 </transition>
		</div>
	</div>
</template>

<script>
import CLoading from '../components/Loading.vue'
import CWarning from '../components/Warning.vue'
import CLoadmore from '../components/Loadmore.vue'
import CHomeNav from '../components/HomeNav.vue'
import CNewslist from '../components/Newslist.vue'
import { mapActions, mapState } from 'vuex'

export default {
	data () {
		return {
			touchPosition: 0
		}
	},
	components: {
		CLoading,
		CWarning,
		CLoadmore,
    CHomeNav,
    CNewslist
	},
	created () {
		let that = this;
		// 向下滑动使得新闻刷新
		document.body.addEventListener('touchstart', function (e) {
			if (!that.$route.params.type) return false;
			if (document.body.scrollTop <= 0) {
				that.touchPosition = e.touches[0].pageY;
				that.$refs.refresh.style.transition = '';
				document.body.addEventListener('touchmove', that.touchmove);
				document.body.addEventListener('touchend', that.touchend)
			}
		});
		let type = this.$route.params.type;
		// if (Object.keys(this.list[type]).length > 0) return false
		this.getNews({
			type: type,
      customerName:'kaiyao'
		})
	},
	watch: {
		$route (to, from) {
			if (to.path.includes('kaiyao')) {
				const type = to.params.type
				if (Object.keys(this.kaiyaoList[type]).length > 0) {
					this.$store.state.ifReturnMsg = true;
					return false
				}
				this.getNews({
					type: to.params.type,
          customerName:'kaiyao'
				})
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
			'getMoreNewsForKaiyao',
			'refreshNews'
		]),
		loadmoreNews () {
			this.getMoreNewsForKaiyao({
				type: this.$route.params.type,
        customerName:'kaiyao'
			})
		},
		touchmove (e) {
			if (!this.$route.params.type) return false;
			const disY = e.touches[0].pageY - this.touchPosition;
			const rotate = disY / 300 * 360;
			if (disY < 30) return false;
			this.$refs.refresh.style.transform = `translate(-50%, ${Math.min(disY, 200)}px) rotate(${rotate}deg)`
      console.log("scroll is listening...");
		},
		touchend (e) {
			// document.body.removeEventListener('touchmove', this.touchmove);
			// document.body.removeEventListener('touchend', this.touchend);
			if (!this.$route.params.type) return false;
			const disY = e.changedTouches[0].pageY - this.touchPosition;
			if (disY < 30) return false;
			this.$refs.refresh.style.transform = '';
			this.$refs.refresh.style.transition = 'transform 0.5s linear';
			if (disY < 200) return false;
			// this.refreshNews({
			// 	type: this.$route.params.type
			// })
      this.loadmoreNews();
		}
	},
	computed: {
		...mapState([
			'kaiyaoList',
			'loading',
			'ifReturnMsg',
			'loadmore',
			'ifReturnMore',
			'newsLength',
			'ifReturnRefresh',
			'typePositions'
		]),
		listCon () {
			return this.kaiyaoList[this.$route.params.type || '__all__']
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
    padding-top: px2rem(0px);
  }
</style>
