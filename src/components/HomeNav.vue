<template>
  <div class="home_nav" >
    <ul class="home_nav_list" ref="homenav">
      <router-link
        v-for="(item, index) in channelList"
        class="home_nav_item"
        :key="index"
        :to=" '/'+url + '/' +item.type"
        tag="li"
      >
        <div class="line">{{item.text}}</div>
        <div class="under_line"></div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import * as type from "../store/mutations_type.js";

export default {
  created() {
    this.url = this.$route.params.customerName;
    this.channelList = this.navObj[this.url];
  },
  watch: {
    $route(to, from) {
      this.url = to.params.customerName;
      this.channelList = this.navObj[this.url];
    }
  },
  data() {
    return {
      url: "",
      channelList: [],
      navObj: {
        home: [
          { type: "info_car", text: "汽车" },
          { type: "info_education", text: "教育" },
          { type: "info_health", text: "养生" },
          { type: "info_constellation", text: "星座" },
          { type: "info_game", text: "游戏" }
        ],
        taoNews: [
          { type: "info_cate", text: "推荐" },
          { type: "info_entertainment", text: "娱乐 " },
          { type: "info_car", text: "汽车" },
          { type: "info_finance", text: "财经" },
          { type: "info_education", text: "教育" },
          { type: "info_humor", text: "搞笑" },
          { type: "info_sports", text: "体育" },
          { type: "info_health", text: "养生" },
          { type: "info_constellation", text: "星座" },
          { type: "info_game", text: "游戏" }
        ],
        quanmama: [
          { type: "info_cate", text: "推荐" },
          { type: "info_entertainment", text: "娱乐 " },
          { type: "info_car", text: "汽车" },
          { type: "info_finance", text: "财经" },
          { type: "info_education", text: "教育" },
          { type: "info_humor", text: "搞笑" },
          { type: "info_sports", text: "体育" },
          { type: "info_health", text: "养生" },
          { type: "info_constellation", text: "星座" },
          { type: "info_game", text: "游戏" }
        ],
        baixintoutiao: [
          { type: "info_cate", text: "推荐" },
          { type: "info_entertainment", text: "娱乐 " },
          { type: "info_car", text: "汽车" },
          { type: "info_finance", text: "财经" },
          { type: "info_education", text: "教育" },
          { type: "info_humor", text: "搞笑" },
          { type: "info_sports", text: "体育" },
          { type: "info_health", text: "养生" },
          { type: "info_constellation", text: "星座" },
          { type: "info_game", text: "游戏" }
        ],
        kaiyao: []
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";

.home_nav {
  position: fixed;
  top: px2rem(0px);
  left: 0;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  height: px2rem(80px);
  @include font-dpr(15px);
  flex-shrink: 0;
  flex-basis: px2rem(90px);
  color: #7d7d7d;
}
.router-link-active {
  color: #333333;
  font-weight: bold;
}
.line {
  margin-top: px2rem(10px);
}
.under_line {
  width: px2rem(24px);
  margin-bottom: px2rem(24px);
}
.router-link-active .under_line {
  border-bottom: solid #fe6d6b px2rem(4px);
  border-radius: px2rem(2px);
  width: px2rem(24px);
  margin-bottom: px2rem(24px);
}
</style>
