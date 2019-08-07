<template>
    <div class="search-item">
        <el-form @keyup.enter.native="submitSearch()" ref="form">
            <el-row :gutter="20">
                <el-col :span="4">
                    <span class="label">用户ID</span>
                    <el-input v-model="InviteCode" size="small" placeholder="请输入用户ID"></el-input>
                </el-col>
                <el-col :span="4">
                    <span class="label">用户手机</span>
                    <el-input v-model="PhoneNumber" size="small" placeholder="请输入用户手机"></el-input>
                </el-col>
                <el-col :span="4">
                    <span class="label">圈存时间</span>
                    <el-date-picker
                        v-model="DrawingFromDate"
                        type="date"
                        size="small"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="4">
                    <span class="label">至</span>
                    <el-date-picker
                        v-model="DrawingToDate"
                        type="date"
                        size="small"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="4">
                    <span class="label">状态</span>
                    <el-select v-model="Status" size="small" placeholder="全部">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                            v-for="item in statusList"
                            :key="item.id"
                            :label="item.value"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" style="padding-top:35px">
                    <el-button type="primary" size="small" @click="submitSearch">查询</el-button>
                    <!-- <el-button plain type="info" size="small" :loading="isExcel" @click="exportToExcel()"><i v-show="!isExcel" class="el-icon-document el-icon--right"></i> 导出到Excel</el-button> -->
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
    import * as api from '@/api/api';
    import * as moment from 'moment';

    export default {
        data () {
            return {
                InviteCode: '',
                PhoneNumber: '',
                Status: '',
                DrawingFromDate: '',
                DrawingToDate: '',
                statusList: [],
                searchParameter: {},
                isExcel: false,
            }
        },

        mounted() {
            this.getDrawingStatusData();
        },

        methods: {
            getDrawingStatusData(){
                api.getDrawingStatus().then(response => {
                    this.statusList = response.result;
                });
            },

            submitSearch(){
                this.searchParameter.InviteCode = this.InviteCode.trim();
                this.searchParameter.PhoneNumber = this.PhoneNumber.trim();
                this.searchParameter.Status = this.Status ? parseInt(this.Status) : null;
                this.searchParameter.DrawingFromDate = this.DrawingFromDate ? moment(this.DrawingFromDate).format('YYYY-MM-DDTHH:mm:ssZ').replace('+08:00','.000Z') : '';
                this.searchParameter.DrawingToDate = this.DrawingToDate ? moment(this.DrawingToDate).format('YYYY-MM-DDTHH:mm:ssZ').replace('+08:00','.000Z') : '';
                this.$emit('listenSearch',this.searchParameter);
            }            
        }       
    }
</script>