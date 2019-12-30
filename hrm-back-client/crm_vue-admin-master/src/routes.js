import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Table from './views/nav1/Table.vue'
import echarts from './views/charts/echarts.vue'
import CourseType from './views/course_manger/CourseType.vue'
import TenantRegister from './views/TenantRegister/TenantRegister.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/echarts', component: echarts, name: '首页' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/table', component: Table, name: '用户管理' },
            { path: '/TenantRegister', component: TenantRegister, name: '租户注册' },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '课程管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/CourseType', component: CourseType, name: '课程类型' },
        ]
    },
    {
        path: '/',
        hidden: true,
        component: TenantRegister,
        redirect: { path: '/TenantRegister' }
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },

];

export default routes;