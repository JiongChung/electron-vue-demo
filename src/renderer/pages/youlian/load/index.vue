<template>
    <div class="main-content-item">
        <h2>油卡圈存</h2>
        <v-search v-on:listenSearch="getSearchData"></v-search>
        <div class="list-item">
            <div class="count">
                <span>共{{totalCount}}条记录</span>
            </div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                    <th style="width: 50px;">#</th>
                    <th>用户ID</th>
                    <th>用户昵称</th>
                    <th>手机号码</th>
                    <th>充值卡号类型</th>
                    <th>充值卡号</th>
                    <th>即时充值</th>
                    <th>充值金额</th>
                    <th>油豆消耗</th>
                    <th>佣金消耗</th>
                    <th>提交时间</th>
                    <th>充值状态</th>
                    <th>操作</th>
                </tr>
                <tr v-for="record in tableData">
                    <td>{{record.serialnumber}}</td>
                    <td>{{record.inviteCode}}</td>
                    <td>{{record.nickName}}</td>
                    <td>{{record.PhoneNumber}}</td>
                    <td>
                        <span v-show="record.oilCardTypeId == 1">中石油</span>
                        <span v-show="record.oilCardTypeId == 2">中石化</span>
                        <span v-show="record.oilCardTypeId == 3">欧粤新能源</span>
                    </td>
                    <td>{{record.oilCardNo}}</td>
                    <td>
                        <span v-if="record.isRealTimeRecharge">是</span>
                    </td>
                    <td>{{record.loadAmount}}</td>
                    <td>{{record.usedPoints}}</td>
                    <td>{{record.usedCommissionAmount}}</td>
                    <td>{{record.loadTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</td>
                    <td>
                        <el-tag size="mini" v-if="record.status == 2">圈存成功</el-tag>
                        <el-tag type="warning" size="mini" v-if="record.status == 1">待处理</el-tag>
                        <el-tag type="danger" size="mini" v-if="record.status == 3">圈存失败</el-tag>
                    </td>
                    <td>
                        <el-button size="mini" type="info" v-if="record.status == 1" @click="createOrEditModal(record.id)" plain>编辑</el-button>
                        <el-button size="mini" type="info" v-if="record.status > 1" @click="createOrEditModal(record.id)" plain>查看</el-button>
                        <el-button size="mini" type="primary" @click="businessorderNow(record.id, record.oilCardTypeId, record.oilCardNo)" v-if="record.status == 1" plain>立即圈存</el-button>
                    </td>
                </tr>
            </table>
            <div class="page-item clearfix">
                <span class="totalCount">Total: {{totalCount}}</span>
                <v-pagination 
                    :setPageSize="MaxResultCount" 
                    :setTotalCount="totalCount" 
                    v-on:linsenCurrentPage="showCurrentPageFromChild"
                    v-on:linsenEachPageQty="showEachPageQtyFromChild"
                ></v-pagination>
            </div>
            <div v-html="loadingHtml" v-show="isloading"></div>
        </div>
        <!-- <v-createoreditmodal
            :dialogVisible="dialogVisible"
            :tableData="tableData"
            :oilCardTypeList="oilCardTypeList"
            v-on:linsenDialog="showMsgFromDialog"
            @modalSave="getLoadCardList()"
            ref="createOrEditModal">
        </v-createoreditmodal> -->
    </div>
</template>
<script>
    import * as api from '@/api/api';
    import Pagination from '@/components/page/index';
    import CommonService from '@/services/commonService';
    import Search from '@/pages/youlian/load/search';

    export default {
        components: {
            'v-pagination' : Pagination,
            'v-search': Search,
            // 'v-createoreditmodal': CreateOrEditModal
        },
        data () {
            return{
                InviteCode: '',
                PhoneNumber: '',
                OilCardNo: '',
                LoadFromDate: '',
                LoadToDate: '',
                Status: '',
                OilCardTypeId: '',
                MaxResultCount: 10,
                SkipCount: 0,
                totalCount: 0,
                currentPageTotal: 0,
                totalResult: [],
                tableData: [],
                loadingHtml: '',
                isloading: false,
                dialogVisible: false,
                oilCardTypeList: []
            }
        },
        mounted(){
            this.getData();
        },
        methods: {
            getData(){
                this.isloading = true;
                this.loadingHtml = CommonService.loadHtml();
                api.getLoadCardList(
                    this.InviteCode ? this.InviteCode : undefined,
                    this.PhoneNumber ? this.PhoneNumber : undefined,
                    this.OilCardNo ? this.OilCardNo : undefined,
                    this.LoadFromDate ? this.LoadFromDate : undefined,
                    this.LoadToDate ? this.LoadToDate : undefined,
                    this.Status ? this.Status : undefined,
                    this.OilCardTypeId ? this.OilCardTypeId : undefined,
                    this.MaxResultCount ? this.MaxResultCount : undefined,
                    this.SkipCount ? this.SkipCount : undefined
                ).then(res => {
                    console.log(res.result);
                    if(res.success){
                        this.isloading = false;
                        this.tableData = res.result.items;
                        this.totalCount = res.result.totalCount;
                        for(let i=0; i<res.result.items.length; i++){
                            this.tableData[i].serialnumber = i + 1 + this.currentPageTotal;
                        }
                    }
                    
                })
            },

            showCurrentPageFromChild(data){
                this.SkipCount = this.MaxResultCount * (data - 1);
                this.getdata();
            },

            showEachPageQtyFromChild(data){
                this.MaxResultCount = data;
                this.getdata();
            },

            getSearchData(data){
                this.InviteCode = data.InviteCode;
                this.PhoneNumber = data.PhoneNumber;
                this.OilCardNo = data.OilCardNo;
                this.LoadFromDate = data.LoadFromDate;
                this.LoadToDate = data.LoadToDate;
                this.Status = data.Status;
                this.OilCardTypeId = data.OilCardTypeId;
                this.getData();
            }
        }
    }
</script>