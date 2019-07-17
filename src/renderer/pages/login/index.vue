<template>
    <div class="login-page">
        <div class="login-item">
            <el-form :model="from">
                <el-row>
                    <el-col v-show="isError" :span="24"><el-tag type="danger" class="error-tips"><i class="el-icon-error"></i> {{msg}}</el-tag></el-col>
                    <el-col :span="24">
                        <el-input v-model="from.userNameOrEmailAddress" placeholder="请输入用户名admin"></el-input>
                    </el-col>
                    <el-col :span="24">
                        <el-input type="password" v-model="from.password" placeholder="请输入密码123456"></el-input>
                    </el-col>
                    <el-col :span="24">
                        <el-button type="primary" :loading="saving" :disabled="!isCanSubmit" style="width: 100%" @click="save">登录</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import { authenticate } from '@/api/api';
import CommonService from '@/services/commonService';
import storage from 'electron-localstorage';
export default {
    data () {
        return {
            msg: '',
            from: {
                userNameOrEmailAddress: '',
                password: ''
            },
            isCanSubmit: false,
            saving: false,
            isError: false
        }
    },
    methods: {
        save(){
            this.saving = true;
            authenticate(this.from).then(data => {
                if(data){
                    storage.setItem('_AuthToken',data.result.accessToken);
                    this.saving = false;
                    this.$emit('listenLogin',true);
                    this.$router.push('/admin/bashboard');
                }else{
                    this.saving = false;
                }    
            })
        }
    },
    watch: {
        from: {
            handler(val, oldVal){
                if(this.from.userNameOrEmailAddress && this.from.password){
                    this.isCanSubmit = true;
                }else{
                    this.isCanSubmit = false;
                }
            },deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
    .login-page{
        display: flex;
        align-content: center;
        align-items: center;
        height: 100%;
    }
    .login-item{
        width: 350px;
        margin: auto;

        .el-col{
            padding-bottom: 20px;
        }

        .error-tips{
            font-size: 14px;
            width:100%;
            border-color: #ffa39e;
            white-space: normal;
            padding: 7px 10px;
            line-height: 1.5;
            height: auto;
        }
    }
</style>