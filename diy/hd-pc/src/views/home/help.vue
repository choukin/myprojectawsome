<template>
  <el-container class="page-container">
    <el-tabs tab-position="left">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-home" /> 帮助中心首页</span>
        帮助中心首页
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-s-promotion" /> 快速入门</span>
        <h2>快速入门帮助列表</h2>
        <div>什么是H5</div>
        <div>
          H5是什么，具体包括哪些内容
          H5本指第5代html标准规范，但因为html5规则对视频音频和触屏互动等事件的支持远超前代，因此H5逐渐演变成一种可以在移动端展示的动态页面。

          现有的H5包括普通的幻灯片形式、需要简单点击的故事形式、用户能够参与的带有互交的功能形式、可以提交数据的表单形式、朋友圈流传的小游戏形式等。

          曾经引爆朋友圈的《我们之间就一个字》、《围住神经猫》等页面或者游戏，都是出色的H5作品。

          使用H5有哪些优势
          H5虽然在制作“小游戏”“邀请函”等方面有着突出的表现，但其优势绝不仅限于此，下面我将为您一一列举H5在企业宣传方面所独有的优势。

          故事性强

          H5作品的最根本目的就是向用户传递信息。比起普通的PPT和视频，H5因为其特效众多，场景切换方便，所以更加适合故事的讲述。一个优秀的故事性H5页面，通常能够极大引起用户的共鸣，达到意想不到的效果。

          参与感强

          H5作品与传统作品最明显的区别之一就是H5作品中拥有众多的互动功能。通过这些互动功能，用户可以深度参与到H5作品中，更为贴切的感受到您想要传达的信息，同时也会给用户留下更深的印象。参与感比较强的作品中最具有代表性的就是各类H5小游戏，但除小游戏之外也有许多优秀的作品可以促进用户的参与。

          活动方式多

          H5作品中拥有大量的活动插件，例如投票、表单、红包等功能。通过这些插件，H5能达到其他宣传途径遥不可及的宣传效果。在故事类H5和互动类H5日益频繁的今天，需要引起用户的注意必须让用户参与进您的运营活动。人人秀在H5活动功能中深入挖掘，率先推出了红包、照片投票、抽奖、问答测试等众多功能。

          社交性强

          与传统的通过电视广告、网络广告不同，目前绝对大多数的H5作品依托于用户的社交关系进行传播，用户自发分享是H5作品传播的重要途径。H5作品通过其极强的故事性和互动性，经常能够引起用户的兴趣，使其在用户的朋友圈中广泛传播。
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-notebook-2" /> 插件教程</span>
        插件教程</el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-question" /> 常见问题</span>
        定时任务补偿</el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-menu" /> 综合使用</span>
        定时任务补偿</el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
export default {
  name: 'Help',
  data() {
    return {
    }
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
.page-container{
  min-height: 500px;
  background-color: #fff;
  .index-title{
    padding:100px 0 50px 0;
    font-size: 34px;
    font-weight: 400;
    color: #333333;
  }
}
</style>
