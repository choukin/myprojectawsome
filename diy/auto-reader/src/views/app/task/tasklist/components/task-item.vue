<template>
  <van-cell
    @click="pushWindow('taskdetail',{id:task.id})"
  >
    <template slot="icon">
      <div class="icon-number">
        <van-image
          fit="fill"
          round
          width=".9rem"
          height=".9rem"
          :src="task.contUrl||'https://b.yzcdn.cn/vant/icon-demo-1126.png'"
        />
      </div>
    </template>
    <template slot="title">
      {{ task.contName }}
      <div> {{ task.exposureIng }}人已赚 剩余{{ task.targetExposure- task.exposureIng }}个</div>
    </template>
    <template>
      <div style="color:gold;">
        赚{{ task.earningsPrice }}元
      </div>
    </template>
    <template #right-icon>
      <van-icon
        name="arrow"
        style="line-height:inherit;"
      />
    </template>
  </van-cell>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {  Cell,Image as VanImage, Icon } from 'vant'
import {pushWindowByRouter} from '@/utils/app.ts'
// eslint-disable-next-line no-unused-vars
import { Task } from '@/types/index'
@Component({
  name: 'task-item',
  filters: {
    task: (value: string)=>{
      return  value=='1'?'gold':(value=='2'?'silver':'copper')
    }
  },
  components:{
    [Cell.name]: Cell,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon

  }
})
export default class task extends Vue {
  @Prop({default:0})
  private index: number = 0
  @Prop({default:{index:0,headimgurl: '',
    nickname: '',
    sumamount: 0}})
  private task?: Task

  
  public async created() {
    // console.log(this.task?.index)
  }
  pushWindow(path: string,query: any) {
    pushWindowByRouter(path, query)
  }

}
</script>
<style scoped lang="scss">
  .van-cell{
    align-items: center;
    .icon-number{
      min-width: .4rem;
      text-align: center;
          display: flex;
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
      flex:3;
      flex-direction: column;
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
