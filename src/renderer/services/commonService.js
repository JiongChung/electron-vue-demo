// import storage from 'electron-localstorage';
export default class CommonService {
    static get(key, type){
        return (type != undefined) ? JSON.parse(window.localStorage.getItem(key)) : window.localStorage.getItem(key);
    }

    static save(key, value, type){
        return (type != undefined) ? window.localStorage.setItem(key, JSON.stringify(value)) : window.localStorage.setItem(key, value);  
    }

    static remove(key){
        return window.localStorage.removeItem(key);
    }

    static isLogin(){
        let status = false;
        // let token = storage.getItem('_AuthToken');        
        let token = this.get('_AuthToken');
        if(token){
            status = true;
        }
        return status;
    }

    static loadHtml = () => {
        let html = ''+ 
            '<div class="el-loading-item">'+
                '<div class="el-loading-mask" style="background:rgba(0,0,0,0.2);"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div></div>'+
            '</div>';
        return html;
    };
}