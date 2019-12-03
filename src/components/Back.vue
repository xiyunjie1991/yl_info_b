<template>
  <div class="myBack">
    <span @click="$router.back()"><Icon type="chevron-left" class="back-btn"></Icon></span>
  </div>
</template>
<style lang="scss">
  @import '../assets/style/common.scss';

  .myBack {
    border-bottom: 1px solid #ddd;
    background: #fff;
  }
  .back-btn {
    padding-top: px2rem(10px);
    font-size: px2rem(40px);
    line-height: px2rem(80px);
    text-indent: px2rem(10px);
    margin-left: px2rem(15px);
    color: #aaa;
    cursor: pointer;
  }
</style>

