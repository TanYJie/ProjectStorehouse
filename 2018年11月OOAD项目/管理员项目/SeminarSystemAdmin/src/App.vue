<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    //添加cookie
    addCookie: function (objName, objValue, objHours) {
      console.log("cookie名字:"+objName+"执行加入cookie"+" 值为"+objValue);
      var str = objName + "=" + decodeURI(objValue);
      if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toUTCString();
      }
      document.cookie = str;
    },
    //获取指定名称的cookie的值
    getCookie: function (objName) {
      var arrStr = document.cookie.split("; ");
      for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName)
          return decodeURI(temp[1]);
      }
      return "";
    },
    //为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
    delCookie: function (objname) {
      this.addCookie(objname,"",0);
    },
  }
}
</script>

<style>
#app {

}
</style>
