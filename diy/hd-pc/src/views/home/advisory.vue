<template>
  <el-container style="flex-direction: column;padding:0 50px 50px;">
    <el-card class="card-box">
      <div slot="header" class="clearfix">
        <span>人民日报:中国科技 自立自强</span>
      </div>
      <div>
        党的十九届五中全会提出:“坚持创新在我国现代化建设全局中的核心地位,把科技自立自强作为国家发展的战略支撑,面向世界科技前沿、面向经济主战场、面向国家重大需求、面...
        <el-button type="text" @click="open">查看更多，3元/篇</el-button>
      </div>
    </el-card>
    <el-card class="card-box">
      <div slot="header" class="clearfix">
        <span>以科技力量托举梦想——走近2020年“最美科技工作者”(下)</span>
      </div>
      <div>
        他们,是全国9100万科技工作者的优秀代表,他们是新时代科学家精神的践行者,他们的品质与精神之光,照亮了科技星空。新华社记者近日走近一些“最美科技工作者”,记录他... <el-button type="text" @click="open">查看更多，3元/篇</el-button>
      </div>
    </el-card>
    <el-card class="card-box">
      <div slot="header" class="clearfix">
        <span>年轻人,科技强国@你</span>
      </div>
      <div>
        “十四五”规划和二〇三五年远景目标的建议提出:完善国家创新体系,加快建设科技强国。其中,打好关键核心技术攻坚战、加强基础研究、激发人才创新活力、加强学风建设、弘... <el-button type="text" @click="open">查看更多，3元/篇</el-button>
      </div>
    </el-card>
    <el-card class="card-box">
      <div slot="header" class="clearfix">
        <span>科技,重塑我们的生活</span>
      </div>
      <div>
        科技不仅开拓未知边界,也改变了每个人的生活。曾以为距离老百姓生活十分遥远的尖端科技,在关键时刻与我们并肩作战、攻克难关。今年,一场突如其来的新冠肺炎疫情,给... <el-button type="text" @click="open">查看更多，3元/篇</el-button>
      </div>
    </el-card>
  </el-container>
</template>

<script>

export default {
  name: 'Advisory',
  // components: { HomeNavbar },
  data() {
    return {
      bannerdesc: require('@/assets/home_images/index/qrcode.jpeg')
    }
  },
  created() {

  },
  methods: {
    open() {
      this.$alert(`<img style="width:300px;" src="${this.bannerdesc}"/>`, '', {
        dangerouslyUseHTMLString: true,
        center: true
      })
    }
  }
}
</script>

<style lang="scss">
.el-header{
    padding:0;
}
.el-main{
  padding:0;
}

</style>
<style lang="scss" scoped>
.card-box{
  margin-top: 40px;
}

</style>
