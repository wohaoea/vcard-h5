import Vue from 'vue'
import Router from 'vue-router'
//import Index from ''
import activeCard from '@/view/openAccount/activeCard'
import Rem from '@/../static/libs/rem'
import Base from '@/../static/css/base.css'

import Header from '@/components/header/header'
import Cell from '@/components/cell/cell'
import Step from '@/components/step/step'
import Field from '@/components/field/field'
import Button from '@/components/button/button'
import Form from '@/components/form/form'
import Card from '@/components/card/card'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(Router)
Vue.use(VueAwesomeSwiper)
Vue.component(Header.name, Header);
Vue.component(Cell.name, Cell);
Vue.component(Step.name, Step);
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Form.name, Form);
Vue.component(Card.name, Card);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: require('@/view/common/index'),
            meta: {
                title: "首页",
                description: "首页"
            }
        },
        {
            path: '/tutorial',
            name: 'tutorial',
            component: require('@/view/common/tutorial'),
            meta: {
                title: "新手教程",
                description: "新手教程"
            }
        },
        {
          path: '/protocol',
          name: 'protocol',
          component: resolve => require(['@/view/common/protocol'], resolve),
          meta: {
            title: '用户服务协议',
            description: '用户服务协议'
          }
        },
        {
            path: '/bill',
            component: resolve => require(['@/view/common/container'], resolve),
            children: [{
                name: 'bill',
                path: 'bill',
                component: resolve => require(['@/view/bill/bill'], resolve),
                meta: {
                    title: "账单查询",
                    description: "账单查询"
                }
            }, {
                name: 'history',
                path: 'history',
                component: resolve => require(['@/view/bill/history'], resolve),
                meta: {
                    title: "历史账单",
                    description: "历史账单"
                }
            }]
        },
        {
            path: '/activeCard',
            name: 'activeCard',
            component: activeCard,
            meta: {
                title: "激活虚拟银行卡",
                description: "激活虚拟银行卡"
            }
        },
        {
            path: '/open',
            name: 'open',
            component: resolve => require(['@/view/openAccount/applyOpen'], resolve),
            meta: {
                title: "申请开通",
                description: "申请开通"
            }
        },
        {
            path: '/more',
            name: 'more',
            component: resolve => require(['@/view/merchant/more'], resolve),
            meta: {
                title: "更多商户",
                description: "更多商户"
            }
        },
        {
            path: '/cardManage',
            name: 'cardManage',
            component: resolve => require(['@/view/common/container'], resolve),
            children: [{
                name: 'cardList',
                path: 'list',
                component: resolve => require(['@/view/cardManage/list'], resolve),
                meta: {
                    title: '银行卡管理',
                    description: '银行卡管理'
                }
            }, {
                path: 'bind',
                name: 'bind',
                component: resolve => require(['@/view/cardManage/bank'], resolve),
                meta: {
                  title: "绑定银行卡",
                  description: "绑定银行卡"
                }
            },{
                name: 'recharge',
                path: 'recharge',
                component: resolve => require(['@/view/recharge/recharge'], resolve),
                meta: {
                    title: '充值',
                    description: '充值'
                }
            }, {
                name: 'repayment',
                path: 'repayment',
                component: resolve => require(['@/view/repayment/repayment'], resolve),
                meta: {
                    title: '确认还款',
                    description: '确认还款'
                }
            }, {
                name: 'bindResult',
                path: 'bindResult',
                component: resolve => require(['@/view/cardManage/bindResult'], resolve),
                meta: {
                    title: '绑卡结果',
                    description: '绑卡结果'
                }
            }]
        },
        {
            path: '/billDay',
            name: 'billDay',
            component: resolve => require(['@/view/cardManage/billDay'], resolve),
            meta: {
                title: "账单日",
                description: "账单日"
            }
        },
        {
            path: '/card',
            name: 'card',
            component: resolve => require(['@/view/cardManage/cardManage'], resolve),
            meta: {
                title: "卡信息管理",
                description: "卡信息管理"
            }
        }, {
            path: '/cardLimit',
            name: 'cardLimit',
            component: resolve => require(['@/view/cardManage/cardLimit'], resolve),
            meta: {
                title: "卡限额",
                description: "卡限额"
            }
        },
        {
            path: '/report',
            name: 'report',
            component: resolve => require(['@/view/cardManage/report'], resolve),
            meta: {
                title: "挂失",
                description: "银行卡挂失"
            }
        },
        {
            path: '/passWord',
            name: 'passWord',
            component: resolve => require(['@/view/cardManage/passWord'], resolve),
            meta: {
                title: "重置支付密码",
                description: "重置支付密码"
            }
        },
        {
            path: '/capitalflow',
            name: 'capitalflow',
            component: resolve => require(['@/view/cardManage/capitalflow'], resolve),
            meta: {
                title: "资金流水",
                description: "资金流水"
            }
        },
        {
            path: '*',
            name: 'notfound',
            component: resolve => require(['@/view/common/notfound'], resolve),
            meta: {
                title: "404",
                description: "页面没找到"
            }
        }
    ]
})
