import { createRouter, createWebHistory } from 'vue-router'

// 定義路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'), // 懶加載 Home 組件
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About.vue'), // 懶加載 About 組件
  },
  {
    path: '/minesweeper',
    name: 'Minesweeper',
    component: () => import('../pages/PageMinesweeper.vue'),
  },
  {
    path: '/snake',
    name: 'Snake',
    component: () => import('../pages/PageSnake.vue'),
  },
  {
    path: '/find-prime',
    name: 'FindPrime',
    component: () => import('../pages/PageFindPrime.vue'),
  },
  {
    path: '/page-c',
    name: 'PageC',
    component: () => import('../pages/PageC.vue'),
  },
]

// 創建路由實例
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 的歷史模式
  routes,
})

export default router
