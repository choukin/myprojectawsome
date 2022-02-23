<template>
  <view class="index">
    <thread-list
      :threads="threads"
      :loading="loading"
    >
    </thread-list>  
  </view>
</template>

<script>
import { ref, reactive } from 'vue'
import Taro from '@tarojs/taro'
import api from '../../utils/api'
import ThreadList from '../../components/thread_list.vue'
import './index.less'

export default {
  components:{
    'thread-list': ThreadList
  },
  setup () {
    const loading = ref(true)
    const threads = reactive([])
    Taro.request({url:api.getLatestTopic()}).then(res=>{
      this.loading.value = false
      this.threads = res.data
    }).catch(err=>{
      Taro.showToast({
        title:'数据请求失败'
      })
    })
    return {
      loading,
      threads
    }
  }
}
</script>
