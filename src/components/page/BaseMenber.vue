<template>
    <div class="table">
        <div class="crumbs">
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 会员卡</el-breadcrumb-item>
            </el-breadcrumb> -->
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
               <el-button icon="el-icon-refresh" circle></el-button>

                <el-input v-model="select_word" placeholder="会员名" class="handle-input mr10"></el-input>
                <el-input v-model="select_phone" placeholder="会员电话" class="handle-input mr10"></el-input>
                <el-date-picker v-model="time" type="daterange" value-format="yyyy-MM-dd" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                </el-date-picker>

                <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                <!-- <el-button type="primary" icon="search" @click="search">查询</el-button> -->
                <el-button type="primary" icon="el-icon-download" @click="derive">导出</el-button>
            </div>
            <el-table stripe border highlight-current-row :data="data.data.memberCards" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="memberId" label="卡号" width="150">
                </el-table-column>
                <el-table-column prop="memberName" label="会员名" width="120">
                </el-table-column>

                <el-table-column prop="memberTelPhone" label="会员电话">
                </el-table-column>
                <el-table-column prop="balance" label="卡余额">
                </el-table-column>
                <el-table-column prop="createTimeStr" sortable label="购卡时间">
                </el-table-column>
                <!-- <el-table-column prop="address" label="消费记录" :formatter="formatter">
                </el-table-column> -->

                <el-table-column label="消费记录">
                    <template slot-scope="scope">
                        <!-- <router-link> -->
                        <el-button size="small" type="primary" plain @click="sendParams(scope.$index)">查看消费记录</el-button>
                        <!-- </router-link> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="data.data.totalCount">
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
        "http://192.168.0.251:8088/mockjsdata/12/mplatform/api/pcmerchant/getMemberCards",
      //   tableData: [],
      data: {},
      date1: "",
      date2: "",
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      select_phone: "",
      time: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
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
  created() {
    this.getData();
  },
  computed: {},
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      this.$axios.get(this.url).then(res => {
        this.data = res.data;
      });
    },
    search() {
      let searchData = {
        _search: false,
        nd: Date.now(),
        rows: 10,
        page: 1,
        sidx: "",
        sord: "asc",
        memberName: "",
        memberTelPhone: "",
        startTime: "",
        endTime: ""
      };
      searchData.memberName = this.select_word;
      searchData.memberTelPhone = this.select_phone;
      searchData.startTime = this.time.toString().split(",")[0];
      searchData.endTime = this.time.toString().split(",")[1];
      alert(JSON.stringify(searchData));

      //   this.is_search = true;
    },
    derive() {
      alert(123);
    },
    sendParams(index) {
      let data = this.data.data.memberCards[index].id;
      this.$router.push({
        name: "BaseQb",
        path: "/qb",
        params: {
          id: data
        }
      });
    }
    // formatter(row, column) {
    //   return row.address;
    // },
    // filterTag(value, row) {
    //   return row.tag === value;
    // },
    // handleDelete(index, row) {
    //   this.idx = index;
    //   this.delVisible = true;
    // },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // }
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
