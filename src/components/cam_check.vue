<template>

    <div class="wrapper">
      <div class="wrapper-content" v-for="(item,index) in lists2">
          <img :src="item.images" style="width:100%;height: 100%">
          <span style="position: absolute; top: 0; left: 5px;color: red">{{index+1}}</span>
      </div>
    </div>

</template>

<script>
    import Vue from "vue";
    export default {
        name: "cam_check",
        data(){
          return{
            lists2:[
              {"id":0,"images":''},{"id":1,"images":''},{"id":2,"images":''},{"id":3,"images":''},{"id":4,"images":''},{"id":5,"images":''},{"id":6,"images":''},{"id":7,"images":''},{"id":8,"images":''},{"id":9,"images":''},{"id":10,"images":''},{"id":11,"images":''},
              {"id":12,"images":''},{"id":13,"images":''},{"id":14,"images":''},{"id":15,"images":''},{"id":16,"images":''},{"id":17,"images":''},{"id":18,"images":''},{"id":19,"images":''},{"id":20,"images":''},{"id":21,"images":''},{"id":22,"images":''},{"id":23,"images":''}
            ],
          }
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
          present: function (msg) {
            var that =this
            Vue.set(that.lists2,msg.data["id"],msg.data)
          }
        },
        mounted(){
          this.get_imgs()
        },
        methods: {
          get_imgs() {
            var that = this
            that.$http.post('http://localhost:5000/get_imgs').then(function (res) {
              that.lists2 =res.data.data
            })
          }
        }
    }
</script>

<style scoped>
  .wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
  .wrapper-content{
    width: 15.66%;
    height: 21%;
    position: relative;
    margin-right: 0.5%;
    margin-left: 0.5%;
  }
</style>
