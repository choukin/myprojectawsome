<template>

  <el-form size="small" :model="officialH5activity" label-position="left" label-width="100px">
    <el-form-item label="是否开启分享">
      <el-radio-group v-model="officialH5activity.openShare">
        <el-radio :label="true">开启</el-radio>
        <el-radio :label="false">不开启</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="分享图" prop="shareImg">
      <Upload v-model="officialH5activity.shareImg" />
    </el-form-item>
    <el-form-item label="分享标题" prop="shareTitle">
      <el-input v-model.trim="officialH5activity.shareTitle" />
    </el-form-item>
    <el-form-item label="分享文案" prop="shareContext">
      <el-input v-model.trim="officialH5activity.shareContext" />
    </el-form-item>
  </el-form>

</template>

<script>
import Upload from '@/components/Upload/SingleImage'

export default {
  name: 'ShareInfo',
  components: {
    Upload
  },
  props: {
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
    submit() {}
  }

}
</script>

<style>

</style>
