import Vue from 'vue';
import axios from 'axios';
import { MessageBox } from 'element-ui';
import storage from 'electron-localstorage';
let API = 'http://192.168.2.110';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + storage.getItem('_AuthToken');

export const authenticate = (params) => {
    return axios.post(API+'/api/TokenAuth/Authenticate',params).then(res => res.data).catch(error => {
        MessageBox.alert(error.response.data.error.message, '', {
            confirmButtonText: '确定'
        });
    }); 
}

export const getChargeList = (...params) => {
    let input = '';
    let paramsNameList = ['InviteCode','PhoneNumber','NickName','UserGradeId','AgentGradeId','PayMethod','ChargeType','Status','OilCardTypeId','PayFromDate','PayToDate','MaxResultCount','SkipCount'];
    paramsNameList.forEach((item, index) => {
        if(params[index] != undefined){
            input += item + '=' + encodeURIComponent((typeof(params[index]) == 'object') ? moment(params[index].format('YYYY-MM-DD')).toJSON() : params[index]) + '&';
        }
    });   
    return axios.post(API+'/api/services/app/UserCharge/GetChargeList'+input).then(res => res.data).catch(error => {
        MessageBox.alert(error.response.data.error.message, '', {
            confirmButtonText: '确定'
        });
    }); 
};

export const loadHtml = () => {
    let html = ''+ 
        '<div class="el-loading-item">'+
            '<div class="el-loading-mask" style="background:rgba(0,0,0,0.2);"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div></div>'+
        '</div>';
    return html;
};

export default API;