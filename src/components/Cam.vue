<template>
    <div style="height: 100%;display: flex;flex-direction: row">
      <div class="left" style="width: 40%;height: 100%">
        <div class="wrapper">
          <div class="wrapper-content" v-for="(item,index) in lists2" @click="go(item.machine_id)">
            <div style="width: 100%;height: 93%;display: flex;flex-direction: column">
              <div class="top" style="width: 100%;height: 60%">
                <div style="height: 100%;background-color: silver;">
                  <el-scrollbar  style="display: flex;flex-direction: row;height: 100%">
                    <div style="display: flex;flex-direction: row;height: 100%;">
                      <div v-if="item.result == null"></div>
                      <div v-else v-for="(item1,index) in item.images">
                        <img :src="item1" style="width: 86px;height: 100%">
                      </div>
                    </div>
                  </el-scrollbar>
                </div>
              </div>
              <div class="bottom" style="width:100%;background-color:lavender ;height: 40%;display: flex;justify-content: space-between;flex-direction: row;align-items: center">
<!--                <div style="display: flex;justify-content: space-between;flex-direction: row;align-items: center;width:70%">-->
                  <div :class="item.result==0? 'actives':'native'" style="width:30px;height: 30px;border-radius: 50%;margin-left: 10px"></div>
                  <div :class="item.result==1? 'actives1':'native1'" style="width:30px;height: 30px;border-radius: 50%"></div>
                  <div :class="item.result==null? 'actives2':'native2'" style="width:30px;height: 30px;border-radius: 50%;margin-right: 10px"></div>
<!--                </div>-->
<!--                <div style="display: flex;justify-content: space-between;flex-direction: row;align-items: center;width:30%">-->
<!--                  <div style="margin-right: 10px" v-if="item.result==0">合格</div>-->
<!--                  <div style="margin-right: 10px" v-if="item.result==1">杂质</div>-->
<!--                  <div style="margin-right: 10px" v-else></div>-->
<!--                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right"style="width: 60%;height: 100%;display: flex;justify-content: space-between;flex-direction: column" >
<!--        <div style="display: flex;height:100px;flex-direction: row;padding-top: 20px;padding-bottom: 40px;justify-content: space-between;padding-left: 60px;padding-right: 60px;">-->
<!--          <div style="height: 100px;width: 140px;background-color:#B0D0EA">-->
<!--            <div class="value" style="padding-top: 20px">今日检测数量</div>-->
<!--            <div class="value" style="padding-top: 10px;font-size: 18px">{{today.all}}</div>-->
<!--          </div>-->
<!--          <div style="height: 100px;width: 140px;background-color: #5ec1c9">-->
<!--            <div class="value" style="padding-top: 20px">今日合格数</div>-->
<!--            <div class="value" style="padding-top: 10px;font-size: 18px">{{today.good}}</div>-->
<!--          </div>-->
<!--          <div style="height: 100px;width: 140px;background-color:#f8b45c">-->
<!--            <div class="value" style="padding-top: 20px">今日杂质数</div>-->
<!--            <div class="value" style="padding-top: 10px;font-size: 18px">{{today.bad}}</div>-->
<!--          </div>-->
<!--        </div>-->
        <div style=" height: 20%;padding-left:20px">
            <div style=" height: 100%;width: 98%;padding-left: 1%;padding-right: 1%">


              <div class="wrapper1">
                <div class="wrapper-content1" v-for="(item,index) in lists">
                  <div style="width: 100%;height: 90%;display: flex;flex-direction: column;padding-top: 5%;padding-bottom: 5%">
                    <div class="top" style="width: 100%;height: 60%">
                      <div style="height: 100%;background-color: silver;">
                        <el-scrollbar  style="display: flex;flex-direction: row;height: 100%">
                          <div style="display: flex;flex-direction: row;height: 100%;">
                            <div v-if="item.result == null"></div>
                            <div v-else v-for="(item1,index) in item.images">
                              <img :src="item1" style="width: 65.5px;height: 100%">
                            </div>
                          </div>
                        </el-scrollbar>
                      </div>
                    </div>
                    <div class="bottom" style="width:100%;background-color:lavender ;height: 40%;display: flex;justify-content: space-between;flex-direction: row;align-items: center">
                      <div :class="item.result==0? 'actives':'native'" style="width:30px;height: 30px;border-radius: 50%;margin-left: 10px"></div>
                      <div :class="item.result==1? 'actives1':'native1'" style="width:30px;height: 30px;border-radius: 50%"></div>
                      <div :class="item.result==null? 'actives2':'native2'" style="width:30px;height: 30px;border-radius: 50%;margin-right: 10px"></div>
                    </div>
                  </div>
                </div>
              </div>



            </div>
        </div>
        <div style="height: 75%;padding-left: 10px">
          <div style=" height: 100%;width: 100%">
            <div class="block" style="padding-top: 10px;padding-bottom: 30px;text-align: right">
              <el-date-picker
                class ="input-class"
                v-model="value2"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd">
              </el-date-picker>
              <el-button type="primary" round style="margin-left: 10px;margin-right: 10px" @click ='drawLine' >查询</el-button>
            </div>
            <div style="display: flex;flex-direction: row">
              <el-row :gutter="0" style="height: 420px;width: 100%">
                <el-carousel :interval="5000" arrow="never" height="420px" width="100%" type="card" @change="change" indicator-position="none">
                  <el-carousel-item>
                    <div id="myChart" :style="{width: '490px', height: '380px'}"></div>
                  </el-carousel-item>
                  <el-carousel-item>
                    <div id="myChart1" :style="{width: '490px', height: '420px'}"></div>
                  </el-carousel-item>
                  <el-carousel-item>
                    <div id="myChart2" :style="{width: '530px', height: '420px'}"></div>
                  </el-carousel-item>
                </el-carousel>
              </el-row>
            </div>
          </div>

        </div>

      </div>
    </div>

</template>

<script>
    let echarts = require('echarts')
    import Vue from 'vue'
    require('echarts/lib/chart/bar')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    export default {
        name: "Cam",
        data() {
            return {
                lists:[{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]}],
                lists2:[{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]}],
                // imgWifi:require("../assets/jx.gif"),
                // imgWifi:require("../../static/site_data/S1001/1590562930182/1590562930182_GHU.png"),
                today:{
                  "all":'',
                  "good":'',
                  "bad":''
                },
                option: {
                    color:["#8fa6e0","#F56C6C"],
                    grid: {

                        bottom: '0',
                        containLabel: true
                    },
                    legend: {
                        data: ['杂质', '合格']
                    },
                    xAxis: {
                        type: 'category',   // 还有其他的type，可以去官网喵两眼哦
                        data: [],   // x轴数据
                        name: '日期',   // x轴名称
                        // x轴名称样式
                        nameTextStyle: {
                            fontWeight: 600,
                            fontSize: 18
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: '数量',   // y轴名称
                        // y轴名称样式
                        nameTextStyle: {
                            fontWeight: 600,
                            fontSize: 18
                        }
                    },
                    tooltip: {
                        trigger: 'axis'   // axis   item   none三个值
                    },
                    series: [

                    ]
                },
                option1:{
                    series : [
                        {
                            type: 'pie',
                            radius: '55%',
                            color:["#8fa6e0","#F56C6C"],
                            label : {
                                normal : {
                                    show:true,
                                    formatter: '{b}:{c} ({d}%)',
                                    textStyle : {
                                        fontWeight : 'normal',
                                        fontSize : 15
                                    }
                                }
                            },
                            data:[

                            ]
                        }
                    ]
                },
                value2: '',
                option2:{
                    color:["#F56C6C"],
                    tooltip: {
                        show:true
                    },
                    legend:{
                        data:['数量']
                    },
                    xAxis: [{
                        type:'category',
                        data:["总数","合格品","杂质"]
                    }],
                    yAxis: [{
                        type:'value'
                    }],
                    series:[{
                        "name":"数量",
                        "type":"bar",
                        "data":[]
                    }]
                },
                go(row) {
                  console.log(row)
                  if (row != undefined) {
                    this.$router.push({ path: "/history", query: { input: row }});
                  }
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            };
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            disconnect:function () {
                console.log('socket disconnect')
            },
            reconnect:function () {
                console.log('socket reconnect')
            },
            response: function (res) {
                this.$message.success(res.msg)
            },
            real: function (msg) {
                var that =this
                console.log(msg.data["id"],that.lists[msg.data["id"]],msg.data)
                // that.lists[msg.data["id"]] =msg.data.images
                Vue.set(that.lists2,msg.data["id"],msg.data)
                console.log(that.lists2)
            }
        },
        mounted(){
            // this.get_today();
            this.drawLine();
        },
        methods:{
            change(){
                this.drawLine()
            },
            get_today(){
                var that =this
                that.$http.post('http://localhost:5000/terminal/today_detection').then(function (res) {
                    // console.log(res.data)
                    that.today =res.data.data
                })

            },
            drawLine(){
                var that =this
                that.get_today()
                let myChart = echarts.init(document.getElementById('myChart'))
                let myChart1 = echarts.init(document.getElementById('myChart1'))
                let myChart2 = echarts.init(document.getElementById('myChart2'))
                var data ={
                    date:that.value2
                }
                that.$http.post('http://localhost:5000/terminal/chart',data).then(function (res) {
                    // console.log(res.data.data)
                    that.option.xAxis.data =res.data.data.date_list
                    that.option.series =res.data.data.data
                    that.option1.series[0].data =res.data.data.data1
                    that.data =res.data.data.data1
                    that.option2.series[0]["data"] =res.data.data.data2
                    myChart.setOption(that.option)
                    myChart1.setOption(that.option1)
                    myChart2.setOption(that.option2)
                })
            }

        }
    }
</script>

<style scoped>
  .wrapper{
    width: 96%;
    height: 98%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    background-color: white;
    padding-top:  2%;
    padding-right: 2%;
    padding-left: 2%;
  }
  .wrapper-content{
    width: 32%;
    height: 25%;
  }
  .wrapper1{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    /*background-color: white;*/
  }
  .wrapper-content1{
    width: 16%;
    height: 100%;
  }
  .input-class{
    width: 250px;
  }
  .el-scrollbar  {
    white-space: nowrap;
    /*overflow-x: hidden;*/
  }
  .actives{
    background-color:rgb(0,220,0);
  }
  .native{
    background-color:rgb(0,80,0)
  }
  .actives1{
    background-color: rgb(220,0,0)
  }
  .native1{
    background-color: rgb(80,0,0)
  }
  .actives2{
    background-color: yellow;
  }
  .native2{
    background-color: #8B5A00
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #d3dce6;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__item--card{
    width: 65%;
  }
  .el-carousel__item--card.is-active{
    transform: translateX(147.5px) scale(1)!important;
  }
  #myChart2 {
    padding-left:10px;
    padding-top: 10px;
  }
</style>
<style>
  .el-scrollbar__view{
    height: 100% !important;
  }
  .el-scrollbar__wrap{
    overflow-y:hidden;
  }

</style>
