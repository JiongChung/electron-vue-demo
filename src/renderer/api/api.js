import Vue from 'vue';
import axios from 'axios';
import { MessageBox } from 'element-ui';
// import storage from 'electron-localstorage';
let API = 'http://api-rc.zhihuiyoulian.com:800';
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + storage.getItem('_AuthToken');
axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('_AuthToken');

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
    return axios.get(API+'/api/services/app/UserCharge/GetChargeList?'+input).then(res => res.data).catch(error => {
        MessageBox.alert(error.response.data.error.message, '', {
            confirmButtonText: '确定'
        });
    }); 
};

export const getLoadCardList = (...params) => {
    let input = '';
    let paramsNameList = ['InviteCode','PhoneNumber','OilCardNo','LoadFromDate','LoadToDate','Status','OilCardTypeId','MaxResultCount','SkipCount'];
    paramsNameList.forEach((item, index) => {
        if(params[index] != undefined){
            input += item + '=' + encodeURIComponent((typeof(params[index]) == 'object') ? moment(params[index].format('YYYY-MM-DD')).toJSON() : params[index]) + '&';
        }
    });   
    return axios.get(API+'/api/services/app/OilCardLoad/GetLoadCardList?'+input).then(res => res.data).catch(error => {
        MessageBox.alert(error.response.data.error.message, '', {
            confirmButtonText: '确定'
        });
    }); 
};

export const getLoadCardListToExcel = (...params) => {
    let input = '';
    let paramsNameList = ['InviteCode','PhoneNumber','OilCardNo','LoadFromDate','LoadToDate','Status','OilCardTypeId','MaxResultCount','SkipCount'];
    paramsNameList.forEach((item, index) => {
        if(params[index] != undefined){
            input += item + '=' + encodeURIComponent((typeof(params[index]) == 'object') ? moment(params[index].format('YYYY-MM-DD')).toJSON() : params[index]) + '&';
        }
    });   
    return axios.get(API+'/api/services/app/OilCardLoad/GetLoadCardListToExcel?'+input).then(res => res.data).catch(error => {
        MessageBox.alert(error.response.data.error.message, '', {
            confirmButtonText: '确定'
        });
    }); 
};


export const getDrawingApplyList = (...params) => {
    let input = '';
    let paramsNameList = ['InviteCode','PhoneNumber','Status','DrawingFromDate','DrawingToDate','MaxResultCount','SkipCount'];
    paramsNameList.forEach((item, index) => {
        if(params[index] != undefined){
            input += item + '=' + encodeURIComponent((typeof(params[index]) == 'object') ? moment(params[index].format('YYYY-MM-DD')).toJSON() : params[index]) + '&';
        }
    });   
    return axios.get(API+'/api/services/app/UserAssetDrawingApply/GetDrawingApplyList?'+input).then(res => res.data).catch(error => {
        MessageBox.alert(error.response.data.error.message, '', {
            confirmButtonText: '确定'
        });
    }); 
};



export const getOilCardType = () => {return axios.get(API+'/api/services/app/DropDownData/GetOilCardType').then(res => res.data); };
export const getOilCardLoadStatus = () => {return axios.get(API+'/api/services/app/DropDownData/GetOilCardLoadStatus').then(res => res.data); };
export const getDrawingStatus = () => {return axios.get(API+'/api/services/app/DropDownData/GetDrawingStatus').then(res => res.data); };


// downloadTempFile 导出xls
export const downloadTempFile = params => {
    const url = API + '/File/DownloadTempFile?fileType=' + params.fileType + '&fileToken=' + params.fileToken + '&fileName=' + params.fileName;
    window.location.href = url; 
}

export const loadHtml = () => {
    let html = ''+ 
        '<div class="el-loading-item">'+
            '<div class="el-loading-mask" style="background:rgba(0,0,0,0.2);"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div></div>'+
        '</div>';
    return html;
};

export default API;