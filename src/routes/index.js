

// 导入自定义页面组件
import Login from '../pages/Login'
import Home from '../pages/Home'
import Error from '../pages/Error'
import About from '../pages/About'
import Receipt from '../pages/Receipt'
import Launch from '../pages/Launch'
import Interaction from '../pages/Interaction'

export const mainRoutes = [
    {
        path: '/login',
        title: '登陆',
        component: Login
    },
    {
        path: '/404',
        title: '错误',
        component: Error
    }
]


export const adminRoutes = [
    {
        path: '/admin/launch',
        title: '发射端与系统',
        component: Launch,
        exact: true,
        isShow: true,
        icon: 'shop'
    },
    {
        path: '/admin/receipt',
        title: '接收分析',
        component: Receipt,
        exact: true,
        isShow: true,
        icon: 'shop'
    },
    {
        path: '/admin/interaction',
        title: '后台数据与交互管理',
        component: Interaction,
        exact: true,
        isShow: true,
        icon: 'shop'
    }
]