const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: 'people', component: () => import('pages/People.vue') },
      { path: 'people/:area', component: () => import('pages/PeopleArea.vue') },
      { path: 'patrimony', component: () => import('pages/Patrimony.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
