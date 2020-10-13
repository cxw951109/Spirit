<template>
    <div style="height: 100%;display: flex;flex-direction: row">
      <div class="left" style="width: 50%;height: 100%">
        <div class="wrapper">
          <div class="wrapper-content" v-for="(item,index) in lists2" @click="go(item.machine_id)">
            <div style="width: 100%;height: 93%;display: flex;flex-direction: column">
              <div class="top" style="width: 100%;height: 60%">
                <div style="height: 100%;background-color: silver;">
                  <el-scrollbar  style="display: flex;flex-direction: row;height: 100%;width: 100%">
                    <div style="display: flex;flex-direction: row;height: 100%;">
                      <div v-if="item.result == null"></div>
                      <div v-else v-for="(item1,index) in item.images">
                        <img :src="$host + item1" style="width: 86px;height: 100%">
                      </div>
                      <div v-if="lists[index].result == null"></div>
                      <div v-else v-for="(item2,index) in lists[index].images">
                        <img :src="$host + item2" style="width: 86px;height: 100%">
                      </div>
                    </div>
                  </el-scrollbar>
                </div>
              </div>
              <div class="bottom" style="width:100%;background-color:lavender ;height: 40%;display: flex;justify-content: space-between;flex-direction: row;align-items: center"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="right"style="width: 50%;height: 100%;display: flex;justify-content: space-between;flex-direction: column" >
        <div style="display: flex;height:100px;flex-direction: row;padding-top: 20px;padding-bottom: 40px;justify-content: space-between;padding-left: 15px;color: white">
          <div style="height: 120px;width: 250px;background-color:#358DD7;flex-direction: row;display: flex">
            <div style="width: 100px;height: 120px;display:flex;align-items: center;justify-content: center">
              <img src="../../static/num.png" style='width: 50px;height: 50px' alt="">
            </div>
            <div style="padding-left: 20px">
              <div class="value" style="padding-top: 30px">今日检测数量</div>
              <div class="value" style="padding-top: 10px;font-size: 26px">{{today.today_num}}</div>
            </div>
          </div>
          <div style="height: 120px;width: 250px;background-color: #56B8B7;flex-direction: row;display: flex">
            <div style="width: 100px;height: 120px;display:flex;align-items: center;justify-content: center">
              <img src="../../static/good.png" style='width: 50px;height: 50px' alt="">
            </div>
            <div style="padding-left: 20px">
              <div class="value" style="padding-top: 30px">今日合格数</div>
              <div class="value" style="padding-top: 10px;font-size: 26px">{{today.today_good_num}}</div>
            </div>
          </div>
          <div style="height: 120px;width: 250px;background-color:#848CCA;flex-direction: row;display: flex">
            <div style="width: 100px;height: 120px;display:flex;align-items: center;justify-content: center">
              <img src="../../static/bad.png" style='width: 50px;height: 50px' alt="">
            </div>
            <div style="padding-left: 20px">
              <div class="value" style="padding-top: 30px">今日杂质数</div>
              <div class="value" style="padding-top: 10px;font-size: 26px">{{today.today_impurity_num}}</div>
            </div>
          </div>
        </div>
        <div style=" height: 100%;padding-left: 10px;display: flex;flex-direction: row;justify-content: space-between">
          <div style="height: 100%;width: 58%;display: flex;flex-direction:column;justify-content: space-between">
            <div style="background-color: white;height: 30%;overflow: hidden;border-radius:2%">
              <div id="myChart1" :style="{width: '542px', height: '230px'}"></div>
            </div>
            <div style="overflow: hidden;background-color: white;height: 30%;border-radius:2%">
              <div id="myChart" :style="{width: '542px', height: '220px'}"></div>
            </div>
            <div style="background-color: white;height: 30%;overflow: hidden;border-radius:2%">
              <div id="myChart3" :style="{width: '542px', height: '230px'}"></div>
            </div>
          </div>
          <div style="height: 100%;width: 38%;display: flex;flex-direction:column;justify-content: space-between">
            <div style="background-color: white;height: 45%;overflow: hidden;border-radius:2%">
              <div id="myChart2" :style="{width: '342px', height: '360px'}"></div>
            </div>
            <div style="background-color: white;height: 45%;overflow: hidden;border-radius:2%">
              <div id="myChart4" :style="{width: '342px', height: '350px'}"></div>
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
                lists:[{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]}],
                lists2:[{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]},{"result":null,"images":[]}],
                today:{
                  "today_num":'',
                  "today_good_num":'',
                  "today_impurity_num":'',
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
                        type: 'category',   // 还有其他的type
                        data: [],   // x轴数据
                        name: '时',   // x轴名称
                        nameTextStyle: {
                            fontWeight: 600,
                            fontSize: 18
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: '数量',   // y轴名称
                        nameTextStyle: {
                            fontWeight: 600,
                            fontSize: 18
                        }
                    },
                    tooltip: {
                        trigger: 'axis'   // axis   item   none三个值
                    },
                    series: []
                },
                option1:{
                  legend: {
                    orient: 'horizontal', // 'vertical'
                    x: '67%', // 'center' | 'left' | {number},
                    y: '80%', // 'center' | 'bottom' | {number}
                  },
                  graphic:{
                    type:"text",
                    left:'65%',
                    top: '25%',
                    style:{
                      text:"",
                      rich:{
                        x:{
                          textAlign:'center',
                          fontSize:20,
                        },
                        y:{
                          textAlign:'center',
                          fontSize:40,
                          fontWeight:700,
                        },
                        z:{
                          height:20
                        }
                      }
                    }
                  },
                  series : [
                        {
                            type: 'pie',
                            center:['30%','55%'],
                            radius: ['40%', '75%'],
                            color:["#8fa6e0","#F56C6C"],
                            label : {
                                normal : {
                                    show:true,
                                    // formatter: '{b}:{c} ({d}%)',
                                    formatter:'{c}',
                                    textStyle : {
                                        fontWeight : 'normal',
                                        fontSize : 15
                                    }
                                }
                            },
                            data:[]
                        }
                    ]
                },
                option3:{
                  legend: {
                    orient: 'horizontal', // 'vertical'
                    x: '9%', // 'center' | 'left' | {number},
                    y: '80%', // 'center' | 'bottom' | {number}
                  },
                  graphic:{
                    type:"text",
                    left:'7%',
                    top: '25%',
                    style:{
                      text:"",
                      rich:{
                        x:{
                          textAlign:'center',
                          fontSize:20,
                        },
                        y:{
                          textAlign:'center',
                          fontSize:40,
                          fontWeight:700,
                        },
                        z:{
                          height:20
                        }
                      }
                    }
                  },
                  series : [
                    {
                      type: 'pie',
                      center:['70%','55%'],
                      radius: ['40%', '75%'],
                      color:["#8fa6e0","#F56C6C"],
                      label : {
                        normal : {
                          show:true,
                          // formatter: '{b}:{c} ({d}%)',
                          formatter:'{c}',
                          textStyle : {
                            fontWeight : 'normal',
                            fontSize : 15
                          }
                        }
                      },
                      data:[]
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
                option4: {
                  color:["#8fa6e0","#F56C6C"],
                  grid: {
                    bottom: '0',
                    containLabel: true
                  },
                  legend: {
                    data: ['杂质', '合格']
                  },
                  xAxis: {
                    type: 'category',   // 还有其他的type
                    data: [],   // x轴数据
                    name: '天',   // x轴名称
                    nameTextStyle: {
                      fontWeight: 600,
                      fontSize: 18
                    }
                  },
                  yAxis: {
                    type: 'value',
                    name: '数量',   // y轴名称
                    nameTextStyle: {
                      fontWeight: 600,
                      fontSize: 18
                    }
                  },
                  tooltip: {
                    trigger: 'axis'   // axis   item   none三个值
                  },
                  series: []
                },
                go(row) {
                  // console.log(row)
                  if (row != undefined) {
                    this.$router.push({ path: "/history", query: { input: row }});
                  }
                },
                // pickerOptions: {
                //     shortcuts: [{
                //         text: '最近一周',
                //         onClick(picker) {
                //             const end = new Date();
                //             const start = new Date();
                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
                //             picker.$emit('pick', [start, end]);
                //         }
                //     }, {
                //         text: '最近一个月',
                //         onClick(picker) {
                //             const end = new Date();
                //             const start = new Date();
                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                //             picker.$emit('pick', [start, end]);
                //         }
                //     }, {
                //         text: '最近三个月',
                //         onClick(picker) {
                //             const end = new Date();
                //             const start = new Date();
                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                //             picker.$emit('pick', [start, end]);
                //         }
                //     }]
                // },
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
                // console.log(msg.data)
                Vue.set(that.lists2,msg.data["id"],msg.data)
            },
            real1: function (msg) {
                var that = this
                Vue.set(that.lists,msg.data["id"],msg.data)
            }
        },
        mounted(){
            this.drawLine();
            this.drawLine1();
        },
        methods:{
            // change(){
            //     this.drawLine()
            // },
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
                let myChart3 = echarts.init(document.getElementById('myChart3'))
                var data ={
                    date:that.value2
                }
                that.$http.post('http://localhost:5000/terminal/chart',data).then(function (res) {
                    // console.log(res.data.data)
                    that.option.xAxis.data =res.data.data.date_list
                    that.option.series =res.data.data.data
                    that.option1.series[0].data =res.data.data.data1
                    that.option1.graphic.style.text ="{x|今日合格率}\n{z|}\n{y|"+res.data.data.sy.today_pass_rate+"%}"
                    that.option3.graphic.style.text ="{x|总合格率}\n{z|}\n{y|"+res.data.data.sy.all_pass_rate+"%}"
                    that.option3.series[0].data =res.data.data.data3
                    that.data =res.data.data.data1
                    that.option2.series[0]["data"] =res.data.data.data2
                    myChart.setOption(that.option)
                    myChart1.setOption(that.option1)
                    myChart2.setOption(that.option2)
                    myChart3.setOption(that.option3)
                })
            },
            drawLine1(){
              var that =this
              var data ={
                date:that.value2
              }
              let myChart4 = echarts.init(document.getElementById('myChart4'))
              that.$http.post('http://localhost:5000/terminal/chart2',data).then(function (res) {
                that.option4.series =res.data.data.data
                that.option4.xAxis.data =res.data.data.date_list
                myChart4.setOption(that.option4)
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
    transform: translateX(167.5px) scale(1)!important;
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
    overflow-x: hidden;
  }
</style>
