<template>
  <van-cell>
    <template slot="icon">
      <div class="icon-number">
        <van-icon
          v-if="Number(ranking.index)<=3"
          class-prefix="iconfont"
          :name="ranking.index|ranking"
        />
        <template v-else>
          {{ ranking.index }}
        </template>
      </div>
    </template>
    <template slot="title">
      <van-image
        radius="50%"
        fit="fill"
        width=".45rem"
        :src="ranking.headimgurl||'https://b.yzcdn.cn/vant/icon-demo-1126.png'"
      />
      {{ ranking.nickname }}
    </template>
    <template>
      <div class="gold-text">
        <van-icon
          name="gold-coin"
          color="gold"
        />{{ ranking.sumamount }}
      </div>
    </template>
  </van-cell>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {  Cell,Image as VanImage, Icon } from 'vant'
// eslint-disable-next-line no-unused-vars
import { IRanking } from '@/types/index'
@Component({
  name: 'ranking-item',
  filters: {
    ranking: (value: string)=>{
      return  value=='1'?'gold':(value=='2'?'silver':'copper')
    }
  },
  components:{
    [Cell.name]: Cell,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon

  }
})
export default class Ranking extends Vue {
  @Prop({default:0})
  private index: number = 0
  @Prop({default:{index:0,headimgurl: '',
    nickname: '',
    sumamount: 0}})
  private ranking?: IRanking

  
  public async created() {
    // console.log(this.ranking?.index)
  }

}
</script>
<style scoped lang="scss">
  .van-cell{
    align-items: center;
    .icon-number{
      min-width: .4rem;
      text-align: center;
    }
    .iconfont{
      font-size: .4rem;
    }
    .iconfont-gold{
      color:gold
    }
    .iconfont-silver{
      color:silver
    }
    .iconfont-copper{
      color:#f7976f
    }
    .van-cell__title{
      padding-left:.3rem;
      display: flex;
      flex:2;
      align-items:center;
      .van-image {
        margin-right:.2rem;
        
      }
    }
    .van-cell__value{
      text-align: left;
      .van-icon-gold-coin{
        margin-right:.2rem;
      }
    }

  }
</style>
