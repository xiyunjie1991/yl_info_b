<template>
  <div :id="id"> </div>
</template>

<script>
export default {
  props:{
    id:''
  },
    mounted(){
      var script = document.createElement("script"); //创建一个script标签
      script.type = "text/javascript";
      script.src = "https://rengdkl.com/qiongqiong_3n4e1vb4bsi/js/banner.js";
      document.getElementById(this.id).appendChild(script);
    }
 
 
};
</script>
