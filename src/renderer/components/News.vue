<template>
    <div>
        {{msg}}
        <br />
        <br />
        <button @click="add">新增</button>
        <br />
        <br />
        <button @click="sendMain">给主进程广播数据</button>
    </div>
</template>
<script>
    // import '../icp.js';
export default {
    data () {
        return {
            msg: '323'
        }
    },
    mounted () {
        const url = window.location.href;
        setTimeout(() => {
            
        console.log(this.$store.state)
        }, 10000);
    },
    methods: {
        add(){
            
        },
        sendMain(){
            this.$electron.ipcRenderer.send('toMain','我是渲染进程里面的数据');

            /*主进程给渲染进程传值，再更新msg的值*/
            this.$electron.ipcRenderer.on("reply", (event, data) => {
                console.log(434)
                console.log(data);
                this.msg = data;
            });
        },
        reply(data){
            console.log(data)
        }
    }
}
</script>