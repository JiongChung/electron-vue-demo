<template>
    <div class="pagination-item" v-show="showPage">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :pager-count="7"
            layout="sizes, prev, pager, next"
            :page-sizes="[5, 10, 25, 50, 100, 250, 500]"
            :total="pageTotal">
        </el-pagination>
    </div>
</template>
<script>
export default {
    props:["setTotalCount","setPageSize"],
    data(){
        return{
            pageTotal: 0,
            pageSize: 0,
            showPage: false
        }
    },
    mounted(){
        
    },
    watch: {
        setTotalCount(newVal, oldVal) {
            this.updata();
        }
    },
    methods:{
        handleSizeChange(val) {
            this.$emit('linsenEachPageQty',val);
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.$emit('linsenCurrentPage',val)
        },
        updata(){
            this.pageSize = this.setPageSize;
            this.pageTotal = this.setTotalCount;
            if(this.pageSize >= this.pageTotal){
                this.showPage = false;
            }else{
                this.showPage = true;
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .pagination-item{
        float: right;
    }
</style>
