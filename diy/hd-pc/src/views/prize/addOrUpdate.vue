<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="prizeForm" :model="prizeForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item required label="奖励类型" prop="prizeType">
          <el-select v-model="prizeForm.prizeType" placeholder="请选择活动区域">
            <el-option label="优惠券" :value="0" />
            <el-option label="实物" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="奖品名称：" prop="name">
          <el-input v-model="prizeForm.name" placeholder="不可超过十个字" maxlength="10" />
        </el-form-item>
        <el-form-item label="有效时间" required prop="validTimeType">
          <el-radio-group v-model="prizeForm.validTimeType">
            <el-radio :label="1">动态有效时间</el-radio>
            <el-radio :label="0">固定有效时间</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="prizeForm.validTimeType === 1" required label="" prop="validDate">
          <el-input
            v-model.number="prizeForm.validDate"
            autocomplete="off"
            maxlength="5"
          >
            <template slot="prepend">领取后</template>
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item v-else label="" required prop="valid_time">
          <el-date-picker
            v-model="prizeForm.valid_time"
            type="datetimerange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>

        <el-form-item required label="兑奖文案" prop="remark">
          <el-input v-model="prizeForm.remark" placeholder="请输入对号文案，长度不超过20个字" maxlength="20" />
        </el-form-item>
        <el-form-item required label="总库存" prop="count">
          <el-input v-model.number="prizeForm.count" placeholder="最大不可超过999999" maxlength="6" />
        </el-form-item>
        <el-form-item required label="可用库存">
          <el-input :value="prizeForm.count - prizeForm.issueCount" placeholder="最大不可超过999999" maxlength="6" disabled />
        </el-form-item>
        <el-form-item label="奖品图片" prop="img">
          <Upload v-model="prizeForm.img" />
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('prizeForm')">重置</el-button>
          <el-button type="primary" @click="handleAddOrUpdata()">{{ buttontext }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
// import DropdownMenu from '@/mobile/components/Share/DropdownMenu'
import { getPrizeDetail } from '@/api/prize'
import { addOrUpdate } from '@/api/prize'
import Upload from '@/components/Upload/SingleImage'
import { mapGetters } from 'vuex'
export default {
  name: 'AddOrUpdatePrize',
  components: { Upload },
  data() {
    var checkvalidDate = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error('动态有效时间不能为空'))
      }

      if (!Number.isInteger(Number(value))) {
        callback(new Error('请输入数字值'))
      } else {
        if (value < 1) {
          callback(new Error('必须大于等于1'))
        } else {
          callback()
        }
      }
    }
    return {
      value2: '',
      buttontext: '保存',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      prizeForm: {
        id: '', // 非必须
        name: '', //	string	名字
        prizeType: 0,	// string	非必须 0 优惠券 1 实物
        issueCount: 0,
        count: 0, //	number	非必须 数量
        img: '', //	number	非必须图片
        remark:	'', // number	非必须备注
        validDate: '1', //	number	非必须 领取后XX天失效
        validStartTime: '', //	number	非必须有效开始时间
        validEndTime: '', //	number	非必须有效结束时间
        valid_time: '', // 有效时间范围
        validTimeType: 0	// number	非必须0 固定有效期 1 领取后XX天有效
      },
      rules: {
        name: [{ required: true, message: '请输入奖品名称', trigger: 'blur' },
          { max: 20, message: '长度不能超过10个字', trigger: 'blur' }], //	string	名字
        prizeType: [{ required: true, message: '请选择活动类型', trigger: 'blur' }],	// string	非必须 0 优惠券 1 实物
        count: [{ required: true, message: '请输入库存' },
          { type: 'number', message: '库存必须为数字值' }], //	number	非必须 数量
        img: [{ required: true, message: '请上传图片' }], //	number	非必须图片
        remark:	[{ required: true, message: '请输入兑奖文案', trigger: 'blur' },
          { max: 20, message: '长度不能超过20个字', trigger: 'blur' }], // number	非必须备注
        validDate: [
          { validator: checkvalidDate, trigger: 'blur' }],
        // { required: true, message: '请输入有效时间', trigger: 'blur' }], //	number	非必须 领取后XX天失效
        valid_start_time: '', //	number	非必须有效开始时间
        valid_end_time: '', //	number	非必须有效结束时间
        valid_time: [{ required: true, message: '请选择有效时间范围', trigger: 'blur' }],
        validTimeType: [{ required: true, message: '请选择有效时间类型', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['prize'])
  },
  created() {
    this.prizeForm.id = this.$route.query.prizeid
    if (this.prizeForm.id) {
      this.fetchPrizes()
    }
  },
  mounted() {

  },
  methods: {
    fetchPrizes() {
      getPrizeDetail(this.prizeForm.id)
        .then(res => {
          this.prizeForm = res.data
          this.prizeForm.count = Number(this.prizeForm.count || '0')
          // this.prizeForm.valid_time = [this.prizeForm.validStartTime, this.prizeForm.validEndTime]
          this.$set(this.prizeForm, 'valid_time', [this.prizeForm.validStartTime, this.prizeForm.validEndTime])
          this.buttontext = '更新'
        })
    },
    handleAddOrUpdata() {
      this.$refs.prizeForm.validate((valid) => {
        if (valid) {
          if (this.prizeForm.validTimeType === 0) {
            this.prizeForm.validStartTime = this.prizeForm.valid_time[0]
            this.prizeForm.validEndTime = this.prizeForm.valid_time[1]
          }
          const params = this.prizeForm
          delete params.valid_time
          addOrUpdate(params).then(data => {
            this.$message({
              message: `${this.buttontext}成功`,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.$router.replace('/prize/index')
              }
            })
            // this.fetchPrizes()
            this.updataStoreFormVisible = false
          }).catch(e => {
            console.error(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer{
  text-align: right;
}
.documentation-container {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .document-btn {
    flex-shrink: 0;
    display: block;
    cursor: pointer;

    margin-bottom: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 6px rgba(136,136,136,0.16);
    opacity:1;
    border-radius:4px;
    font-size:24px;
    font-family:Source Han Sans CN;
    font-weight:400;
    line-height:41px;
    color:rgba(51,51,51,1);
    padding:58px 80px;
  }
}
</style>
