/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const CategoryBlogsController = () => import('#controllers/category_blogs_controller')
const CategoryProductsController = () => import('#controllers/category_products_controller') 

router.group(() => {
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
  })
  .prefix('categories')
})
  .prefix('api') 
