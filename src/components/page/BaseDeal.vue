<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 交易流水</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->

                <el-input v-model="select_word" placeholder="订单号" class="handle-input mr10"></el-input>

                <el-select v-model="select_cate" clearable placeholder="选择交易类型" class="handle-select mr10">
                    <el-option label="购卡消费" value="11"></el-option>
                    <el-option label="线下消费" value="0"></el-option>
                    <el-option label="扫码消费" value="8"></el-option>
                </el-select>

                <el-select v-model="select_paytype" clearable placeholder="选择支付类型" class="handle-select mr10">
                    <el-option label="现金支付" value="0"></el-option>
                    <el-option label="支付宝支付" value="2"></el-option>
                    <el-option label="微信支付" value="3"></el-option>
                    <el-option label="银行卡支付" value="12"></el-option>
                    <el-option label="卡余额支付" value="8"></el-option>
                </el-select>

                <el-date-picker v-model="time" type="daterange" value-format="yyyy-MM-dd" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                <el-button type="primary" icon="el-icon-download" @click="derive">导出</el-button>
            </div>

            <el-table :data="data.data.merchantTradOrder" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="orderNo" label="订单号" width="150">
                </el-table-column>
                <el-table-column prop="consumerTypeString" label="消费类型" width="120">
                </el-table-column>
                <el-table-column prop="totalMoney" label="订单总额">
                </el-table-column>
                <el-table-column prop="orderMoney" label="订单实付金额">
                </el-table-column>
                <el-table-column prop="serviceCost" label="服务费">
                </el-table-column>
                <el-table-column prop="saleMoney" label="入账">
                </el-table-column>
                <el-table-column prop="" label="开红包">
                </el-table-column>
                <el-table-column prop="" label="天天返">
                </el-table-column>
                <el-table-column prop="payTypeText" label="支付类型">
                </el-table-column>
                <el-table-column prop="payTime" label="交易时间" sortable>
                </el-table-column>

                <!-- <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="data.data.totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import payTypeFormatter from "static/js/payTypeFormatter.js";

export default {
  data() {
    return {
      url:
        "http://192.168.0.251:8088/mockjsdata/12/mplatform/api/trade/getPcMerchantTradOrders",
      data: {},
      date1: "",
      date2: "",
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_paytype: "",
      select_word: "",
      time: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
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
    //导出
    derive(){

    },
    // 获取 easy-mock 的模拟数据
    getData() {
      let searchData = {
        _search: false,
        nd: Date.now(),
        rows: 10,
        page: 1,
        sidx: "",
        sord: "asc",
        orderNo: 0,
        consumerType: "",
        startTime: "",
        endTime: "",
        payType: 0,
        payCategory: 0
      };
      searchData.orderNo = this.select_word;
      searchData.consumerType = this.select_cate;
      searchData.payType = this.select_paytype;
      searchData.startTime = this.time.toString().split(",")[0];
      searchData.endTime = this.time.toString().split(",")[1];
      searchData.page = this.cur_page;
      this.$axios.get(this.url, { params: searchData }).then(res => {
        this.data = res.data;
        this.data.data.merchantTradOrder.forEach(function(item) {
            item.payTypeText=payTypeFormatter(item)
        });
      });
    },
    search() {
      this.getData();
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 140px;
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
