<template>
   <div
            v-if="isAppleDevice"
            :style="{display:'inline-flex', justifyContent: 'space-around', marginTop: 20*scale_w+'px', height: 130*scale_w+'px', width: '100%'}"
          >
            <div
              :style="{width: 1/scale_w*100+'%', height: 130/scale_w + 'px', transform:'scale('+scale_w+')'}"
              id="sogou_wap_1081210"
            ></div>
          </div>
          <div
            v-else
            style="margin-top: 10px; display: inline-flex; justify-content: space-around; width: 100%; height: 130px"
            id="sogou_wap_1081210"
          ></div>
</template>

<script>
export default {
  props: {
    id: ""
  },
  data(){
      return {
        scale_w:1,
         isAppleDevice: navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad)/i
      )
      }
  },
  created(){
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
  mounted() {
    setTimeout(function() {
    var sogou_div = document.getElementById("sogou_wap_1081210"); 
	window.sogou_un = window.sogou_un || [];
	window.sogou_un.push({id: "1081210",ele:sogou_div});
  },200)
  }
}
</script>
