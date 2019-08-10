<template>
    <div style="height: 100%">
        <v-header v-if="!isWeb"></v-header>
        <div id="app" :class="{appitem: !isWeb}" :style="styleAapp">
            <v-menu v-show="isLogin" class='menu'></v-menu>
            <div class="contentbox"  :style="styleContentHeight">
                <div class="main-content-item" :class="{iselectron: !isWeb}">
                    <router-view v-on:listenLoadingHtml="showMsgLoadingHtml"  v-on:listenLogin="showLoginMsg" v-if="isRouterAlive"></router-view>
                </div>
            </div>
            <div v-html="loadingHtml" v-show="isloading"></div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    // import storage from 'electron-localstorage';
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
                contentHeight: 0,
                isWeb: false,
                styleContentHeight: {
                    height: 0
                },
                styleAapp: {
                    height: 0
                }
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
            if(this.$electron != undefined){
                this.appHeight = document.documentElement.clientHeight - 40;
                this.styleAapp.height = this.appHeight + 'px';
                this.contentHeight = this.appHeight - document.querySelector('.menu').clientHeight;
                this.styleContentHeight.height = this.contentHeight + 'px';
                window.onresize = () =>{
                    this.appHeight = document.documentElement.clientHeight - 40;
                    this.styleAapp.height = this.appHeight + 'px';
                    this.contentHeight = this.appHeight - document.querySelector('.menu').clientHeight;
                    this.styleContentHeight.height = this.contentHeight + 'px';
                }

                // 监听右键菜单
                window.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.$electron.ipcRenderer.send('contextmenu');
                }, false);

                window.addEventListener('main-process-messages', (e, data) => {
                    e.preventDefault();
                    console.log(434)
                    console.log(data);
                }, false);

            }else{
                this.isWeb = true;
                this.styleContentHeight = {};
                this.styleAapp = {};
            }
            console.log(this.$electron);
            

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


            

            this.$nextTick(() => {
                let cur = document.querySelectorAll(".menu");
                let curHeight = cur[0].clientHeight;
            });
            this.loadingHtml = CommonService.loadHtml();
            this.$nextTick(() => {
                console.log(444444444)
                if(!CommonService.isLogin()){
                    this.isloading = false;
                    this.isLogin = false;
                    this.$router.push('/account/login');
                }
            });

            

            // this.$electron.ipcRenderer.on("main-process-messages", (event, data) => {
            //     console.log(434)
            //     console.log(data);
            // });
        },
        methods: {
            reload(){
                // axios.defaults.headers.common['Authorization'] = 'Bearer ' + storage.getItem('_AuthToken');
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('_AuthToken');
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
      height: 100%;
  }
  .contentbox{
      height: 100%;
  }
</style>
