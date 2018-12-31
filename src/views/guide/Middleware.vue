<template lang="pug">
  main
    navbar
    .content
      h1 Middleware
      p Middleware is a way of running one or more processes before the controller is executed. This is helpful for deciding on how a request should be handled before the controller runs. For example should this request be ajax only? If so, a middleware could be added to the route that sends the user a #[code 400] error if the request isn't sent via ajax.
      p There are three types of middleware:
      ol
        li Global middleware
        li Route middleware
        li Middleware Groups
      h2 Global Middleware
      p Global middleware is middleware that runs on every request. This can be used for sessions, rate limiting or whatever you need to run on every request.
      p This middleware is not setup in the same way that route middleware is setup, as it is added to #[code /config/middleware.js].
      prism(language="javascript").
        const { Session, Cookies } = require('../my-middleware.js')

        module.exports = {
          middleware: [Session, Cookies]
        }
      h2 Route Middleware
      p Route middleware is more common than global middleware, and is use on a pre-route basis. This is added to either the #[code group] method or one of the provided method type methods (#[code Router.get()], #[code Router.post()], etc.)
      prism(language='javascript').
        const { Ajax } = require('red5')

        Router.get('/', { middleware: [Ajax] }, (client) =>
          client.response.html('Hello World')
        )
      p Instead of defining the same middleware on every route, a group can be used to define middleware on a group of routes.
      prism(language='javascript').
        const { Ajax } = require('red5')

        Router.group({ middleware: [Ajax] }, () => {
          Router.get('/ping', (client) => client.response.html('pong'))
          Router.get('/pong', (client) => client.response.html('ping'))
        })
      h2 Middleware Groups
      p Sometimes middleware needs to be grouped into groups because writing out the same middleware repeatedly can get tiresome.
      prism(language='javascript').
        module.exports = {
          middlewareGroups: {
            session: [Cookies, Session],
            apiAuth: [Ajax, Auth]
          }
        }
      p Then you can use that group within your routes by passing the value as a #[code string] instead of a reference to the middleware option:
      prism(language='javascript').
        Router.get('/ping', { middleware: ['apiAuth'] }, () => ...)
</template>