/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const CategoryBlogsController = () => import('#controllers/category_blogs_controller')
const CategoryProductsController = () => import('#controllers/category_products_controller') 
const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
  // Authenticated Routes
  router.group(() => {
    // Routes for Category Management
    router.group(() => {
      router.group(() => {
        router.get('', [CategoryBlogsController, 'getAll'])
        router.get(':id', [CategoryBlogsController, 'getById'])
        router.post('', [CategoryBlogsController, 'create'])
        router.put(':id', [CategoryBlogsController, 'update'])
        router.delete(':id', [CategoryBlogsController, 'delete'])
      }).prefix('blog')
      router.group(() => { 
        router.get('', [CategoryProductsController, 'getAll'])
        router.get(':id', [CategoryProductsController, 'getById'])
        router.post('', [CategoryProductsController, 'create'])
        router.put(':id', [CategoryProductsController, 'update'])
        router.delete(':id', [CategoryProductsController, 'delete'])
      }).prefix('product')
    }) .prefix('categories')

    // Routes for user profile Management
    router.group(()=>{}).prefix('user')

    // Routes for product Management 
    router.group(()=>{}).prefix('product')

    // Routes for Blog Management 
    router.group(()=>{}).prefix('blog')

    // Router for Shop Management 
    router.group(()=>{}).prefix('shop')
  })
  .use(middleware.auth({
    guards: ['api']
  }))
  

  // Un-Authenticated Routes 
  router.group(()=>{
    router.post('login', [AuthController, 'login'])
    router.post('register', [AuthController, 'register'])
    router.post('forgot-password', [AuthController, 'forgotPassword'])
    router.post('verufy-email', [AuthController, 'verifyEmail'])
  }).prefix('auth')
}).prefix('api') 
