<template>
  <div>
    <div>
      <!--      <c-home-nav></c-home-nav>-->
      <transition name="fadeIn">
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

      </transition>
    </div>
  </div>
</template>

<script>
import CLoading from "../components/Loading.vue";
import CWarning from "../components/Warning.vue";
import CNewslist from "../components/Newslist.vue";
import MescrollVue from "mescroll.js/mescroll.vue";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      // touchPosition: 0
      customerName: "kaiyao",
      mescroll: null,
      dList: [],
      upConfig: {
        noMoreSize: 5,
        callback: this.upCallBack,
        htmlContent:
          '<p class="downwarp-progress"></p><p class="downwarp-tip"></p>'
      },
      downConfig: {}
    };
  },
  components: {
    CLoading,
    CWarning,
    CNewslist,
    MescrollVue
  },

  watch: {
    $route(to, from) {
      if (to.path.includes(this.customerName)) {
        const type = to.params.type;
        if (Object.keys(this.kaiyaoList[type]).length > 0) {
          this.$store.state.ifReturnMsg = true;
          this.dList = this.list[type];
          return false;
        }
        this.getNewest();
      }
    }
  },
  methods: {
    ...mapActions(["getNews", "getMoreNewsForKaiyao", "refreshNews"]),
    upCallBack(p, mescroll) {
      this.getMoreNewsForKaiyao({
        type: this.$route.params.type,
        customerName: this.customerName
      }).then(res => {
        this.$nextTick(() => {
          this.dList = this.dList.concat(res);
          if (mescroll.num == 1) this.pdList = [];
          mescroll.endSuccess(p.size, this.loadmore);
        });
      });
    },
    downCallback(p, mescroll) {
      this.getNews({
        type: this.$route.params.type,
        customerName: this.customerName
      }).then(res => {
        this.$nextTick(() => {
          this.dList = res;
          mescroll.endSuccess(res.length, this.loadmore);
        });
      });
    },
    getNewest() {
      let type = this.$route.params.type;
      this.getNews({
        type: type,
        customerName: this.customerName
      }).then(res => {
            this.dList = res;
      });
    },
      mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
  },

  computed: {
    ...mapState([
      "kaiyaoList",
      "loading",
      "ifReturnMsg",
      "loadmore",
      "ifReturnMore",
      "newsLength",
      "ifReturnRefresh",
      "typePositions"
    ]),

  },
  // 离开页面时，记录新闻的类型
  beforeRouteLeave(to, from, next) {
    this.$store.commit("LOG_TYPE", from.params.type);
    next();
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";

.position-box {
  position: fixed;
  top: px2rem(0px);
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
