<template>
  <!-- 居中 -->
  <van-row
    class="sign"
    type="flex"
    justify="center"
  >
    <van-col
      v-for="(day, index) in weekdays"
      :key="index"
      type="flex"
      
      span="6"
    >
      <van-row
        type="flex"
        justify="center"
        class="sign-wrapper"
        :class="strDateList.includes(day)?'active':''"
      >
        <i class="left-line" />
        <div class="sign-tag">
          <van-icon
            name="success"
            :color="signDateList.includes(day)?'#F98558':''"
          />
        </div>
        <i class="right-line" />
      </van-row>
      <van-row
        type="flex"
        justify="center"
      >
        {{ day }}
      </van-row>      
    </van-col>  
  </van-row>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import { Tab, Tabs, List, Cell,Image as VanImage, Icon, Grid, GridItem, Swipe, SwipeItem, Tag, Dialog,Lazyload,Calendar,Button, Col, Row  } from 'vant'
// eslint-disable-next-line no-unused-vars
import { IRanking, MyPageInfo, ADInfo } from '@/types/index'
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});
@Component({
  name: 'sign',
  components:{
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [List.name]: List,
    [Cell.name]: Cell,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Swipe.name]: Swipe, 
    [SwipeItem.name]: SwipeItem,
    [Tag.name]: Tag,
    [Dialog.Component.name]: Dialog.Component,
    [Calendar.name]:Calendar,
    [Button.name]:Button,
    [Col.name]:Col, 
    [Row.name]:Row 
  }
})
export default class Sign extends Vue {
 
  @Prop({default:[]})
  signDateList!: Array<string>

  get strDateList() {
    return  this.signDateList.map((item:string)=>{
      item = item.replace(/-/g,'/')
      return this.getStrDay(new Date(item))
    })
  }

  get weekdays() {
    const nowDate = new Date();
    console.log(nowDate,'nowDate')
    
    const month = nowDate.getMonth() 
    // const nowDayOfWeek = nowDate.getDay()
    const nowDay = nowDate.getDate(); //当前日   
    let weekStart = new Date(nowDate.getFullYear(),month, nowDay)
    if(this.signDateList?.length>0){
      weekStart = new Date(this.signDateList[0])
    }
    let weekDays = []
    for(let i =0;i<7;i++){
      let nextDay = new Date(+weekStart + 1000 * 60 * 60 * 24 * i)
      weekDays.push((nextDay.getMonth()+1)+'.'+ (nextDay.getDate()))
    }
    
    return weekDays
  }
  created() {
    
  }
  getStrDay(nowDate:Date) {
    const month = nowDate.getMonth() 
    const nowDay = nowDate.getDate(); //当前日   
    return (month+1)+'.'+ nowDay
  }
}
</script>
<style lang="less">
.van-col--6{
  &:first-child {
    .left-line{
      background-color: transparent!important;
    }
  }
  &:last-child {
    .right-line{
      background-color: transparent!important;
    }
  }  
.sign-wrapper{
  position: relative;
  display: flex;
  align-items: center;
  }
  .active.sign-wrapper{
    .sign-tag{
      background-color: #F5FC9A;
    }
    .right-line{
      background-color: #F5FC9A;
    }
    .left-line{
      background-color: #F5FC9A;
    }
  }
  .left-line{
    display: inline-block;
    flex: 1;
    height:2px;
    background-color: white;
    align-items: center;
  }
  .right-line{
    display: inline-block;
    flex: 1;
    height:2px;
    background-color: white;
    align-items: center;
  }
}
  .sign-tag{
    width:44px;
    height:44px;
    border-radius: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>