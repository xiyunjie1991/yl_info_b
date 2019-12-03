<template>
  <!--  <div style="width: 100%; height: 100%; background-color: #f0f0f0; ">-->
  <div class="content-container">
    <div class="detail">
      <c-loading v-show="loading" class="loading"></c-loading>
      <c-warning v-show="!loading && !ifReturnMsg" class="warning" @reload="getDetail()"></c-warning>
      <div v-show="!loading && ifReturnMsg">
        <div class="container">
          <h2 class="detail-title">{{detail.title}}</h2>
          <div class="media_name">
            <span class="name" v-html="media_name"></span>
            <span class="date">{{datetime|dateFormat}}</span>
          </div>

          <div class="contentNews" id="contFromParas">
            <img
              v-for="(img, imgIdx) in image_list"
              v-lazy="img.url"
              style="width: 80vw; object-fit: cover"
              v-if="image_list[imgIdx].mapping === -1"
            />
            <div v-for="(para,paraIdx) in paras">
              <div v-html="para.para"></div>
              <img
                v-for="(img, imgIdx) in image_list"
                v-lazy="img.url"
                style="width: 80vw; object-fit: cover"
                v-if="image_list[imgIdx].mapping === paraIdx"
              />
            </div>
          </div>

          <!-- <div class="ann">
            <br />
            <p>版权与免责声明：</p>
            <p>本文内容转载自其他媒体，目的在于传递更多信息，并不代表本网赞同其观点或证实其内容的真实性。不承担此类作品侵权行为的直接责任及连带责任；</p>
          </div>

          <div class="zan">
            <Button
              type="ghost"
              size="large"
              icon="thumbsup"
              shape="circle"
              class="likeButton"
              @click="like()"
            >{{repin_count}}</Button>
            <Button type="ghost" size="large" icon="trash-a" shape="circle" class="unlikeButton">不喜欢</Button>
          </div> -->

          <span v-if="this.adFilterRule.usingAd && this.adFilterRule.usingAd_Tuiya">
            <img
              src="/static/image/tuiya_ad01.gif"
              style="margin-top: 15px; width: 100%; height: 100%; object-fit: fill"
              v-on:click="openAd"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import CLoading from "../components/Loading.vue";
import CWarning from "../components/Warning.vue";
import CBack from "../components/Back.vue";
import CComment from "../components/Comment.vue";
import moment from "moment";
import VueBetterScroll from "../components/BScroll";
import "moment/locale/zh-cn";
import { AdFilterRule } from "../store/adengine/AdFilterRule";

export default {
  inject: ["reload"],
  data() {
    return {
      ifModal: false,
      listenScrollObj: true,
      detail: null,
      adFilterRule: AdFilterRule
    };
  },
  created() {
    this.getDetail();
  },
  mounted() {
    this.removePerson();

    // setTimeout(function () {
    //   var sogou_div3 = document.getElementById("sogou_wap_1078766");
    //   window.sogou_un = window.sogou_un || [];
    //   window.sogou_un.push({id: "1078754",ele:sogou_div3});
    // }, 1000);
  },
  components: {
    CLoading,
    CWarning,
    CBack,
    CComment,
    VueBetterScroll
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
    openAd() {
      window.open(
        "https://engine.lvehaisen.com/index/activity?appKey=3ZVQvQpCY6C2TTMdYnTo4GPhvjyz&adslotId=315106"
      );
    },
    like() {
      let html = document.getElementById("ylcont");
    }
  },
  computed: {
    ...mapState([
      "article",
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
.detail {
  .container {
    margin-top: 0px;
  }
}
</style>

