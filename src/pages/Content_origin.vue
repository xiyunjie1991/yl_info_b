<template>
  <div class="detail">
    <c-back class="header"></c-back>
    <div class="container">
      <h2 class="detail-title">{{this.$route.params.title}}</h2>
      <div class="media_name">
        <img src="../../static/image/head.jpg" height="360" width="360" alt="" class="avatar_url">
        <span class="name" v-html="media_name"></span><br>
        <span class="date">{{datetime|dateFormat}}</span>
      </div>

      <div class="contentNews">
        <img v-for="(img, imgIdx) in image_list" v-lazy="img.url"
             style="width: 100%; object-fit: cover"
             v-if="image_list[imgIdx].mapping === -1">
        <div v-for="(para,paraIdx) in paras">
          <div v-html="para.para"></div>
          <img v-for="(img, imgIdx) in image_list" v-lazy="img.url"
               style="width: 100%; object-fit: cover"
               v-if="image_list[imgIdx].mapping === paraIdx">
        </div>
      </div>

      <div class="ann">
        <br>
        <p>版权与免责声明：</p>
        <p>本文内容转载自其他媒体，目的在于传递更多信息，并不代表本网赞同其观点或证实其内容的真实性。不承担此类作品侵权行为的直接责任及连带责任；</p>
      </div>

      <div class="zan">
        <Button type="ghost" size="large" icon="thumbsup" shape="circle" class="likeButton">{{repin_count}}</Button>
        <Button type="ghost" size="large" icon="trash-a" shape="circle" class="unlikeButton">不喜欢</Button>
      </div>

      <span v-if="this.adConfig.usingAd">
        <img src="/static/image/tuiya_ad01.gif" style="margin-top: 15px; width: 100%; height: 100%; object-fit: fill" v-on:click="openAd">
      </span>

    </div>

  </div>

</template>
<script>
import {mapActions, mapState, mapMutations} from 'vuex'
import CLoading from '../components/Loading.vue'
import CWarning from '../components/Warning.vue'
import CBack from '../components/Back.vue'
import CComment from '../components/Comment.vue'
import moment from 'moment'
import 'moment/locale/zh-cn'

export default {
  data () {
    return {
      ifModal: false
    }
  },
  components: {
    CLoading,
    CWarning,
    CBack,
    CComment
  },

  methods: {
    ...mapMutations([
      'ADD_COLLECTION',
      'REMOVE_COLLECTION'
    ]),
    ...mapActions([
      'getArticle'
    ]),
    media_name:function(){
      console.log("media_name: "+ this.$route.params.media_name);
      if(this.$route.params.media_name){
        return this.$route.params.media_name
      }else{
        return ''
      }
    },
    openAd () {
      window.open("https://engine.lvehaisen.com/index/activity?appKey=3ZVQvQpCY6C2TTMdYnTo4GPhvjyz&adslotId=315106");
    }
  },
  computed: {
    ...mapState([
      'article',
      'ifReturnMsg',
      'loading',
      'hasParagraph',
      'contentType',
      'localCollection',
      'adConfig'
    ]),
    media_name:function(){
      if(this.$route.params.media_name){
        return this.$route.params.media_name
      }else{
        return ''
      }
    },
    datetime:function(){
      return  this.$route.params.datetime;
    },
    abstract:function(){
      if(this.$route.params.brief){
        return this.$route.params.brief
      }else{
        return ''
      }
    },
    image_list:function(){
      if(this.$route.params.image_list){
        return this.$route.params.image_list
      }else{
        return ''
      }
    },
    paras:function(){
      if(this.$route.params.paras){
        return this.$route.params.paras
      }else{
        return ''
      }
    },
    // keywords:function(){
    //   if(this.$route.params.keywords){
    //     return this.$route.params.keywords
    //   }else{
    //     return ''
    //   }
    // },
    repin_count:function(){
      if(this.$route.params.repin_count){
        return this.$route.params.repin_count
      }else{
        return ''
      }
    },
    comment_count:function(){
      if(this.$route.params.comment_count){
        return this.$route.params.comment_count
      }else{
        return ''
      }
    }
  },
  filters: {
    dateFormat (time) {
      return moment(time).startOf('mimute').fromNow()
    }
  }
}
</script>

<style lang="less">
  @import "../assets/style/border.less";

.detail{
  .container {
    margin: 1.6rem auto 1.5rem;
    width: 94%;
    .detail-title {
      color: #000;
      font-size: 0.45rem;
      font-weight: bold;
    }
    .media_name {
      position: relative;
      margin-top: 0.4rem;
      .avatar_url {
        height: 1.1rem;
        width: 1.1rem;
        border-radius: 50%;
      }
      .name {
        position: absolute;
        font-size: 0.4rem;
        font-weight: bold;
        left: 1.3rem;
        top: 0.1rem;
      }
      .date {
        position: absolute;
        left: 1.3rem;
        top: 0.6rem;
      }
    }
    .contentNews {
      margin-top: 0.5rem;
      font-size: 0.4rem;
      color: #000;
      line-height: .7rem;
      img {
        text-align: center;
        display: block;
        width: 70%;
        margin: 0.2rem auto;
      }
    }
    .main_content {
      clear: both;
      font-size: 0.4rem;
      p {
        text-indent: 0.6rem;
        padding: 0.3rem 0;
      }
    }
    .keywords {
      margin-top: 0.5rem;
      line-height: 0.6rem;
      span {
        margin-bottom: 0.3rem;
        text-align: center;
        margin-right: 0.1rem;
        display: inline-block;
        border: 1px solid #f0f0f0;
        background: #f6f6f6;
        padding: 0 0.2rem;
        border-radius: 0.1rem;
      }
    }
    .ann {
      color: #aaaaaa;
    }
    .zan{
      margin-top: .5rem;
      margin-bottom: .5rem;
      text-align: center;
      botton{
        color: #ffffff;
        padding-right: 1rem;
      }
    }
    .likeButton{
      font-size: 0.4rem;
      margin-right: 2rem;
    }
    .unlikeButton {
      font-size: 0.4rem;
    }
  }
}
</style>

