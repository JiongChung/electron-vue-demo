<template>
    <div class="dashboard-page">
            <!-- <div>
                    <router-link to="/admin/bashboard">控制台</router-link>
                    <router-link to="/admin/youlian/">加油</router-link>
                    <router-link to="/account/login">登录</router-link>
                </div> -->

        {{msg}}
    </div>
</template>
<script>
    import * as api from '@/api/api';
    export default {
        data () {
            return {
                msg: 'dashboard page'
            }
        },
        mounted () {
            this.getdata();
        },
        methods: {
            getdata(){
                api.getChargeList().then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>
<style lang="scss">
    .dashboard-page{
    }
</style>