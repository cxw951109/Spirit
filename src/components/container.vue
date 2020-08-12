<template>
  <el-container style="height: 100%">
    <el-header >
      <el-menu :default-active="$route.path" class="el-menu-demo" style="width: 100%" mode="horizontal" @select="handleSelect" background-color="#324157" text-color="#fff" active-text-color="#ffd04b" router>
        <el-menu-item index="/cam">摄像头</el-menu-item>
        <el-menu-item index="/cam_check">摄像头检测</el-menu-item>
        <el-menu-item index="/history">数据记录</el-menu-item>
      </el-menu>
<!--      <div style="width: 30%;background-color:#324157;height:98%">-->
<!--        <div class="block" style="padding-top: 20px;padding-bottom: 20px;text-align: right" v-if="">-->
<!--          <el-date-picker-->
<!--            class ="input-class"-->
<!--            v-model="value2"-->
<!--            type="daterange"-->
<!--            align="right"-->
<!--            unlink-panels-->
<!--            range-separator="至"-->
<!--            start-placeholder="开始日期"-->
<!--            end-placeholder="结束日期"-->
<!--            :picker-options="pickerOptions"-->
<!--            value-format="yyyy-MM-dd">-->
<!--          </el-date-picker>-->
<!--          <el-button type="primary" round style="margin-left: 20px;margin-right: 20px" @click ='drawLine' >查询</el-button>-->
<!--        </div>-->
<!--      </div>-->
    </el-header>
    <el-main >
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: "container",
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
  .el-header {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 10% ;
    padding:0;
    display: flex;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 100%;
  }

</style>
