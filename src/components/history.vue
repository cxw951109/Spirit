<template>
  <div>
    <div class="block" style="background-color: white;padding-top: 20px;padding-bottom: 20px;text-align: right">
      <el-input v-model="input" placeholder="请输入机器编号" style="width: 220px"></el-input>

      <el-date-picker
        v-model="value1"
        align="right"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd">
      </el-date-picker>

      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-button type="primary" round style="margin-left: 20px;margin-right: 20px" @click ='find_mes' >查询</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="id"
        label="序号"
        >
      </el-table-column>
      <el-table-column
        prop="machine_id"
        label="设备编号"
        >
      </el-table-column>
      <el-table-column
        prop="result"
        label="品质"
        >
        　　<template slot-scope="scope">
              <div v-if="scope.row.result ===0">合格</div>
              <div v-else>杂质</div>
        　　</template>
      </el-table-column>
      <el-table-column
        prop="create_at"
        label="时间"
        >
      </el-table-column>
      <el-table-column
        prop="imgs"
        label="图片"
      >
      　　<template slot-scope="scope">
            <div  style="display: flex;flex-direction: row;height: 50px">
              <div v-for="(item,i) in scope.row.imgs" style="padding-right: 10px">
                <a :href="item" target="_blank"><img :src="$host +item" width="50" height="50" border="0px solid black" class="head_pic"/></a>
              </div>
            </div>
      　　</template>
      </el-table-column>
    </el-table>
    <el-pagination style="padding-top: 20px"
                   background
                   layout="prev, pager, next"
                   :total="page_count"
                   @current-change="get_mes"
                   :current-page.sync="pageNum">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "History",
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (row.result === 0) {
                    return '';
                } else  {
                    return 'warning-row';
                }
                return '';
            },
            get_mes:function (index) {
                var that =this
                var data ={
                    page_index:index,
                    date:that.value1,
                    type:that.value,
                    input:that.input
                }
                that.$http.post('http://localhost:5000/terminal/meslist',data).then(function (res) {
                    that.tableData =res.data.data.data
                    that.page_count =res.data.data.pagination.page_count*10
                })

            },
            find_mes:function () {
                var that =this
                var data ={
                    page_index:1,
                    date:that.value1,
                    type:that.value,
                    input:that.input
                }
                that.$http.post('http://localhost:5000/terminal/meslist',data).then(function (res) {
                    that.tableData =res.data.data.data
                    that.page_count =res.data.data.pagination.page_count*10
                    that.pageNum = 1
                })
            }
        },
        mounted:function(){
            let input =this.$route.query.input
            if (input != undefined) {
              this.input =input
            }
            this.get_mes(1)
        },
        data() {
            return {
                input: '',
                tableData: [],
                page_count:0,
                pageNum:0,
                options: [{
                    value: 'good',
                    label: '合格'
                }, {
                    value: 'bad',
                    label: '杂质'
                },{
                    value: 'all',
                    label: '所有'
                }],
                value:'all',
                value1: null,
            }
        }
    }
</script>
<style>
  .el-table .cell{
    line-height: 13px;
  }
  .el-table .warning-row {
    /*background: oldlace;*/
    /*background: #F56C6C;*/
  }

  .el-table .success-row {
    /*background: #F56C6C;*/
  }
</style>
