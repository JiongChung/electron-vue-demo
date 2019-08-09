<template>
    <div class="main-content-item">
        <h2>交费列表</h2>
         {{$store.state.count}}
        <button @click="intCount">增加数量+</button>
        <!-- <v-search v-on:listenSearch="showSearchData"></v-search> -->
        <div class="list-item">
            <div class="count">
                <span>共{{totalCount}}条记录</span>
            </div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                    <th style="width: 50px;">#</th>
                    <th>订单号码</th>
                    <th>用户信息</th>
                    <th>用户等级</th>
                    <th>充值金额</th>
                    <th>支付金额</th>
                    <th>佣金</th>
                    <th>支付信息</th>
                    <th>支付时间</th>
                    <th>充值类型</th>
                    <th>充值卡信息</th>
                    <th>下单时间</th>
                    <th>订单状态</th>
                    <th>操作</th>
                </tr>
                <tr v-for="record in tableData">
                    <td>{{record.serialnumber}}</td>
                    <td>{{record.chargeNo | numberIntercept}}</td>
                    <td>
                        ID：{{record.inviteCode}}
                        <br />
                        昵称：{{record.nickName}}
                        <br />
                        手机：{{record.phoneNumber}}
                    </td>
                    <td>
                        {{record.userGradeName}}
                        <div class="partner-label" :class="{'active': record.agentGradeId}" v-if="record.agentDistrictName && record.agentGradeId != 4">
                            <el-tag size="mini" type="success" v-if="record.agentDistrictName">{{record.agentDistrictName}}</el-tag><br />
                            <!-- <em v-show="!record.agentGradeId == 4"></em> -->
                            <el-tag size="mini" type="success" v-if="record.agentGradeName || record.agentGradeId == 4">{{record.agentGradeName}}</el-tag>
                            <el-tag size="mini" type="success" v-if="record.agentGradeId == 4">全国合伙人</el-tag>
                        </div>
                        <div class="branchagent" v-if="record.branchAgent">
                            <el-tag size="mini">{{record.branchAgent}}</el-tag><br />
                            <el-tag size="mini" v-if="record.subBranchAgent">{{record.subBranchAgent}}</el-tag>
                        </div>
                    </td>
                    <td>{{record.chargeAmount}}</td>
                    <td>
                        {{record.payAmount}}
                        <span v-show="record.payAmount == null">-</span>
                    </td>
                    <td>{{record.commissionAmount}}</td>
                    <td>
                        {{record.payMethodName}}<span v-if="record.payMethodName">支付<br /></span>
                        <span v-if="record.payTransactionNo">单号：</span>{{record.payTransactionNo | numberIntercept}}
                    </td>
                    <td>{{record.payTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</td>
                    <td>
                        {{record.chargeTypeName}}
                        <br />
                        <el-tag size="mini" type="info" v-if="record.chargeType != 2 && record.chargeSalePlanName">{{record.chargeSalePlanName}}</el-tag>
                    </td>
                    <td>
                        {{record.oilCardNo | numberIntercept(11)}}
                        <el-tag size="mini" v-show="record.oilCardTypeName">{{record.oilCardTypeName}}</el-tag>
                    </td>
                    <td>{{record.createdTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</td>
                    <td>
                        <el-tag size="mini" type="danger" v-if="record.status == 1" v-show="record.statusName">{{record.statusName}}</el-tag>
                        <el-tag size="mini" v-else-if="record.status == 2" v-show="record.statusName">{{record.statusName}}</el-tag>
                        <el-tag size="mini" type="warning" v-else-if="record.status == 3" v-show="record.statusName">{{record.statusName}}</el-tag>
                        <el-tag size="mini" type="success" v-else-if="record.status == 4" v-show="record.statusName">{{record.statusName}}</el-tag>
                        <el-tag size="mini" type="info" v-else-if="record.status == 5" v-show="record.statusName">{{record.statusName}}</el-tag>
                        <el-tag size="mini" type="success" v-else-if="record.status == 6" v-show="record.statusName">{{record.statusName}}</el-tag>
                        <el-tag size="mini" type="danger" v-else="record.status == 7" v-show="record.statusName">{{record.statusName}}</el-tag>
                    </td>
                    <td>
                        <!-- <el-button size="mini" type="primary" @click="createOrEditPaylistModal(record.id)" plain>查看</el-button> -->
                        <router-link :to="'/admin/youlian/detail/'+record.id+'.html?idd=434'">查看</router-link>
                    </td>
                </tr>
            </table>
            <div class="page-item clearfix">
                <span class="totalCount">Total: {{totalCount}}</span>
                <v-page 
                    :setPageSize="MaxResultCount" 
                    :setTotalCount="totalCount" 
                    v-on:linsenCurrentPage="showCurrentPageFromChild"
                    v-on:linsenEachPageQty="showEachPageQtyFromChild"
                ></v-page>
            </div>
            <div v-html="loadingHtml" v-show="isloading"></div>
        </div>
        <!-- <v-createoreditpaylistmodal
            :dialogVisible="dialogVisible"
            :tableData="tableData"
            v-on:linsenDialog="showMsgFromDialog"
            ref="createOrEditModal">
        </v-createoreditpaylistmodal> -->
    </div>
</template>
<script>
    import * as api from '@/api/api';
    import Pagination from '@/components/page/index';    
    import CommonService from '@/services/commonService';

    export default {
        components: {
            'v-page': Pagination,
            // 'v-search': Search,
            // 'v-createoreditpaylistmodal': CreateOrEditPaylistModal
        },
        data () {
            return {
                msg: 'pay page',
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
                SkipCount: 0,
                totalCount: 0,
                currentPageTotal: 0,
                totalResult: [],
                tableData: [],
                loadingHtml: '',
                isloading: false,
                dialogVisible: false
            }
        },
        mounted () {
            this.getdata();
        },
        methods: {
            intCount(){
                this.$store.commit('intCount');
            },
            getdata(){
                this.isloading = true;
                this.loadingHtml = CommonService.loadHtml();
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
                        console.log(res.result)
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
                // alert(data);
                this.SkipCount = this.MaxResultCount * (data - 1);
                this.getdata();
            },

            showEachPageQtyFromChild(data){
                this.MaxResultCount = data;
                this.getdata();
            }
        }
    }
</script>