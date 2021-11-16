<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" size="small" @click="handleAddPrize('/prize/addOrUpdatePrize')">新建奖品</el-button>
      </div>
      <el-table
        :data="prizeList"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="name"
          label="奖品名称"
          width="180"
        />
        <el-table-column
          label="图片"
          align="center"
        >
          <template slot-scope="scope">
            <el-image fit="contain" :src="$imghost+scope.row.img" style="width: 100px; height: 40px" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="奖品类型"
          width="180"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.type === '0' ? 'primary' : 'success'"
              disable-transitions
            >{{ scope.row.type==='0' ?'优惠券':'实物' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="validTime"
          label="有效期"
        />
        <el-table-column
          align="center"
          prop="count"
          label="总库存"
        />
        <el-table-column
          align="center"
          label="可用库存"
        >
          <template slot-scope="scope">
            {{ scope.row.count - scope.row.issueCount }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">添加库存</div>
              <el-button
                size="mini"
                type="primary"
                @click="handleUpdataStore(scope.$index, scope.row)"
              >
                <svg-icon icon-class="add" class-name="custom-class" color="#fff" />

              </el-button>
            </el-tooltip>
            <el-button
              size="mini"
              type="success"
              style="margin-left:10px;"
              @click="handleEdit(scope.$index, scope.row)"
            >
              <svg-icon icon-class="edit" class-name="custom-class" color="#fff" />

            </el-button>
            <el-popconfirm
              :title="'确定要删除'+scope.row.name+'奖品吗？'"
              icon="el-icon-info"
              @onConfirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button
                slot="reference"
                size="mini"
                type="danger"
                style="margin-left:10px;"
              >
                <svg-icon icon-class="delete" class-name="custom-class" color="#fff" />

              </el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <!-- <el-pagination
          :current-page="prizeData.startPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="prizeData.prizeList.length/10"
        /> -->
        <pagination v-show="prizeList.length>0" :total="total" :page.sync="prizeData.startPage" :limit.sync="prizeData.pageSize" @pagination="fetchPrizes" />
      </div>
    </el-card>
    <el-dialog title="添加库存" :visible.sync="updataStoreFormVisible">
      <el-form
        ref="addPrizeForm"
        :model="updataPrizeStore"
        :rules="updataPrizeStoreRules"
        size="mini"
      >
        <el-form-item prop="count">
          <el-input
            v-model.number="updataPrizeStore.count"
            autocomplete="off"
            maxlength="5"
          >
            <template slot="prepend">添加数量</template>
            <template slot="append">一次最多添加10000个</template>
          </el-input>
        </el-form-item>
        <el-form-item class="dialog-footer">
          <el-button @click="updataStoreFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddStore">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import DropdownMenu from '@/mobile/components/Share/DropdownMenu'
import { prizeList, addPrizeStore, deletePrize } from '@/api/prize'
import Pagination from '@/components/Pagination'
export default {
  name: 'Prize',
  components: { Pagination },
  data() {
    const checkStoreCount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('添加库存不能为空'))
      }
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else {
        if (value > 10000) {
          callback(new Error('一次最多添加10000个'))
        } else {
          callback()
        }
      }
    }
    return {
      prizeData: {
        startPage: 1,
        pageSize: 10
      },
      prizeList: [],
      total: 0,
      updataStoreFormVisible: false,
      updataPrizeStore: {
        id: '',
        count: ''
      },

      updataPrizeStoreRules: {
        count: [{ validator: checkStoreCount }]
      }

    }
  },
  created() {
    this.fetchPrizes()
  },
  methods: {
    handleAddPrize(routerName) {
      this.$store.commit('prize/CLEAR_PRIZE')
      this.nativeTo(routerName)
    },
    nativeTo(routerName) {
      this.$router.push(routerName)
    },
    handleUpdataStore(index, prizeItem) {
      this.updataPrizeStore.id = prizeItem.id
      this.updataPrizeStore.count = 1
      this.updataStoreFormVisible = true
    },
    handleAddStore() {
      this.$refs.addPrizeForm.validate((valid) => {
        console.log(valid)
        if (valid) {
          addPrizeStore(this.updataPrizeStore).then(data => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.fetchPrizes()
            this.updataStoreFormVisible = false
          }).catch(e => {
            console.error(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEdit(index, row) {
      this.nativeTo(`/prize/addOrUpdatePrize?prizeid=${row.id}`)
    },
    async fetchPrizes() {
      const data = await prizeList(this.prizeData)
      this.prizeList = data.data.list
      this.total = data.data.total
    },
    handleDelete(index, prizeItem) {
      deletePrize(prizeItem.id).then(data => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.fetchPrizes()
      }).catch(e => {
        this.$message({
          message: '删除失败',
          type: 'error'
        })
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
