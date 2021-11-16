<template>

  <el-form size="small" :model="officialH5activity" label-position="left" label-width="100px">
    <!-- <el-form-item label="选择创建的公众号：" prop="officialAccountId">
      <el-select v-model="officialH5activity.officialAccountId" placeholder="请选择公众号">
        <el-option
          v-for="item in officialAccountDataList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item> -->
    <el-form-item label="活动名称" prop="name" required>
      <el-input v-model.trim="officialH5activity.name" />
    </el-form-item>
    <el-form-item label="活动时间" prop="rangeTime" required>
      <!-- <el-input v-model.trim="officialH5activity.startTime" /> -->
      <el-date-picker
        v-model="officialH5activity.rangeTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="update"
      />
    </el-form-item>
    <el-form-item label="抽奖次数" prop="luckLimitValue">
      <el-input-number v-model="officialH5activity.luckLimitValue" :min="1" :max="100000" label="描述文字" />
      <el-select v-model="officialH5activity.luckLimitKey" placeholder="请选择活动区域">
        <el-option label="次/活动内" value="ACTIVITY_LIMIT" />
        <el-option label="次/每天" value="EVERY_DAY" />
      </el-select>
    </el-form-item>
    <el-form-item
      label="活动规则"
      prop="activityDesc"
    >
      <tinymce v-model="officialH5activity.activityDesc" :height="300" />
    </el-form-item>
  </el-form>

</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: 'BaseInfo',
  components: { Tinymce },
  props: {
    // officialAccountDataList: [],
    officialH5activity: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      baseInfo: {}
    }
  },
  methods: {
    update() {
      this.$forceUpdate()
    },
    submit() {}
  }

}
</script>

<style>

</style>

