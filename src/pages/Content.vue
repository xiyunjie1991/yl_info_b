<template>
  <!--  <div style="width: 100%; height: 100%; background-color: #f0f0f0; ">-->
  <div class="content-container">
    <div class="detail">
      <!-- <c-back class="header"></c-back> -->
      <c-loading v-show="loading" class="loading"></c-loading>
      <c-warning v-show="!loading && !ifReturnMsg" class="warning" @reload="getDetail()"></c-warning>

      <div v-show="!loading && ifReturnMsg">
        <div class="container">
          <!-- <span v-if="this.adFilterRule.usingAd && this.adFilterRule.usingAd_Tuiya">
            <img
              :src="ruleExecEngine.randGetOneAd_tuiya().path"
       
              style="margin-top: 15px; width: 100%; height: 100%; object-fit: fill"
              v-on:click="openAd"
            />
          </span>-->

          <h2 class="detail-title">{{detail.title}}</h2>
          <!-- <baidu-ad></baidu-ad> -->
          <div class="media_name">
            <span class="name" v-html="media_name"></span>
            <!-- <span class="date">{{datetime|dateFormat}}</span> -->
          </div>
            <cat-ad></cat-ad>
            <!-- <sougou-ad ></sougou-ad> -->
          <div class="contentNews" id="contFromParas">
            <img
              v-for="(img, imgIdx) in image_list"
              :src="img.url"
              style="width: 100%;border-radius: 4px; object-fit: cover"
              v-if="image_list[imgIdx].mapping === -1"
            />
            <div class="paras" v-for="(para,paraIdx) in paras">
              <div v-html="para.para"></div>
              <img
                v-for="(img, imgIdx) in image_list"
                :src="img.url"
                style="width: 100%;  border-radius: 4px; object-fit: cover"
                v-if="image_list[imgIdx].mapping === paraIdx"
              />
            </div>
          </div>

          <div class="ann">
            <br />
            <p>版权与免责声明：</p>
            <p>本文内容转载自其他媒体，目的在于传递更多信息，并不代表本网赞同其观点或证实其内容的真实性。不承担此类作品侵权行为的直接责任及连带责任。</p>
          </div>

          <!-- <div class="zan">
            <Button
              type="ghost"
              size="large"
              icon="thumbsup"
              shape="circle"
              class="likeButton"
              @click="like()"
            >{{repin_count}}</Button>
            <Button type="ghost" size="large" icon="trash-a" shape="circle" class="unlikeButton">不喜欢</Button>
          </div>-->
          <div class="line"></div>
          <tui-ya-ad></tui-ya-ad>
       

          <!-- <div v-if="this.adFilterRule.usingAd && this.adFilterRule.usingAd_Sogou">
            <div
              v-if="isAppleDevice"
              :style="{display:'inline-flex', justifyContent: 'space-around', marginTop: 20*scale_w+'px', height: 130*scale_w+'px', width: '100%'}"
            >
              <div
                :style="{width: 1/scale_w*100+'%', height: 130/scale_w + 'px', transform:'scale('+scale_w+')'}"
                id="sogou_wap_1078754"
              ></div>
            </div>
            <div
              v-else
              style="margin-top: 10px; display: inline-flex; justify-content: space-around; width: 100%; height: 130px"
              id="sogou_wap_1078754"
            ></div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import CLoading from "../components/Loading.vue";
import CWarning from "../components/Warning.vue";
import moment from "moment";
import "moment/locale/zh-cn";
import { AdFilterRule } from "../store/adengine/AdFilterRule";
import { RuleExecEngine } from "../store/adengine/RuleExecEngine";
import { randomNum } from "../utils/mathUtil";
import CatAd from "../components/ad/CatAd.vue"
import TuiYaAd from "../components/ad/TuiYaAd.vue"
import BaiduAd from "../components/ad/BaiduAd.vue"
import SougouAd from "../components/ad/SougouAd.vue"





export default {
  inject: ["reload"],
  data() {
    return {
      sougouAd1:'sogou_wap_1081165',
      mathRandom:randomNum,
        ifModal: false,
      listenScrollObj: true,
      detail: null,
      adFilterRule: AdFilterRule,
      ruleExecEngine: RuleExecEngine,
      screenWidth: 0,
      scale_w: 1,
      isAppleDevice: navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad)/i
      )
    };
  },
  created() {
    this.screenWidth = window.screen.width;
    switch (window.screen.width) {
      case 320: {
        this.scale_w = 1;
        break;
      }
      case 375: {
        this.scale_w = 2;
        break;
      }
      default: {
        this.scale_w = 3;
        break;
      }
    }

    this.getDetail();
  },
  mounted() {
    this.removePerson();

    setTimeout(function() {
      var sogou_div3 = document.getElementById("sogou_wap_1078754");
      window.sogou_un = window.sogou_un || [];
      window.sogou_un.push({ id: "1078754", ele: sogou_div3 });
      
    }, 1000);
  },
  components: {
    CLoading,
    CWarning,
    CatAd,
    TuiYaAd,
    BaiduAd,
    SougouAd
  },

  methods: {
    ...mapMutations(["ADD_COLLECTION", "REMOVE_COLLECTION"]),
    ...mapActions(["getOneNews"]),
    removePerson() {
      this.reload();
    },
    getDetail: function() {
      let type = this.$route.query.type;
      let idText = this.$route.query.id;
      let id = idText.slice(6);
      this.getOneNews({
        type: type,
        start: id,
        end: (parseInt(id) + 1).toString()
      }).then(res => {
        this.detail = res[0];
      });
    },
    like() {
      let html = document.getElementById("ylcont");
    }
  },
  computed: {
    ...mapState([
      "ifReturnMsg",
      "loading",
      "hasParagraph",
      "contentType",
      "localCollection",
      "adConfig"
    ]),
    media_name: function() {
      return this.detail.author.length === 0
        ? this.detail.source
        : this.detail.author;
    },

    datetime: function() {
      return this.detail.publishtime;
    },
    image_list: function() {
      return this.detail.image_list;
    },
    paras: function() {
      return this.detail.paras;
    }
  },
  watch: {
    $route: function() {
      this.getDetail();
    }
  },
  filters: {
    dateFormat(time) {
      return moment(time)
        .startOf("mimute")
        .fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";
@import "../assets/style/content.scss";
</style>

