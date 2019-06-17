<template>
<div id="index">
  <top-menu></top-menu>
  <div class="blank-space"></div>
  <div class="main-content">
    <div class="introduction">
      <span>Welcome!</span><br/>
      <span>欢迎使用 Beiker-UI</span><br/>
      <span>体验更智能的组件</span><br/>
      <router-link to="/test">
        <button class="login-button" @mouseover="hoverShake_copy($event,8,60)" @mouseleave="shakeStatus = false">立即进入</button>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
    import topMenu from '../components/top-menu/top-menu'
    export default {
        components:{
            'top-menu': topMenu
        },
        name: "index",
        data() {
            return {
                shakeStatus: false,

            };
        },
        mounted(){
            function addStyle(element,key,value,time){
                return new Promise(resolve => {
                    setTimeout(()=>{
                        element.style[key] = value;
                        resolve();
                    },time);
                })
            }
            (async function(){
                let animatedDiv = document.getElementsByClassName('introduction')[0];
                await addStyle(animatedDiv,'margin-right','200px',0);
                await addStyle(animatedDiv,'transition','all 0.15s ease-out',700);
                await addStyle(animatedDiv,'margin-right','120px',0);
                await addStyle(animatedDiv,'margin-right','180px',120);
            }());

        },
        methods: {
            // 防抖函数
            debounce: function(method,context,time){
                let id;
                return function(...args){
                    clearTimeout(id);
                    id = setTimeout(() => {
                        method.apply(this,args);
                    },time);
                };
            },

            //节流函数
            throttle: function(method, time) {
                let id;
                return function(...args) {
                    let context = this;
                    if (!id) {
                        id = setTimeout(() => {
                            method.apply(context, args);
                            id = null;
                        }, time)
                    }
                }
            },

            //抖动
            hoverShake: function(event,deg,time) {
                let element = event.target || event.srcElement;
                let id = null;
                let that = this;
                that.$data.shakeStatus = true;
                function shake(element,direction,deg,time) {
                    if(!that.$data.shakeStatus){
                        element.style['transform'] = 'rotate(0deg)';
                        return ;
                    }
                    clearTimeout(id);
                    id = setTimeout(()=>{
                        element.style['transform'] = 'rotate(' + (direction?'':'-') + deg + 'deg)';
                        shake(element,!direction,deg,time);
                    },time);
                }
                setTimeout(shake(element,true,deg,time),time);
            },

            //使用封装节流函数的抖动
            hoverShake_copy: function (event,deg,time) {
                let element = event.target || event.srcElement,
                    that = this,
                    direction = true,
                    debounceShake = that.debounce(shake,time),
                    throttleShake = that.throttle(shake,time);

                that.$data.shakeStatus = true;
                function shake() {
                    if(!that.$data.shakeStatus){
                        element.style['transform'] = 'rotate(0deg)';
                        return ;
                    }
                    setTimeout(()=>{
                        element.style['transform'] = 'rotate(' + (direction?'':'-') + deg + 'deg)';
                        direction = !direction;
                        debounceShake();
                        //throttleShake();
                    },time);
                }
                debounceShake();
                //throttleShake();
            }

        }
    }
</script>

<style lang="less">

#index{
    overflow: hidden;

    .login-button{
      width: 150px;
      height: 50px;
      cursor: pointer;
      /*background-color: dodgerblue;*/
      background-color: #dd5347;
      font-size: 18px;
      outline: none;
      border: none;
      color: white;
      transfrom: rotate(0deg);
      will-change: transfrom;
      transition: all 0.3s;
    }

    .navigator{
        padding: 0;
        width: 100%;
        height: 50px;
        left: 0;
        top:0;
        box-shadow: 0 0 3px #333333;
        border-bottom: 1px solid whitesmoke;
        position: fixed;
        background-color: white;
        z-index: 1000;

        .right-menu{
            position: fixed;
            padding: 0;
            margin: 0;
            top:0;
            float: right;
            width: 150px;
            background-color: #dd5347;
            /*background-color: dodgerblue;*/
            height: 51px;
            right: 0;
            line-height: 50px;

            .menu-title{
                text-align: center;
                margin-left: auto;
                margin-right: auto;
                color: white;
                font-weight: normal;
                font-size: 14px;
            }
        }

        .left-menu{
            width: 60px;
            margin-left: 20px;

            .icon{
                width: 30px;
                height: 30px;
                margin: 10px 0 0 0;
            }
        }
    }

    .blank-space{
        width: 50px;
    }

    .main-content{
        left: 0;
        margin: 0;
        padding: 0;
        background: url("../assets/background.jpg")0 0 no-repeat ;
        background-size: cover;
        width: 100%;
        height: 100vh;

        .introduction{
            color: white;
            margin-top: 200px;
            float: right;
            margin-right: -500px;
            font-size: 50px;
            font-weight: lighter;
            font-family: "Roboto","Helvetica",arial,sans-serif;
            transition: all 0.8s ;
        }
    }

}


</style>