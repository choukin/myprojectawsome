<template>
  <van-tabs
    v-model="active"
    sticky
    @change="changeTab"
  >
    <van-tab title="可领取任务">
      <van-list
        v-model="taskTypeData.taskData.loading"
        :finished="taskTypeData.taskData.finished"
        :finished-text="(taskTypeData.taskData.listData&&taskTypeData.taskData.listData.length)?'':'暂无数据'"
      >
        <taskItem
          v-for="(item,index) in taskTypeData.taskData.listData"
          :key="item.contUrl+index+0"
          :task="item"
        />
      </van-list>
    </van-tab>
    <van-tab title="已领取">
      <van-list
        v-model="taskTypeData.watchTaskData.loading"
        :finished="taskTypeData.watchTaskData.finished"
        :finished-text="(taskTypeData.watchTaskData.listData&&taskTypeData.watchTaskData.listData.length)?'':'暂无数据'"
      >
        <taskItem
          v-for="(item,index) in taskTypeData.watchTaskData.listData"
          :key="item.contUrl+1+index"
          :task="item"
        />
      </van-list>
    </van-tab>
    <van-tab title="审核中">
      <van-list
        v-model="taskTypeData.taskAuditData.loading"
        :finished="taskTypeData.taskAuditData.finished"
        :finished-text="(taskTypeData.taskAuditData.listData&&taskTypeData.taskAuditData.listData.length)?'':'暂无数据'"
      >
        <taskItem
          v-for="(item,index) in taskTypeData.taskAuditData.listData"
          :key="item.contUrl+1+index"
          :task="item"
        />
      </van-list>
    </van-tab>    
    <van-tab title="审核成功">
      <van-list
        v-model="taskTypeData.taskAuditSuData.loading"
        :finished="taskTypeData.taskAuditSuData.finished"
        :finished-text="(taskTypeData.taskAuditSuData.listData&&taskTypeData.taskAuditSuData.listData.length)?'':'暂无数据'"
      >
        <taskItem
          v-for="(item,index) in taskTypeData.taskAuditSuData.listData"
          :key="item.contUrl+2+index"
          :task="item"
        />
      </van-list>
    </van-tab> 
    <van-tab title="审核失败">
      <van-list
        v-model="taskTypeData.taskAuditErrData.loading"
        :finished="taskTypeData.taskAuditErrData.finished"
        :finished-text="(taskTypeData.taskAuditErrData.listData&&taskTypeData.taskAuditErrData.listData.length)?'':'暂无数据'"
      >
        <taskItem
          v-for="(item) in taskTypeData.taskAuditErrData.listData"
          :key="item.contUrl+3"
          :task="item"
        />
      </van-list>
    </van-tab>            
  </van-tabs>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import { Tab, Tabs, List, Cell,Image as VanImage, Icon } from 'vant'
import taskItem from './components/task-item.vue'
// eslint-disable-next-line no-unused-vars
import { Task } from '@/types/index'
const { VUE_APP_HOST } = process.env
type TaskType = 'taskData'| 'watchTaskData' | 'taskAuditErrData' | 'taskAuditSuData' | 'taskAuditData'

@Component({
  name: 'tasklist',
  components:{
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [List.name]: List,
    [Cell.name]: Cell,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    taskItem

  }
})
export default class Ranking extends Vue {
  private active: number = 0
  private taskType: TaskType = 'taskData'
  private taskTypeData = {
    /**
     * 全部任务
     */
    taskData:{
      api:'getManuallyList',
      loading: false,
      finished: false,
      listData:[]
    },
    /**
     * 已领取
     */
    watchTaskData:{
      api: 'getWatchManuallyList',
      loading: false,
      finished: false,
      listData:[]
    },
    /**
     * 审核中的任务
     */
    taskAuditData:{
      api: 'getSubmitManuallyList',
      loading: false,
      finished: false,
      listData:[]
    },
    /**
     * 审核失败任务
     */
    taskAuditErrData:{
      api: 'getAuditErrManuallyList',
      loading: false,
      finished: false,
      listData:[]
    },
    /**
     * 审核成功任务
     */
    taskAuditSuData:{
      api: 'getAuditSuManuallyList',
      loading: false,
      finished: false,
      listData:[]
    }    
  }
  public async created() {
    await this.fetchtaskList('taskData')
  }
  /**
   * 获取全部任务
   * 获取昨日收益排行榜信息
   */
  async fetchtaskList(type: TaskType) {
    let taskType = this.taskTypeData[type]
    taskType.loading = true
    let data = await this.$get(VUE_APP_HOST + `/gunsApi/taskManuallyApi/${taskType.api}`,{}, {tokenflag: true})
    taskType.loading = false
    taskType.finished = true
    taskType.listData = data
  }

  async changeTab(name: number) {
    let type: TaskType = 'taskData'
    switch (name) {
      case 1:
        type = 'watchTaskData'
        break;
      case 2:
        type = 'taskAuditData'  
        break;
      case 3:
        type = 'taskAuditSuData'
        break;
      case 4:
        type = 'taskAuditErrData'
        break;        
      default:
        break;
    }
    await this.fetchtaskList(type)
  }
  
}
</script>
