import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// import modules from './modules'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   modules,
//   strict: process.env.NODE_ENV !== 'production'
// })

let state = {
    count: 0,
    newList: [],
    oilCardTypeList: [],
    oilCardLoadStatusList: []
};

let mutations = {
    intCount(){
        state.count++;
    },
    setNews(state, data){
        state.newList = data;
    },
    setOilCardType(state, data){
        state.oilCardTypeList = data;
    },
    setOilCardLoadStatus(state, data){
        state.oilCardLoadStatusList = data;
    }
};

const store = new Vuex.Store({
    state,
    mutations
});

export default store;