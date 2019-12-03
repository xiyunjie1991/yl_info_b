<template>
  <div>
    <div id="sss">
      <c-home-nav></c-home-nav>
      <!-- <transition name="fadeIn"> -->

      <mescroll-vue class="position-box" ref="mescroll" @init="mescrollInit" :up="upConfig">
        <c-newslist
          :listCon="dList"
          :customer-name="customerName"
          :type="this.$route.params.type"
          v-show="!loading && ifReturnMsg"
          :flag="loadmore"
          :ifFlag="ifReturnMore"
        ></c-newslist>
      </mescroll-vue>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import CLoading from "../components/Loading.vue";
import CWarning from "../components/Warning.vue";
import CHomeNav from "../components/HomeNav.vue";
import CNewslist from "../components/Newslist.vue";
import MescrollVue from "mescroll.js/mescroll.vue";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      oldCount: 0,
      mescroll: {
        up: {
          lazyLoad: {
            use: true, // 是否开启懒加载,默认false
            attr: "src", // 网络地址的属性名 (图片加载成功会移除该属性): <img imgurl='网络图  src='占位图''/>
            showClass: "mescroll-lazy-in", // 图片加载成功的显示动画: 渐变显示,参见mescroll.css
            delay: 500, // 列表滚动的过程中每500ms检查一次图片是否在可视区域,如果在可视区域则加载图片
            offset: 1400 // 超出可视区域200px的图片仍可触发懒加载,目的是提前加载部分图片
          }
        }
      },
      // customerName: "home",
      customerName: "taoNews",
      dList: [],
      upConfig: {
        noMoreSize: 5,
        offset: 30,
        callback: this.upCallBack,
        htmlContent:
          '<p class="downwarp-progress"></p><p class="downwarp-tip"></p>'
      },
      downConfig: {
        mustToTop: true
      }
    };
  },
  components: {
    CLoading,
    CWarning,
    CHomeNav,
    CNewslist,
    MescrollVue
  },
  mounted() {
    console.info('home mounted scrollY',this.scrollY)
  },
  watch: {
    $route(to, from) {
      if (to.path.includes(this.customerName)) {
        const type = to.params.type;
        if (Object.keys(this.list[type]).length > 0) {
          this.$store.state.ifReturnMsg = true;
          this.dList = this.list[type];
          this.mescroll.scrollTo( this.scrollY, 300 )
                    return false;
        }
        this.getNewest();
      }
    }
  },
  methods: {
    ...mapActions(["getNews", "getMoreNews", "refreshNews","updateScrollY"]),
    upCallBack(p, mescroll) {
      this.getMoreNews({
        type: this.$route.params.type,
        customerName: this.customerName
      }).then(res => {
        this.$nextTick(() => {
          console.info("res");
          // if (this.dList.length >= 1) {
          //   this.dList = this.dList.slice(this.dList.length-11,this.dList.length-1)

          // }
          console.info("this.dList", this.dList);
          let resLength = 0;

          for (let item of res) {
            let {
              title,
              media_name,
              comment_count,
              publishtime,
              image_list,
              divid_sogouad,
              ad_tuiya,
              ad_sogou
            } = item;
            const obj = {
              title,
              media_name,
              comment_count,
              publishtime,
              image_list,
              divid_sogouad,
              ad_tuiya,
              ad_sogou
            };
            this.dList.push(obj);
            resLength++;
          }
          this.oldCount = this.oldCount + resLength;
          console.info("dList,oldCount", this.oldCount);
          debugger;
          // if (resLength < 40) {

          //   mescroll.endSuccess(this.oldCount, false);

          // } else {
          //   mescroll.endSuccess(this.oldCount, true);
          // }

          if (this.dList.length > 80) {
            mescroll.endSuccess(this.dList.length, false);
          } else {
            mescroll.endSuccess(this.dList.length, true);
          }
        });
      });
    },
    downCallback(p, mescroll) {
      this.getNews({
        type: this.$route.params.type,
        customerName: this.customerName
      }).then(res => {
        // this.$nextTick(() => {
        // this.dList = res
        this.dList = this.dList.concat(res);
        mescroll.endSuccess(p.length, false);
        // });
      });
    },
    getNewest() {
      let type = this.$route.params.type;
      this.getNews({
        type: type,
        customerName: this.customerName
      }).then(res => {
        debugger;

        this.dList = res;
      });
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    }
  },
  computed: {
    ...mapState([
      "scrollY",
      "list",
      "loading",
      "ifReturnMsg",
      "loadmore",
      "ifReturnMore",
      "newsLength",
      "ifReturnRefresh",
      "typePositions"
    ])
  },
  // 离开页面时，记录新闻的类型
  beforeRouteLeave(to, from, next) {
    this.$store.commit("LOG_TYPE", from.params.type);
    next();
    if (to.path.includes("content") === -1) {
      this.updateScrollY(this.mescroll.getScrollTop()) ;
    } else {
       this.updateScrollY(this.mescroll.getScrollTop(0)) ;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";

.position-box {
  position: fixed;
  top: px2rem(100px);
  left: 0;
  right: 0;
  bottom: 0;
  height: auto;
}
</style>
