import { createRouter, createWebHistory } from 'vue-router'

import UnitsView from '../views/UnitsView.vue'
import DevicesView from '../views/DevicesView.vue'
import MaintainersView from '../views/MaintainersView.vue'
import ReportsView from '../views/ReportsView.vue'

const routes = [
  { path: '/', redirect: '/units' },
  { path: '/units', component: UnitsView },
  { path: '/devices', component: DevicesView },
  { path: '/maintainers', component: MaintainersView },
  { path: '/reports', component: ReportsView },
]

const router = createRouter({
  history: createWebHistory('/web-services/'),
  routes,
})

export default router
