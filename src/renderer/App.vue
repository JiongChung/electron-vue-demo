<template>
  <div id="app">
    <v-header v-show="isLogin" class='header'></v-header>
    <router-view v-on:listenLoadingHtml="showMsgLoadingHtml"  v-on:listenLogin="showLoginMsg" v-if="isRouterAlive"></router-view>
    <div v-html="loadingHtml" v-show="isloading"></div>
  </div>
</template>

<script>
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
        mounted () {
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
