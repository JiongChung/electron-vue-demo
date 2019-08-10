import Vue from 'vue';
import Router from 'vue-router';

const Dashboard = r => require.ensure([], () => r(require('@/pages/dashboard/index')), 'Dashboard');
const Login = r => require.ensure([], () => r(require('@/pages/login/index')), 'Login');
const Youlian = r => require.ensure([], () => r(require('@/pages/youlian/index')), 'Youlian');
const Pay = r => require.ensure([], () => r(require('@/pages/youlian/pay/index')), 'Pay');
const Load = r => require.ensure([], () => r(require('@/pages/youlian/load/index')), 'Load');
const Withdraw = r => require.ensure([], () => r(require('@/pages/youlian/withdraw/index')), 'Withdraw');

Vue.use(Router);

export default new Router({
    linkActiveClass: 'active',
    // mode: 'history',
    routes: [
        // {
        //   path: '/',
        //   name: 'landing-page',
        //   component: require('@/components/LandingPage').default
        // },
        
        { path: '/admin/bashboard', name: 'Dashboard', component: Dashboard },
        { path: '/admin/youlian/', name: 'Youlian', component: Youlian,
            children: [
                // { path: '', name: 'Youlian', component: Load },
                { path: 'pay', name: 'Pay', component: Pay },
                { path: 'load', name: 'Load', component: Load },
                { path: 'withdraw', name: 'Withdraw', component: Withdraw },
                { path: "*", redirect: "pay" }
            ]
        },
        { path: '/account/login', name: 'Login', component: Login },
        { path: "*", redirect: "/admin/bashboard" }
    ]
})
