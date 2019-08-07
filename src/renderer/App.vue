<template>
  <div id="app">
    <v-header v-show="isLogin" class='header'></v-header>
    <router-view v-on:listenLoadingHtml="showMsgLoadingHtml"  v-on:listenLogin="showLoginMsg" v-if="isRouterAlive"></router-view>
    <div v-html="loadingHtml" v-show="isloading"></div>
  </div>
</template>

<script>
    import axios from 'axios';
    import storage from 'electron-localstorage';
    import CommonService from '@/services/commonService';    
    import Header from '@/components/Header';
    
    export default {
        name: 'my-project',
        components: {
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
                isLogin: true
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
                let cur = document.querySelectorAll(".header");
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
      height: 100%;
  }
</style>
