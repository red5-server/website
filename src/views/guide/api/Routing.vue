<template lang="pug">
main
  navbar
  .content
    h1 Routing
    p #[b Routing] refers to how an application’s endpoints (URIs) respond to client requests.
    prism(language='javascript').
      const { Router } = require('red5')

      Router.get('/', (client) => {
        return client.response.html('Hello World')
      })
    h2 Routes
    p A route has 1-3 parameters for creating a route.
    ul
      li #[code path] &ndash; (optional) this is the path of the url which can be a string or regexp. For the url #[code http://example.com/test/route] the path would be #[code /test/route]. If not specified the path defaults to #[code /].
      li #[code options] &ndash; (optional) this is the options for the route, such as middleware to be used.
      li #[code controller] (required) this is the callback/method to be executed. It can either be a string or a function.
    p Routes have multiple formats. One way is to use strings which then execute a controller module in the controllers directory.
    prism(language='javascript').
      // Calls the controller 'MyController' and executes the method 'main'
      Router.get('/', 'MyController')

      // Calls the controller 'MyController' and executes the method 'myMethod'
      Router.get('/', 'MyController@myMethod')

      // Calls the controller 'MyController' within the directory 'Public' and executes the method 'myMethod'
      Router.get('/', 'Public/MyController@myMethod')
    p Another way to create a route is to pass a function as the last parameter.
    prism(language='javascript').
      Router.get(&apos;/&apos;, client =&gt; client.response.html(&apos;Hello World&apos;))
    h2 Route Groups
    p A route group is a way to prefix paths and/or add middleware to a group of routes.
    prism(language='javascript').
      Router.group('/settings', () => {
        Router.get('/profile', 'Settings@profile')
        Router.get('/notifications', 'Settings@notifications')
      })
    p In the above example two routes are created within a group. This will create two routes:
    ul
      li: code /settings/profile
      li: code /settings/notifications
    p This can be taken further by adding some middleware to the group. For example if we want to protect these routes to logged in users only, we could create an #[code Auth] middleware that checks your logged in status and applies it to the group as a whole instead of each route individually.
    prism(language='javascript').
      const { Auth } = require('../middleware/Auth.js')

      Router.group('/settings', { middleware: [Auth] }, () => {
        Router.get('/profile', 'Settings@profile')
        Router.get('/notifications', 'Settings@notifications')
      })
    h2 Route Domains
    p.warn #[code Router.domain()] is not intended for mixing two or more unrelated websites together. Its main purpose is to separate routes into two or more domains/sub-domains that share content such as views, controllers, middleware, etc.
    p A route domain is a way to handle multiple domains/sub-domains that access the routes. For example #[code example.com] and #[code api.example.com]. The two routes both share the same configuration, database, sessions, etc. but you probably don't want them to share routes.
    p So, to separate the two we use #[code Router.domain()] which will add the routes to a particular domain.
    p.warn #[code Router.domain()] calls should not be nested within other #[code Router.domain()] calls.
    prism(language='javascript').
      // These routes are only accessible from 'http://example.com'
      Router.domain('example.com', () => {
        Router.get('/users', 'users@web')
      })

      // These routes are only accessible from 'http://api.example.com'
      Router.domain('api.example.com', () => {
        Router.get('/users', 'users@api')
        Router.post('/login', 'users@login')
      })

      // This route is accessible from any domain
      Router.get('/', 'welcome')
    p These two domains share a similar route #[code /users], so the triggered route is dependent on the domain that called it.
    p #[code api.example.com] has an extra route #[code /login], and if it is accessed from #[code example.com] a #[code 404] will be returned.
    p There is also a route outside of the domain spec. These are routes that can be accessed by both #[code example.com] and #[code api.example.com].
    h2 Route Resources
    p A route resource is a way to create a group of routes that all relate to one another. A resource takes two parameters each of which are strings.
    ul
      li #[code name] &ndash; This is the name of the resource, it is also part of the path
      li #[code controller] &ndash; This is the controller which is the name of the class with the actions predefined
    prism(language='javascript').
      Router.resource('photos', 'Photos')
    table
      tr
        th(style='width: 100px') Method
        th(style='width: 300px') URI
        th(style='width: 100px') Action
        th(style='width: 200px') Name
      tr
        td GET
        td /photos
        td main
        td photos.main
      tr
        td GET
        td /photos/create
        td create
        td photos.create
      tr
        td POST
        td /photos
        td store
        td photos.store
      tr
        td GET
        td /photos/:id
        td show
        td photos.show
      tr
        td GET
        td /photos/:id/edit
        td edit
        td photos.edit
      tr
        td PUT
        td /photos/:id
        td update
        td photos.update
      tr
        td DELETE
        td /photos/:id
        td destroy
        td photos.destroy
    h2 Route methods
    ul
      li: a(href='#method-get') GET
      li: a(href='#method-post') POST
      li: a(href='#method-put') PUT
      li: a(href='#method-delete') DELETE
      li: a(href='#method-patch') PATCH
      li: a(href='#method-head') HEAD
      li: a(href='#method-options') OPTIONS
      li #[a(href='#method-match') MATCH] &ndash; This isn't a method type, but a way to handle two or more method types
      li #[a(href='#method-any') ANY]  &ndash; This isn't a method type, but a way to handle all method types
    h3#method-get GET
    prism(language='javascript').
      Router.get('/', (client) => {
        return client.response.html('GET request to /')
      })
    h3#method-post POST
    prism(language='javascript').
      Router.post('/', (client) => {
        return client.response.html('POST request to /')
      })
    h3#method-put PUT
    prism(language='javascript').
      Router.put('/', (client) => {
        return client.response.html('PUT request to /')
      })
    h3#method-delete DELETE
    prism(language='javascript').
      Router.delete('/', (client) => {
        return client.response.html('DELETE request to /')
      })
    h3#method-patch PATCH
    prism(language='javascript').
      Router.patch('/', (client) => {
        return client.response.html('PATCH request to /')
      })
    h3#method-head HEAD
    prism(language='javascript').
      Router.head('/', (client) => {
        return client.response.setHeader('Head-Request', 'to /')
      })
    h3#method-options OPTIONS
    prism(language='javascript').
      Router.options('/', (client) => {
        return client.response.setHeader('Options-Request', 'to /')
      })
    h3#method-match MATCH
    p The #[b match] route method allows for catching two or more specific types (#[code GET], #[code POST], etc.)
    prism(language='javascript').
      Router.match(['get', 'post'], '/', (client) => {
        return client.response.html('GET or POST request to /')
      })
    h3#method-any ANY
    p The #[b any] route method allows for catching any type (#[code GET], #[code POST], etc.)
    prism(language='javascript').
      Router.any('/', (client) => {
        return client.response.html('any request to /')
      })
</template>

<style lang="scss">
table {
  border-collapse: collapse;

  & > tr {
    & > th {
      text-align: left;
      background-color: #eeeeee;
    }
    & > th,
    & > td {
      border: solid 1px #999999;
      padding: 0 5px;
    }
  }
}
</style>