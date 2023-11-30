/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import { Router } from '@adonisjs/core/build/standalone'
import Route from '@ioc:Adonis/Core/Route'
// import Database from '@ioc:Adonis/Lucid/Database'

Route.group(() => {
  Route.get('health', ({ response }) => response.noContent())

  Route.group(() => {
    Route.get('/', 'DonutsController.get')
    Route.post('/', () => 'TODO')
    Route.put('/', () => 'TODO')

    Route.group(() => {
      Route.put(
        '/historic',
        ({ response }) => 'Should register the purchase taking the details of a cart'
      )
    }).middleware('auth')
  }).prefix('donuts')

  //Needs Auth
  Route.group(() => {
    Route.get('/me', 'AuthController.me')
  }).middleware('auth')

  // OAUTH2
  Route.group(() => {
    Route.group(() => {
      Route.group(() => {
        Route.get('/redirect', 'AuthController.googleRedirect')
        Route.get('/callback', 'AuthController.googleCallback')
      }).prefix('google')
    }).prefix('oauth')
  })

  // OAT
  Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
    Route.get('/logout', 'AuthController.logout')
  })
}).middleware('authCookie')
