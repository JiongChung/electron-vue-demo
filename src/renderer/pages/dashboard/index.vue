<template>
    <div class="dashboard-page">
            <!-- <div>
                    <router-link to="/admin/bashboard">控制台</router-link>
                    <router-link to="/admin/youlian/">加油</router-link>
                    <router-link to="/account/login">登录</router-link>
                </div> -->

        {{msg}}
        <div>{{AuthToken}}</div>
        -- {{$store.state.count}} --
        <button @click="intCount">增加数量+</button>
        <br><br>
        <button @click="get">获取</button>
    </div>
</template>
<script>
    import * as api from '@/api/api';
    // import storage from 'electron-localstorage';
    export default {
        name: 'Dashboard',
        beforeRouteLeave(to, from, next) {
            console.log(' beforeRouteLeave !', this)
            const answer = window.confirm('确认离开？')
            answer ? next() : next(false)
        },
        beforeRouteEnter(to, from, next) {
            console.log(' beforeRouteEnter !')
            next()
        },
        data () {
            return {
                msg: 'dashboard page',
                AuthToken: '',
                InviteCode: '',
                PhoneNumber: '',
                NickName: '',
                UserGradeId: '',
                AgentGradeId: '',
                PayMethod: '',
                ChargeType: '',
                Status: '',
                OilCardTypeId: '',
                PayFromDate: '',
                PayToDate: '',
                MaxResultCount: 20,
                SkipCount: 0
            }
        },
        mounted () {
            // this.AuthToken = storage.getItem('_AuthToken');
            this.AuthToken = window.localStorage.getItem('_AuthToken');
            this.getdata();
        },
        methods: {
            intCount(){
                this.$store.commit('intCount');
            },
            get(){
                console.log(this.$store.state)
            },

            getdata(){
                api.getChargeList(
                    this.InviteCode ? this.InviteCode : undefined,
                    this.PhoneNumber ? this.PhoneNumber : undefined,
                    this.NickName ? this.NickName : undefined,
                    this.UserGradeId ? this.UserGradeId : undefined,
                    this.AgentGradeId ? this.AgentGradeId : undefined,
                    this.PayMethod ? this.PayMethod : undefined,
                    this.ChargeType ? this.ChargeType : undefined,
                    this.Status ? this.Status : undefined,
                    this.OilCardTypeId ? this.OilCardTypeId : undefined,
                    this.PayFromDate ? this.PayFromDate : undefined,
                    this.PayToDate ? this.PayToDate : undefined,
                    this.MaxResultCount ? this.MaxResultCount : undefined,
                    this.SkipCount ? this.SkipCount : undefined
                ).then(res => {
                    if(res.success){
                        // console.log(res.result)
                    }
                    
                })
            }
        }
    }
</script>
<style lang="scss">
    .dashboard-page{
    }
</style>