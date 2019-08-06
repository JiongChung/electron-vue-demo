<template>
    <div class="search-item">
        <el-form @keyup.enter.native="submitSearch()" ref="form">
            <el-row :gutter="20">
                <el-col :span="6">
                    <span class="label">用户ID</span>
                    <el-input v-model="InviteCode" size="small" placeholder="请输入用户ID"></el-input>
                </el-col>
                <el-col :span="6">
                    <span class="label">用户手机</span>
                    <el-input v-model="PhoneNumber" size="small" placeholder="请输入用户手机"></el-input>
                </el-col>
                <el-col :span="6">
                    <span class="label">充值卡号</span>
                    <el-input v-model="OilCardNo" size="small" placeholder="请输入充值卡号"></el-input>
                </el-col>
                <el-col :span="6">
                    <span class="label">充值卡类型</span>
                    <el-select v-model="OilCardTypeId" size="small" placeholder="全部">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                            v-for="item in oilCardTypeList"
                            :key="item.id"
                            :label="item.value"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <span class="label">圈存状态</span>
                    <el-select v-model="Status" size="small" placeholder="全部">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                            v-for="item in oilCardLoadStatusList"
                            :key="item.id"
                            :label="item.value"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <span class="label">圈存时间</span>
                    <el-date-picker
                        v-model="LoadFromDate"
                        type="date"
                        size="small"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="6">
                    <span class="label">至</span>
                    <el-date-picker
                        v-model="LoadToDate"
                        type="date"
                        size="small"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="6" style="padding-top:35px">
                    <el-button type="primary" size="small" @click="submitSearch">查询</el-button>
                    <el-button plain type="info" size="small" :loading="isExcel" @click="exportToExcel()"><i v-show="!isExcel" class="el-icon-document el-icon--right"></i> 导出到Excel</el-button>
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
                OilCardNo: '',
                OilCardTypeId: '',
                Status: '',
                LoadFromDate: '',
                LoadToDate: '',
                oilCardTypeList: [],
                oilCardLoadStatusList: [],
                searchParameter: {},
                isExcel: false,
            }
        },

        mounted() {
           this.getOilCardTypeData();
           this.getOilCardLoadStatusData();
       },

       methods: {
            getOilCardTypeData(){
                api.getOilCardType().then(response => {
                    console.log(response);
                    this.oilCardTypeList = response.result;
                });
            },
            getOilCardLoadStatusData(){
                api.getOilCardLoadStatus().then(response => this.oilCardLoadStatusList = response.result);
            },
            submitSearch(){
                this.searchParameter.InviteCode = this.InviteCode.trim();
                this.searchParameter.PhoneNumber = this.PhoneNumber.trim();
                this.searchParameter.OilCardNo = this.OilCardNo.trim();
                this.searchParameter.OilCardTypeId = this.OilCardTypeId;
                this.searchParameter.Status = this.Status;
                this.searchParameter.LoadFromDate = this.LoadFromDate ? moment(this.LoadFromDate).format('YYYY-MM-DDTHH:mm:ssZ').replace('+08:00','.000Z') : '';
                this.searchParameter.LoadToDate = this.LoadToDate ? moment(this.LoadToDate).format('YYYY-MM-DDTHH:mm:ssZ').replace('+08:00','.000Z') : '';
                this.$emit('listenSearch',this.searchParameter);
            },

            exportToExcel(){
                api.getLoadCardListToExcel(
                    this.InviteCode ? this.InviteCode : undefined,
                    this.PhoneNumber ? this.PhoneNumber : undefined,
                    this.OilCardNo ? this.OilCardNo : undefined,
                    this.LoadFromDate ? this.LoadFromDate : undefined,
                    this.LoadToDate ? this.LoadToDate : undefined,
                    this.Status ? this.Status : undefined,
                    this.OilCardTypeId ? this.OilCardTypeId : undefined,
                    1,
                    0
                ).then(res => {
                    if(res.success){
                        api.downloadTempFile(res.result);
                    }
                    
                })
                
            }
       }       
    }
</script>