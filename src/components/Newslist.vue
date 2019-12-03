<template>
  <div class="newsList">
    <ul>
      <router-link
        v-for="(item, index) in listCon"
        :key="index"
        :to="{
        path: (customerName==='kaiyao') ? '/kycont' : '/content',
        name: (customerName==='kaiyao') ? 'kycont' : 'content',
        query:
        {
            customerName: customerName,
            id: (100000+Math.floor(Math.random()*800000)).toString() + index.toString(),
            type: type
        }
        }"
        tag="li"
        class="news_box"
        v-show="item.title"
      >
        <!-- 两张图片 --> 
        <div class="double_img_out" v-if="item.image_list.length===2">
          <div class="double_img_title_and_info">
            <div class="news_title" v-html="item.title"></div>
            <div class="news_info">
              <span class="media_name" v-html="item.media_name"></span>
              <span class="comment_count">评论 {{item.comment_count}}</span>
              <!-- <span class="datetime">{{item.publishtime|dateFormat}}</span> -->
            </div>
          </div>
          <img :src="item.image_list[0].url" class="inner_img" />
        </div>

        <div class="one_img_out" v-else-if="item.image_list.length===1">
          <div class="news_title" v-html="item.title"></div>
          <img :src="item.image_list[0].url" class="only_img" />
          <div class="news_info">
            <span class="media_name" v-html="item.media_name"></span>
            <span class="comment_count">评论 {{item.comment_count}}</span>
            <!-- <span class="datetime">{{item.publishtime|dateFormat}}</span> -->
          </div>
        </div>

        <div class="more_img_out" v-else-if="item.image_list.length > 2">
          <div class="news_title" v-html="item.title"></div>
          <div class="news_imgs">
            <img
              class="inner_img"
              v-if="imgIdx < 3"
              v-for="(imgItem,imgIdx) in item.image_list"
              :src="imgItem.url"
              :key="imgIdx"
            />
          </div>
          <div class="news_info">
            <span class="media_name" v-html="item.media_name"></span>
            <span class="comment_count">评论 {{item.comment_count}}</span>
            <!-- <span class="datetime">{{item.publishtime|dateFormat}}</span> -->
          </div>
        </div>
        <div v-if="item.ad_tuiya !== undefined">
          <div class="line"></div>
          <span v-on:click.prevent="openAd(item.ad_tuiya.href)">
            <img
              v-lazy="item.ad_tuiya.path"
              style="margin-top: 15px; width: 100%; height: 100%; object-fit: fill"
            />
          </span>
        </div>
     
        <div v-if="item.ad_sogou !== undefined">
             <!-- <baidu-ad :id="baiduId()"></baidu-ad> -->
          <div class="line"></div>
          <div
            v-if="isAppleDevice"
            :style="{display:'inline-flex', justifyContent: 'space-around', marginTop: 20*scale_w+'px', height: 130*scale_w+'px', width: '100%'}"
          >
            <div
              :style="{width: 1/scale_w*100+'%', height: 130/scale_w + 'px', transform:'scale('+scale_w+')'}"
              :id="item.divid_sogouad"
            ></div>
          </div>
          <div
            v-else
            style="margin-top: 10px; display: inline-flex; justify-content: space-around; width: 100%; height: 130px"
            :id="item.divid_sogouad"
          ></div>
        </div>
        <div class="line"></div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CLoadmore from "./Loadmore.vue";
import BaiduAd from "../components/ad/BaiduAd.vue";
import moment from "moment";

export default {
  props: {
    // 新闻列表
    listCon: {
      require: true
    },
    // 是否可以请求更多
    ifLoadmore: {
      default: true
    },
    // 是否请求
    flag: {
      require: true
    },
    // 请求是否成功
    ifFlag: {
      require: true
    },
    // 渠道
    customerName: {
      require: true
    },
    // 类型
    type: {
      require: true
    }
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
  },
  data() {
    return {
      // newsList: [],
      baiduAdCount:0,
      newsCount: 0,
      screenWidth: 0,
      scale_w: 1,
      isAppleDevice: navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad)/i
      )
    };
  },

  computed: {
    ...mapState(["loadmore", "ifReturnMore", "adConfig"])
  },
  methods: {
    baiduId(){
      this.baiduAdCount ++
      return "baidu"+ this.baiduAdCount

       
    },
    openAd(url) {
      window.open(
        url // "https://engine.lvehaisen.com/index/activity?appKey=3ZVQvQpCY6C2TTMdYnTo4GPhvjyz&adslotId=315106"
      );
    }
  },

  components: {
    // CLoadmore
    BaiduAd
  },
  filters: {
    dateFormat(time) {
      return moment(time)
        .startOf("mimute")
        .fromNow();
    }
  },
  watch: {
    listCon: function(newVal, oldVal) {
      let oldLen = this.newsCount;
      let newLen = newVal.length;
      this.newsCount = newLen;
      this.$nextTick(() => {
        for (let index = oldLen; index < newVal.length; index++) {
          let item = newVal[index];
          if (item.ad_sogou !== undefined) {
            console.info('item.ad_sogou.slotId',item.ad_sogou.slotId)
            let sogou_div = document.getElementById(item.divid_sogouad);
            window.sogou_un = window.sogou_un || [];
            window.sogou_un.push({ id: item.ad_sogou.slotId, ele: sogou_div });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.adIframe {
  width: 100%;
}
</style>
