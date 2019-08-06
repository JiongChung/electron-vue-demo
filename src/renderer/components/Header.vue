<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
                <template slot="title">智慧油联</template>
                    <el-menu-item index="2-1">交费列表</el-menu-item>
                    <el-menu-item index="2-2">油卡圈存</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3">消息中心</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" @click.prevent="openUrl($event)">订单管理</a></el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'nav',
                activeIndex: '1'
            }
        },
        mounted () {
            console.log(window.location.href)
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key);
                if(key == '1'){
                    this.$router.push('/admin/bashboard')
                }else if(key == '2-1'){
                    this.$router.push('/admin/youlian/pay')
                }else if(key == '2-2'){
                    this.$router.push('/admin/youlian/load')
                }
            },

            openUrl(e){
                this.$electron.shell.openExternal(e.srcElement.href);
            }
        }
    }
</script>