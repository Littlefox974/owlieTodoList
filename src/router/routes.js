const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'todoList', component: () => import('pages/TodoList.vue'), meta: { auth: true } },
      { path: '', component: () => import('pages/Index.vue'), meta: { auth: false } },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
