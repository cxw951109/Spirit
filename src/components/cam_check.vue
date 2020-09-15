<template>

    <div class="wrapper">
      <div class="wrapper-content" v-for="(item,index) in lists2">
          <img :src="$host +item.images" style="width:100%;height: 100%" v-if="item.images" alt="">
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
              {"id":12,"images":''},{"id":13,"images":''},{"id":14,"images":''},{"id":15,"images":''},{"id":16,"images":''},{"id":17,"images":''},{"id":18,"images":''},{"id":19,"images":''},{"id":20,"images":''},{"id":21,"images":''},{"id":22,"images":''},{"id":23,"images":''},
              {"id":24,"images":''},{"id":25,"images":''},{"id":26,"images":''},{"id":27,"images":''},{"id":28,"images":''},{"id":29,"images":''},{"id":30,"images":''},{"id":31,"images":''},{"id":32,"images":''},{"id":33,"images":''},{"id":34,"images":''},{"id":35,"images":''}
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
            console.log(msg)
            // that.lists2[msg.data["id"]]["images"]=require("@/assets/site_data/now/"+msg["images"]+".jpg");
            // console.log(msg.data["images"])
            // var d =msg.data["images"]

            // that.imageurl(msg.data["id"])
            // Vue.set(that.lists2,msg.data["id"],msg.data)
            // var imgs =require('C:/Users/cxw/Desktop/711/Spirit/src/assets/site_data/now/1_1599187916.jpg')
            that.lists2[msg.data["id"]]["images"]=msg.data["images"]
          }
        },
        mounted(){
          this.get_imgs()
        },
        methods: {
          get_imgs() {
            var that = this
            that.$http.post('http://localhost:5000/get_imgs').then(function (res) {
              console.log(res.data.data)
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
    width: 9%;
    height: 20%;
    position: relative;
    margin-right: 0.5%;
    margin-left: 0.5%;
    border: solid 1px black;
  }
</style>
