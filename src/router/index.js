import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const route = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            meta: { requireAuth: true },
            redirect: () => {
                if (localStorage.getItem('ms_username')) {
                    return '/deal'
                } else {
                    return '/login'
                }
            }
        },
        {
            path: '/',
            meta: { requireAuth: true },
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    meta: { requireAuth: true },
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/finance',
                    meta: { requireAuth: true },
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '财务管理' }
                },
                {
                    path: '/deal',
                    meta: { requireAuth: true },
                    component: resolve => require(['../components/page/BaseDeal.vue'], resolve),
                    meta: { title: '交易流水' }
                },
                {
                    path: '/member',
                    meta: { requireAuth: true },
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: '会员管理' }
                },
                {
                    path: '/qb',
                    name: 'BaseQb',
                    meta: { requireAuth: true },
                    component: resolve => require(['../components/page/BaseQb.vue'], resolve),
                    meta: { title: '会员卡消费记录' }
                },

                {
                    path: '/membercard',
                    meta: { requireAuth: true },
                    component: resolve => require(['../components/page/BaseMenber.vue'], resolve),
                    meta: { title: '会员卡' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    meta: { requireAuth: true },
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    meta: { requireAuth: true },
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                }
            ]
        },
        {
            path: '/login',
            meta: { requireAuth: true },
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

route.beforeEach((to, from, next) => {
    if (to.path != '/login') {
        if (localStorage.getItem('ms_username')){
            next()            
        }else{
            next('/login')
        }
    } else {
        next()
    }
});
export default route