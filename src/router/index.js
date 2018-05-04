import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect:()=>{
                if (localStorage.getItem('ms_username')){
                    return '/dashboard'
                }else{
                    return '/login'                    
                }
            }
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/finance',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '财务管理' }
                },
                {
                    path: '/deal',
                    component: resolve => require(['../components/page/BaseDeal.vue'], resolve),
                    meta: { title: '交易流水' }
                },
                {
                    path: '/member',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: '会员管理' }
                },
                {
                    path: '/qb',
                    name: 'BaseQb',
                    component: resolve => require(['../components/page/BaseQb.vue'], resolve),
                    meta: { title: '会员卡消费记录' }
                },

                {
                    path: '/membercard',
                    component: resolve => require(['../components/page/BaseMenber.vue'], resolve),
                    meta: { title: '会员卡' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
