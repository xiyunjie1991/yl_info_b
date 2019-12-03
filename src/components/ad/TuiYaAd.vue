<template>
    <img
      :src="imgList[mathRandom(0,7)]"
      style="margin-top: 15px; width: 100%; height: 100%; object-fit: fill"
      @click="openAd"
    />
</template>

<script>
import tuiya_ad01 from "@/assets/tuiya/tuiya_ad01.gif";
import tuiya_ad02 from "@/assets/tuiya/tuiya_ad02.png";
import tuiya_ad03 from "@/assets/tuiya/tuiya_ad03.jpg";
import tuiya_ad04 from "@/assets/tuiya/tuiya_ad04.jpg";
import tuiya_ad05 from "@/assets/tuiya/tuiya_ad05.png";
import tuiya_ad06 from "@/assets/tuiya/tuiya_ad06.png";
import tuiya_ad07 from "@/assets/tuiya/tuiya_ad07.gif";
import tuiya_ad08 from "@/assets/tuiya/tuiya_ad08.png";
import { randomNum } from "@/utils/mathUtil";
export default {
  data() {
    return {
      mathRandom: randomNum,
      imgList: [
        tuiya_ad01,
        tuiya_ad02,
        tuiya_ad03,
        tuiya_ad04,
        tuiya_ad05,
        tuiya_ad06,
        tuiya_ad07,
        tuiya_ad08
      ]
    };
  },
  mounted(){
  },
  methods: {
    openAd() {
      window.open(
        "https://engine.lvehaisen.com/index/activity?appKey=3ZVQvQpCY6C2TTMdYnTo4GPhvjyz&adslotId=315106"
      );
    }
  }
};
</script>
<style lang="scss" scoped>

</style>