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
const BlogController = () => import('#controllers/blog_controller')
const BlogCommentController = () => import('#controllers/blog_comments_controller')
const UsersController = () => import('#controllers/users_controller')
const ShopsController = () => import('#controllers/shops_controller')
const CategoryController = () => import('#controllers/categories_controller')

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
      router.get('', [CategoryController, 'getAll'])
      router.post('', [CategoryController, 'create'])
    }).prefix('categories')

    // Routes for user profile Management
    router.group(() => { 
      router.get('', [UsersController, 'getAll'])
      router.get(':id', [UsersController, 'getById'])
      router.post('', [UsersController, 'create'])
      router.put(':id', [UsersController, 'update'])
      router.delete(':id', [UsersController, 'delete'])
    }).prefix('user')

    // Routes for product Management 
    router.group(() => { }).prefix('product')

    // Router for Shop Management 
    router.group(() => {
      router.get('', [ShopsController, 'getAll'])
      router.get(':id', [ShopsController, 'getById'])
      router.post('', [ShopsController, 'create'])
      router.put(':id', [ShopsController, 'update'])
      router.delete(':id', [ShopsController, 'delete'])
    }).prefix('shop')

    // Routes for Blog Management 
    router.group(() => {
      router.get('', [BlogController, 'getAll'])
      router.get(':id', [BlogController, 'getById'])
      router.post('', [BlogController, 'create'])
      router.put(':id', [BlogController, 'update'])
      router.delete(':id', [BlogController, 'delete'])
      router.group(() => {
        router.get('', [BlogCommentController, 'getAll'])
        router.get(':id', [BlogCommentController, 'getById'])
        router.post('', [BlogCommentController, 'create'])
        router.put(':id', [BlogCommentController, 'update'])
        router.delete(':id', [BlogCommentController, 'delete'])
      }).prefix('comment')
    }).prefix('blog')

  }).use(middleware.auth({
    guards: ['api']
  }))


  // Un-Authenticated Routes 
  router.group(() => {
    router.post('login', [AuthController, 'login'])
    router.post('register', [AuthController, 'register'])
    router.post('forgot-password', [AuthController, 'forgotPassword'])
    router.post('verufy-email', [AuthController, 'verifyEmail'])
    router.post('refresh-token', [AuthController, 'verifyEmail'])
  }).prefix('auth')
}).prefix('api') 
