<template>
  <div>
    <el-form :inline="true" :model="officialH5activity" class="demo-form-inline">
      奖品设置：
      <el-table
        :data="officialH5activity.prizeLists"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"
        />
        <el-table-column
          prop="name"
          label="奖品名称"
          width="180"
        />
        <el-table-column
          prop="img"
          label="奖品图"
          width="180"
        >
          <template slot-scope="scope">
            <el-image :src="imghost+scope.row.img" style="width: 100px; height: 50px" fit="contain" />
          </template>
        </el-table-column>
        <el-table-column
          prop="count"
          label="奖品数量"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'prizeLists.'+scope.$index+'.count'"
            >
              <el-input
                v-model="scope.row.count"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="issueCount"
          label="可用库存"
        >
          <template slot-scope="scope">
            {{ scope.row.count-scope.row.issueCount }}
          </template>
        </el-table-column>
        <el-table-column
          prop="probability"
          label="中奖概率"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'prizeLists.'+scope.$index+'.probability'"
            >
              <el-input
                v-model="scope.row.probability"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button size="small" icon="el-icon-delete" type="danger" @click="deletePrize(scope)" />
          </template>
        </el-table-column></el-table>
      <div style="height:10px;" />
      <el-button type="primary" @click="addPrize">添加奖品</el-button>
      <div>可填写7-8个奖励，填写7个奖励时，默认第八个为不中奖，填写8个则用户必中奖，除无库存情况下</div>
      <div style="height:10px;" />
      <el-form-item label="活动区域" prop="luckGetPrizeKey">
        <el-select v-model="officialH5activity.luckGetPrizeKey" placeholder="活动区域">
          <el-option label="每天" value="EVERY_DAY_PRIZE" />
          <el-option label="活动期间" value="ACTIVITY_LIMIT_PRIZE" />
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="luckGetPrizeValue">
        <el-input v-model="officialH5activity.luckGetPrizeValue">
          <template slot="prepend">最多可中奖</template>
          <el-button slot="append">次</el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <el-dialog v-if="updataStoreFormVisible" title="添加奖品" :visible.sync="updataStoreFormVisible">
      <div style="height:400px;">
        <el-table

          ref="multipleTable"
          :data="prizeList"
          border
          height="350"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            type="index"
            fixed
            width="50"
            label="序号"
          />
          <el-table-column
            fixed
            prop="name"
            label="奖品名称"
          />
          <el-table-column
            prop="prizeType"
            label="类型"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.type === '0' ? 'primary' : 'success'"
                disable-transitions
              >{{ scope.row.type==='0' ?'优惠券':'实物' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="validTime"
            label="有效期"
          />
          <el-table-column
            prop="city"
            label="可用库存"
          >
            <template slot-scope="scope">
              {{ scope.row.count - scope.row.issueCount }}
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="prizeList.length>0" :total="total" :page.sync="prizeData.startPage" :limit.sync="prizeData.pageSize" @pagination="fetchPrizes" />
      </div>
      <div style="text-align:center;padding:5px;">
        <el-row type="flex" justify="space-around">
          <el-button type="primary" size="small" @click="handleAddPrize('/prize/addOrUpdatePrize')">新建奖品</el-button>
          <el-button type="success" size="small" @click="commitPrize">确定</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { prizeList } from '@/api/prize'
import Pagination from '@/components/Pagination'
import { unionBy } from 'loadsh'
export default {
  name: 'PrizeInfo',
  components: {
    Pagination
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
      imghost: process.env.VUE_APP_IMGHOST,
      prizeData: {
        startPage: 1,
        pageSize: 10
      },
      multipleSelection: [],
      updataStoreFormVisible: false,
      prizeList: [],
      total: 0,
      prizeDatas: [{
        name: '奖品名称',
        img: 'img',
        issueCount: '10',
        probability: 0.3 }
      ],
      selectedPrizes: new Map()
    }
  },
  created() {
    this.fetchPrizes()
  },
  methods: {
    handleAddPrize(routerName) {
      this.nativeTo(routerName)
    },
    nativeTo(routerName) {
      this.$router.push(routerName)
    },
    addPrize() {
      this.updataStoreFormVisible = true
      this.$nextTick(() => {
        this.prizeList.forEach(row => {
          this.officialH5activity.prizeLists.forEach(item => {
          // console.log(item.id, row.id)
            if (item.id === row.id) {
              this.$refs.multipleTable.toggleRowSelection(row, true)
            }
          })
        })
        // this.$forceUpdate()
      })
    },
    /** 删除奖品 */
    deletePrize(row) {
      this.officialH5activity.prizeLists.splice(row.$index, 1)
    },
    async fetchPrizes() {
      const data = await prizeList(this.prizeData)
      this.prizeList = data.data.list
      this.total = data.data.total
      this.$nextTick(() => {
        this.prizeList.forEach(row => {
          this.officialH5activity.prizeLists.forEach(item => {
          // console.log(item.id, row.id)
            if (item.id === row.id) {
              this.$refs.multipleTable.toggleRowSelection(row, true)
            }
          })
        })
        // this.$forceUpdate()
      })
    },
    handleSelectionChange(val) {
      this.selectedPrizes.set(this.prizeData.startPage, val)
      // this.multipleSelection = val
    },
    commitPrize() {
      this.updataStoreFormVisible = false
      let selectedPrize = []
      for (const prizes of this.selectedPrizes.values()) {
        selectedPrize = selectedPrize.concat(prizes)
      }
      // selectedPrize = [...selectedPrize, ...this.officialH5activity.prizeLists]
      selectedPrize = unionBy(selectedPrize, this.officialH5activity.prizeLists, 'id')
      this.officialH5activity.prizeLists = selectedPrize.map(item => {
        console.log(this.officialH5activity.prizeLists)
        const target = this.officialH5activity.prizeLists.find(ite => ite.id === item.id)
        if (!target) {
          return {
            id: item.id,
            'name': item.name,
            'img': item.img || '',
            'count': item.count - item.issueCount,
            'probability': 0
          }
        } else {
          return {
            id: item.id,
            'name': item.name,
            'img': item.img || '',
            'count': target.count, // item.count - item.issueCount,
            'probability': target.probability
          }
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
::v-deep {
  .pagination-container{
  margin-top: 10px;
  padding:0;
}
}
</style>
