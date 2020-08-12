<template>
    <img :src="imgWifi" style="width: 100%;height: 100%">
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                imgWifi:require("../assets/jx.gif")
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
            chat_message: function (msg) {
                console.log(msg.data)
                // var data=JSON.parse(msg.data)
                // console.log(msg.data,data)
            }
        },
    }
</script>

<style scoped>

</style>
