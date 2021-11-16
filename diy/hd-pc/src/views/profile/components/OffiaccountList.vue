<template>
  <el-table
    class="home-table"
    :data="officialAccountList"
    style="width: 100%"
  >
    <el-table-column
      align="center"
      prop="name"
      label="公众号名称"
      width="180"
    />
    <el-table-column
      align="center"
      prop="createTime"
      label="创建时间"
      width="180"
    />
    <el-table-column
      align="center"
      prop="actCount"
      label="已创建活动个数"
    />
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          icon="el-icon-edit"
          @click="handleEdit(scope.$index, scope.row)"
        />
        <el-popconfirm
          :title="'确定要删除【'+scope.row.name+'】活动吗？'"
          icon="el-icon-info"
          @onConfirm="handleDelete(scope.$index, scope.row)"
        >
          <el-button
            slot="reference"
            style="margin-left:5px;"
            size="mini"
            type="danger"
            icon="el-icon-delete"
          />
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fetchOfficialAccountList, deleteeOfficial } from '@/api/officialAccount'
export default {
  name: 'OffiaccountList',
  data() {
    return {
      officialAccountQuery: {
        startPage: 1,
        pageSize: 10
      },
      officialAccountList: []
    }
  },
  created() {
    this.fetchOfficialAccountList()
  },
  methods: {
    nativeTo(routerName) {
      this.$router.push(routerName)
    },
    handleEdit(index, row) {
      this.$router.push(`/profile/offiaccount?id=${row.id}`)
    },
    handleDelete(index, row) {
      deleteeOfficial(row.id)
        .then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
    },
    fetchOfficialAccountList() {
      fetchOfficialAccountList(this.officialAccountQuery)
        .then(info => {
          this.officialAccountList = info.data.list
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
