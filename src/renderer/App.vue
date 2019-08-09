<template>
    <div>
        <v-header></v-header>
        <div id="app" :style="{'height':appHeight+'px'}">
            <v-menu v-show="isLogin" class='menu'></v-menu>
            <div class="contentbox"  :style="{'height':contentHeight+'px'}">
                <router-view v-on:listenLoadingHtml="showMsgLoadingHtml"  v-on:listenLogin="showLoginMsg" v-if="isRouterAlive"></router-view>
            </div>
            <div v-html="loadingHtml" v-show="isloading"></div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import storage from 'electron-localstorage';
    import CommonService from '@/services/commonService';    
    import Menu from '@/components/Menu';
    import Header from '@/components/Header';
    
    export default {
        name: 'my-project',
        components: {
            'v-menu': Menu,
            'v-header': Header
        },
        provide(){
            return{
                reload: this.reload
            }
        },
        data () {
            return {
                isRouterAlive: true,
                loadingHtml: '',
                isloading: false,
                isLogin: true,
                appHeight: document.documentElement.clientHeight,
                contentHeight: 0
            }
        },
        // sockets:{
        //     connect(){
        //         console.log('socket connectedsss')
        //     },
        //     customEmit(val){
        //         console.log(val)
        //         const option = {
        //             title: '提示',
        //             body: '网络已经断开，请检查您的网络设置。'
        //         };

        //         const myNotification = new window.Notification(option.title, option);
        //     }
        // },
        mounted () {
            this.appHeight = document.documentElement.clientHeight - 40;
            this.contentHeight = this.appHeight - document.querySelector('.menu').clientHeight;
            window.onresize = () =>{
                this.appHeight = document.documentElement.clientHeight - 40;
                this.contentHeight = this.appHeight - document.querySelector('.menu').clientHeight;
            }

            window.addEventListener('online', function() {
                console.log('有网络。。。。')
            });

            window.addEventListener('offline', function() {
                const option = {
                    title: '提示',
                    body: '网络已经断开，请检查您的网络设置。'
                };

                const myNotification = new window.Notification(option.title, option);
            });


            // 监听右键菜单
            window.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.$electron.ipcRenderer.send('contextmenu');
            }, false);

            this.$nextTick(() => {
                let cur = document.querySelectorAll(".menu");
                let curHeight = cur[0].clientHeight;
            });
            this.loadingHtml = CommonService.loadHtml();
            this.$nextTick(() => {
                if(!CommonService.isLogin()){
                    this.isloading = false;
                    this.isLogin = false;
                    this.$router.push('/account/login');
                }
            });

            window.addEventListener('main-process-messages', (e, data) => {
                e.preventDefault();
                console.log(434)
                console.log(data);
            }, false);

            // this.$electron.ipcRenderer.on("main-process-messages", (event, data) => {
            //     console.log(434)
            //     console.log(data);
            // });
        },
        methods: {
            reload(){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + storage.getItem('_AuthToken');
                this.isRouterAlive = false;
                this.$nextTick(function(){
                    this.isRouterAlive = true;
                });
            },
            showMsgLoadingHtml(data){
                this.isloading = data;
            },
            showLoginMsg(data){
                this.isLogin = data;
            }
        }
    }
</script>

<style lang="scss">
  /* CSS */
  #app{
      height: 400px;
      overflow-y: hidden;
  }
  .contentbox{
      height: 100%;
  }
</style>
