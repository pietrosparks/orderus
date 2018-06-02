import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/Landing'
import OrderPage from '@/components/Order'
import OrdersDone from '@/components/OrderDone' 
import TablePage from '@/components/Table'
import MyOrders from '@/components/MyOrders'
import AdminPage from '@/components/Admin'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: LandingPage
    },
    {
      path: '/order',
      name: 'Order',
      component: OrderPage
    },
    {
      path: '/order/:id',
      name: 'OrderDone',
      component: OrdersDone
    },
    {
      path: '/order/process/:id',
      name: 'TableNo',
      component: TablePage
    },
    {
      path: '/myOrders',
      name: 'MyOrders',
      component: MyOrders
    },
    {
      path: '/adminpage',
      name: 'Admin',
      component: AdminPage
    }
  ]
})
