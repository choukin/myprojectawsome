<template>
  <div class="app-container">
    <el-col :span="24" :xs="24" class="container-warp">
      <el-card>
        <div slot="header" class="clearfix">
          <span>我的活动</span>
        </div>
        <el-row justify="center" type="flex">
          <el-col :span="6" class="statistics-item">
            <div class="type">
              <svg-icon icon-class="xinzeng" class-name="custom-class" />
              累计新增用户
            </div>
            <div class="data">{{ statistics.sumAddCount }}</div>
          </el-col>
          <el-col :span="6" class="statistics-item">
            <div class="type">
              <svg-icon icon-class="leijiyonghu" class-name="custom-class" />
              累计用户参与次数</div>
            <div class="data">{{ statistics.sumJoinCount }}</div>
          </el-col>
          <el-col :span="6" class="statistics-item">
            <div class="type">
              <svg-icon icon-class="fenxiangrenshu" class-name="custom-class" />
              累计活动分享人数</div>
            <div class="data">{{ statistics.sumShareCount }}</div>
          </el-col>
          <el-col :span="6" class="statistics-item">
            <div class="type">
              <svg-icon icon-class="leijijiangli" class-name="custom-class" />
              累计奖励领取人数</div>
            <div class="data">{{ statistics.sumReciveCount }}</div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="24" :xs="24" class="container-warp">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row justify="space-between" type="flex">
            <el-col
              :span="3"
            > 公众号活动</el-col>
            <el-col
              :span="3"
            >
              <el-button
                size="mini"
                type="danger"
                style="margin-left:10px;"
                @click="gotoCreate('addactivity','')"
              >
                创建
              </el-button>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="24">
            <el-table
              :data="officialAccountList"
              style="width: 100%"
            >

              <el-table-column
                align="center"
                prop="name"
                label="活动名称"
                min-width="180"
              />
              <el-table-column
                align="center"
                label="参与人数"
                min-width="180"
                prop="joinCount"
              />
              <el-table-column
                align="center"
                prop="addCount"
                label="新增用户数"
              />
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleActivityEdit(scope.$index, scope.row)"
                  >
                    <svg-icon icon-class="edit" class-name="custom-class" color="#fff" />

                  </el-button>
                  <el-popconfirm
                    :title="'确定要删除【'+scope.row.name+'】活动吗？'"
                    icon="el-icon-info"
                    @onConfirm="handleDeleteActivity(scope.$index, scope.row)"
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
              <div v-if="officialAccountList&&officialAccountList.length>=5" slot="append" style="padding:15px;text-align:center;" @click="loadMoreOfficial">
                {{ moreOfficialText }}
              </div>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="24" :xs="24" class="container-warp">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row justify="space-between" type="flex">
            <el-col
              :span="3"
            > H5活动</el-col>
            <el-col
              :span="3"
            >
              <el-button
                size="mini"
                type="danger"
                style="margin-left:10px;"
                @click="dialogVisible=true"
              >
                创建
              </el-button>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="24">
            <el-table
              :data="h5AccountList"
              style="width: 100%"
            >
              <el-table-column
                align="center"
                prop="name"
                label="活动名称"
                min-width="100"
                fixed="left"
              />
              <el-table-column
                align="center"
                label="活动曝光数（pv）"
                prop="pv"
                min-width="180"
              />
              <el-table-column
                align="center"
                prop="uv"
                label="用户参与人数（uv）"
                min-width="180"
              />
              <el-table-column
                align="center"
                prop="addCount"
                label="新增用户数"
                min-width="100"
              />
              <el-table-column
                align="center"
                prop="shareCount"
                label="活动分享次数"
                min-width="150"
              />
              <el-table-column
                align="center"
                prop="reciveCount"
                label="领取次数"
                min-width="80"
              />
              <el-table-column
                align="center"
                prop="exchangeCount"
                label="兑换次数"
                min-width="80"
              />
              <el-table-column label="操作" align="center" min-width="200" fixed="right">
                <template slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">复制活动链接</div>
                    <el-button
                      size="mini"
                      type="primary"
                      @click="copyURL(scope.row,$event)"
                    >
                      <svg-icon icon-class="copy" class-name="custom-class" color="#fff" />

                    </el-button>
                  </el-tooltip>
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleEdit(scope.$index, scope.row)"
                  >
                    <svg-icon icon-class="edit" class-name="custom-class" color="#fff" />
                  </el-button>
                  <br><br>
                  <el-tooltip placement="top">
                    <div slot="content">查看奖励数据</div>
                    <el-button
                      size="mini"
                      type="success"
                      @click="handleShowPrizeList(scope.$index, scope.row)"
                    >
                      <svg-icon icon-class="fireworks" class-name="custom-class" color="#fff" />
                    </el-button>
                  </el-tooltip>
                  <el-popconfirm
                    :title="'确定要删除【'+scope.row.name+'】活动吗？'"
                    icon="el-icon-info"
                    @onConfirm="handleDeleteActivity(scope.$index, scope.row)"
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
              <div v-if="h5AccountList && h5AccountList.length>=5" slot="append" style="padding:15px;text-align:center;" @click="loadMoreH5">
                {{ moreH5Text }}
              </div>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-dialog
      v-if="prizeListVisible"
      fullscreen
      width="80%"
      title="奖励信息"
      :visible.sync="prizeListVisible"
    >
      <el-form
        ref="prizeQuery"
        :model="prizeQuery"
        size="mini"
        center

        :inline="true"
      >
        <el-form-item prop="wechatAccount">
          <el-input
            v-model.number="prizeQuery.wechatAccount"
            autocomplete="off"
            placeholder="请输入微信账户"
          />
        </el-form-item>
        <el-form-item prop="wechatName">
          <el-input
            v-model.number="prizeQuery.wechatName"
            autocomplete="off"
            placeholder="请输入微信名称"
          />
        </el-form-item>
        <el-form-item prop="prizeNo">
          <el-input
            v-model.number="prizeQuery.prizeNo"
            autocomplete="off"
            placeholder="请输入兑换码"
          />
        </el-form-item>
        <el-form-item class="dialog-footer">
          <el-button type="primary" @click="handleQuery">确 定</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="prizeList"
        style="width: 100%"
        height="500px"
        size="mini"
      >
        <el-table-column
          align="center"
          prop="prizeName"
          label="奖品名称"
          width="100"
        />
        <el-table-column
          align="center"
          label="微信号"
          prop="wechatAccount"
        />
        <el-table-column
          align="center"
          prop="wechatName"
          label="微信名称"
        />
        <el-table-column
          align="center"
          prop="prizeNo"
          label="兑换码"
        />
        <el-table-column
          align="center"
          prop="status"
          label="状态"
        />
        <el-table-column
          align="center"
          prop="toWay"
          label="下发方式"
        />
        <el-table-column
          align="center"
          prop="otherMsg"
          label="其他信息"
        />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleReview(scope.$index, scope.row)"
            >{{ scope.row.status==='0'?'核销':'已核销' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="prizecount>0" :total="prizecount" :page.sync="prizeQuery.startPage" :limit.sync="prizeQuery.pageSize" @pagination="handleQuery" />
    </el-dialog>
    <!-- 创建H5活动弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>请选择要创建的活动</span>
      <el-select v-model="activityType" placeholder="请选择">
        <el-option
          v-for="item in h5activityDatas"
          :key="item.activityType"
          :label="item.name"
          :value="item.activityType"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="gotoCreate('h5activity',activityType)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchActInfo, deleteActivity, fetchPrizeList, updatePrizeStatus } from '@/api/activity'
import Pagination from '@/components/Pagination'
import clip from '@/utils/clipboard' // use clipboard directly
// import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive

export default {
  name: 'MyActivity',
  directives: {
    // clipboard
  },
  filters: {
    formatUrl(code, row) {
      // 活动类型100 大转盘 101 红包雨 102 刮一刮
      let router = ''
      switch (row.activityType) {
        case 100:
          router = 'big-turntable'
          break
        case 101:
          router = 'redenveloperain'
          break
        case 102:
          router = 'scratch-off'
          break

        default:
          router = ''
          break
      }
      return process.env.VUE_APP_BASE_API + `/mobile/mobile.html#/${router}activityCode=${row.activityCode}`
    }
  },
  components: {
    Pagination
  },
  data() {
    return {
      dialogVisible: false,
      activityType: '100',
      h5activityDatas: [
        {
          name: '大转盘',
          path: '',
          activityType: '100'
        },
        {
          name: '红包雨',
          path: '',
          activityType: '101'
        },
        {
          name: '刮一刮',
          path: '',
          activityType: '102 '
        }
      ],
      h5page: 1,
      officialpage: 1,
      prizeListVisible: false,
      prizeList: [],
      prizecount: 0,
      prizeQuery: {
        startPage: 1, // 开始的页数
        activityCode: '', // 活动code
        pageSize: 10, // 每页显示多少条
        wechatAccount: '', // 微信号
        wechatName: '', // 微信名
        prizeNo: '' // 兑换码
      },
      officialAccountList: [],
      h5AccountList: [],
      moreOfficialText: '加载更多',
      moreH5Text: '加载更多',
      statistics: {

        sumAddCount: '', // 累计新增
        sumJoinCount: '', // 累计参与
        sumShareCount: '', // 累计分享
        sumReciveCount: '' // 累计领取
      }
    }
  },
  created() {
    this.fetchActInfo()
  },
  mounted() {
  },
  methods: {
    gotoCreate(routerPath, activityType) {
      this.$router.push(`/myactivity/${routerPath}?activityType=${activityType}`)
    },
    handleActivityEdit(index, row) {
      this.$router.push(`/myactivity/addactivity?activityCode=${row.activityCode}`)
    },
    handleReview(index, row) {
      updatePrizeStatus({ id: row.id, status: row.status + 1 }).then(res => {
        this.handleQuery()
      })
    },
    handleEdit(index, row) {
      this.$router.push(`/myactivity/h5activity?activityType=${row.activityType}&activityCode=${row.activityCode}`)
    },
    copyURL(row) {
      // 活动类型100 大转盘 101 红包雨 102 刮一刮
      let router = ''
      switch (row.activityType) {
        case 100:
          router = 'lottery'
          break
        case 101:
          router = 'redenveloperain'
          break
        case 102:
          router = 'scratch-off'
          break

        default:
          router = ''
          break
      }

      const scope = 'snsapi_userinfo'
      let redirect_uri = process.env.VUE_APP_BASE_API + `/dist/mobile.html#/${router}?activityCode=${row.activityCode}`
      redirect_uri = encodeURIComponent(redirect_uri)
      const WXAPPID = process.env.VUE_APP_WXAPPID
      let weichatUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WXAPPID}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}#wechat_redirect`
      weichatUrl = encodeURIComponent(weichatUrl)
      router = process.env.VUE_APP_BASE_API + `/act/detail/redict?toUrl=${weichatUrl}`
      clip(router, event)
    },
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    },
    handleQuery() {
      fetchPrizeList(this.prizeQuery)
        .then(res => {
          if (res.data) {
            this.prizeList = res.data.recordMemberListVo
            this.prizecount = res.data.count
          } else {
            this.prizeList = []
            this.prizecount = 0
          }
          this.prizeListVisible = true
        })
    },
    fetchActInfo() {
      fetchActInfo(1)
        .then(res => {
          this.statistics = res.data
          this.h5AccountList = this.statistics.h5AccountList
          this.officialAccountList = this.statistics.officialAccountList
        }).catch(e => {
          console.error(e)
        })
    },
    loadMoreOfficial() {
      this.officialpage += 1
      fetchActInfo(this.officialpage)
        .then(res => {
          if (res.data.officialAccountList && res.data.officialAccountList.length > 0) {
            const officialAccountList = this.officialAccountList.concat(res.data.officialAccountList)
            this.officialAccountList = officialAccountList
          } else {
            this.moreOfficialText = '没有更多了'
          }
        }).catch(e => {
          console.error(e)
        })
    },
    loadMoreH5() {
      this.h5page += 1
      fetchActInfo(this.h5page)
        .then(res => {
          if (res.data.h5AccountList && res.data.h5AccountList.length > 0) {
            const h5AccountList = this.h5AccountList.concat(res.data.h5AccountList)
            this.h5AccountList = h5AccountList
          } else {
            this.moreH5Text = '没有更多了'
          }
        }).catch(e => {
          console.error(e)
        })
    },
    handleDeleteActivity(index, activityItem) {
      deleteActivity(activityItem.activityCode)
        .then(res => {
          this.fetchActInfo()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
    },
    handleShowPrizeList(index, activity) {
      this.prizeQuery.activityCode = activity.activityCode
      this.handleQuery()
    }
  }
}
</script>
<style lang="scss" >

.el-card__header{
    border-bottom: none;
}
.el-card__header{
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    line-height: 41px;
    color: #333333;

}
</style>
<style lang="scss" scoped>
.container-warp{
    margin-top: 40px;
}
.statistics-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .type{
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 31px;
        color: #222222;
    }
    .data{
        font-size: 60px;
        font-family: Avanti;
        font-weight: 400;
        line-height: 64px;
        color: #222222;
        padding-top: 35px;
    }
}
</style>
