<template>
  <div>
    <img class="cat-ad" @click="openCatAd" :src="imgList[mathRandom(0,4)]" />
  </div>
</template>

<script>
import catAd1 from "@/assets/ad/1.png";
import catAd2 from "@/assets/ad/2.png";
import catAd3 from "@/assets/ad/3.png";
import catAd4 from "@/assets/ad/4.png";
import catAd5 from "@/assets/ad/5.png";
import { randomNum } from "@/utils/mathUtil";
export default {
  data() {
    return {
      mathRandom: randomNum,
      imgList: [catAd1, catAd2, catAd3, catAd4, catAd5]
    };
  },
  methods: {
    openCatAd() {
      window.open(
        "https://i.iwanbei.cn/activities/?appKey=d2edfebb1b244cd9a43a9ec03b0e8aa9&appEntrance=1&business=money"
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
    .cat-ad{
       margin:  px2rem(20px) 0 0 0;
        width: 100%;
        height:auto;
      }
</style>