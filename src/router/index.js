import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/propiedades/:id',
      name: 'propiedad',
      component: () => import('../views/PropiedadView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta:{ requiresAuth: true},
      children: [
        {
          path: 'propiedades',
          name: 'admin-propiedades',
          component: () => import('../views/admin/AdminView.vue')
        },{
          path: 'nueva',
          name: 'nueva-propiedad',
          component: () => import('../views/admin/NuevaPropiedadView.vue')
        },{
          path: 'editar/:id',
          name: 'editar-propiedad',
          component: () => import('../views/admin/EditarPropiedadView.vue')
        }
      ]
    },
  ]
})

// Guard de navegacion
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth){
    try {
      await authenticateUser()
      next()
    } catch (error) {
      next({name: 'login'})
    }
  } else {
   
    next()
  }
})

function authenticateUser() {
  const auth = useFirebaseAuth()

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      unsubscribe()
      if(user){
        resolve()
      } else {
        reject()
      }
    })
  })
}

export default router
