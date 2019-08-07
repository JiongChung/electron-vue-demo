<template>
    <div class="createOrEditModal">
        <el-dialog
            title="查看详细"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="close">
                <span>这是一段信息 {{msg}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="close">关闭</el-button>
                    <el-button type="primary" @click="save" :loading="saving">保存</el-button>
                </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: ['dialogVisible','tableData'],
        data () {
            return {
                msg: 'dialog',
                saving: false,
                myForm: {}
            }
        },
        methods: {
            close(){
                this.$emit('linsenDialog',{dialogVisible: false});
            },
            show(viewid){
                this.myForm = this.tableData.filter(item => item.id == viewid)[0];
                console.log(this.myForm)
            },

            save(){
                this.saving = true;
                setTimeout(() => {
                    this.$message({type: 'success', message: '保存成功'});
                    this.saving = false;
                    this.$emit('linsenDialog',{dialogVisible: false});
                    this.$emit('modalSave');
                }, 2000);
            }
        }
    }
</script>