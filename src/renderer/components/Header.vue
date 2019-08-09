<template>
    <div class="header">
        <div class="title">{{msg}}</div>
        <div class="win-tools">
            <div class="min" > <button  @click="min"> - </button></div>
            <div class="max"><button  @click="max"> [] </button></div>
            <div class="close"><button @click="close"> X </button></div>     
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'header'
            }
        },
        mounted () {
          console.log(444444)  
        },
        methods: {
            min(){
                console.log('min');
                this.$electron.ipcRenderer.send('windowMin');
            },

            max(){
                console.log('max');
                this.$electron.ipcRenderer.send('windowMax');
            },

            close(){
                console.log('close');
                this.$electron.ipcRenderer.send('windowClose');
            }
        }
    }
</script>

<style lang="scss">
    .header{
       width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: red;
        position: relative;
        padding-right: 200px;
        // -webkit-app-region: drag;

        .title{
            background: blue;
            -webkit-app-region: drag;
        }

        .win-tools{
            position: absolute;
            width: 200px;
            height: 40px;
            line-height: 40px;
            top: 0;
            right: 0;
            bottom: 0;
            

            .min{
                position: absolute;
                background: 'green';
                right: 100px;
                width: 20px;
            }
            .max{
                position: absolute;
                background: 'yellow';
                right: 60px;
                width: 20px;


            }
            .close{
                position: absolute;
                background:'black';
                right:20px;
                width: 20px;

            }
        }
    }
</style>