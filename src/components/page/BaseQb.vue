<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 会员卡消费记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->

                <el-input v-model="select_word" placeholder="会员名" class="handle-input mr10"></el-input>
                <el-input v-model="select_phone" placeholder="会员电话" class="handle-input mr10"></el-input>
                <el-date-picker v-model="time" type="daterange" value-format="yyyy-MM-dd" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                <!-- <el-button type="primary" icon="search" @click="search">查询</el-button> -->
                <el-button type="primary" icon="el-icon-download" @click="derive">导出</el-button>
            </div>
            <el-table :data="data.data.cardOrderList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="orderNo" label="卡号" width="150">
                </el-table-column>
                <el-table-column prop="memberName" label="会员名" width="120">
                </el-table-column>

                <el-table-column prop="memberTelPhone" label="会员电话">
                </el-table-column>
                <el-table-column prop="totalMoney" label="消费余额">
                </el-table-column>
                <el-table-column prop="createTime" sortable label="消费时间">
                </el-table-column>

            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="data.totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      url:
        "/mockjsdata/12/mplatform/api/pcmerchant/getmemberCardConsumeRecords",
      //   tableData: [],
      data: {},
      cur_page: 1,
      multipleSelection: [],
      select_word: "",
      select_phone: "",
      time: "",
      is_search: false,
      editVisible: false,
      delVisible: false,
      id: "",
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1,
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  name: "BaseQb",
  created() {
    this.getData(this.$route.params.id);
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.id) {
        this.getData(this.$route.params.id);
      }
    }
  },
  computed: {},
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData(id) {
      this.id = id;
      let params = {
        memberId: id,
        orderNo: "",
        page: 1,
        rows: 10,
        starTime: this.time == "" ? "" : this.time.toString().split(",")[0],
        endTime: this.time == "" ? "" : this.time.toString().split(",")[1]
      };
      this.$axios.get(this.url, { params: params }).then(res => {
        this.data = res.data;
      });
    },
    search() {
      this.getData(this.id);
    },
    derive() {
      alert(123);
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 140px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
</style>
