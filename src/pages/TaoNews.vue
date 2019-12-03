<template>
  <div>
    <div id="sss">
      <c-home-nav></c-home-nav>
        <mescroll-vue class="position-box" ref="mescroll" @init="mescrollInit" :up="upConfig">
          <c-newslist
            :listCon="dList"
            :customer-name="this.$route.params.customerName"
            :type="this.$route.params.type"
            v-show="!loading && ifReturnMsg"
            :flag="loadmore"
            :ifFlag="ifReturnMore"
          ></c-newslist>
        </mescroll-vue>
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
      oldCount:0,
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
  mounted(){

  },
  watch: {
    $route(to, from) {
        const type = to.params.type;
        console.info('to type',type)
        if (Object.keys(this.list[type]).length > 0) {
          this.$store.state.ifReturnMsg = true;
          this.dList = this.list[type];
                console.info('tthis.scrollY',this.scrollY)
           this.mescroll.scrollTo( this.scrollY, 200 )
          return false;
        }
        this.getNewest();
    }
  },
  methods: {
    ...mapActions(["getNews", "getMoreNews", "refreshNews","updateScrollY"]),
    upCallBack(p, mescroll) {
      this.getMoreNews({
        type: this.$route.params.type,
        customerName: this.$route.params.customerName 
      }).then(res => {
        this.$nextTick(() => {
          // if (this.dList.length >= 1) {
          //   this.dList = this.dList.slice(this.dList.length-11,this.dList.length-1)
          // }
          let resLength = 0
          for (let item of res) {
          let  {title,media_name,comment_count,publishtime,image_list,divid_sogouad,ad_tuiya,ad_sogou} = item
            const obj = {title,media_name,comment_count,publishtime,image_list,divid_sogouad,ad_tuiya,ad_sogou}
             this.dList.push(obj)
             resLength++
          }
          this.oldCount = this.oldCount + resLength
          debugger
          // if (resLength < 40) {
            
          //   mescroll.endSuccess(this.oldCount, false);
            
          // } else {
          //   mescroll.endSuccess(this.oldCount, true);
          // }

          if(resLength < 10){
            mescroll.endSuccess(this.dList.length , false);
          }else{
            mescroll.endSuccess(this.dList.length , true);
          }

        });
      });
    },
    downCallback(p, mescroll) {
      this.getNews({
        type: this.$route.params.type,
        customerName: this.$route.params.customerName
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
        customerName: this.$route.params.customerName
      }).then(res => {
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
    debugger
    this.$store.commit("LOG_TYPE", from.params.type);
  
    if (to.path.includes("content") === -1) {
      this.updateScrollY(0) ;
    } else {
       this.updateScrollY(this.mescroll.getScrollTop()) ;
    }
      next();
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
