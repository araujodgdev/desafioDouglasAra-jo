import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import CarList from '../components/CarList.vue';
import CarRegister from '../components/CarRegister.vue';
import CheapestCar from '../components/CheapestCar.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: CarList },
  { path: '/register', component: CarRegister },
  { path: '/cheapest', component: CheapestCar },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
