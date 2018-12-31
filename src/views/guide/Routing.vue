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
      code Auth
    prism(language='javascript').
      const { Auth } = require('../middleware/Auth.js')

      Router.group('/settings', { middleware: [Auth] }, () => {
        Router.get('/profile', 'Settings@profile')
        Router.get('/notifications', 'Settings@notifications')
      })
    h2 Route Resources
    p A route resource is a way to create a group of routes that all relate to one another. A resource takes two parameters each of which are strings.
    ul
      li #[code name] &ndash; This is the name of the resource, it is also part of the path
      li #[code controller] &ndash; This is the controller which is the name of the class with the actions predefined
    prism(language='javascript').
      Router.resource(&apos;photos&apos;, &apos;Photos&apos;)
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
      li: a(href='') GET
      li: a(href='') POST
      li: a(href='') PUT
      li: a(href='') DELETE
      li: a(href='') PATCH
      li: a(href='') HEAD
      li: a(href='') OPTIONS
      li #[a(href='') MATCH] &ndash; This isn't a method type, but a way to handle 2+ types
      li #[a(href='') ANY]  &ndash; This isn't a method type, but a way to handle all types
    h3 GET
    prism(language='javascript').
      Router.get('/', (client) => {
        return client.response.html('GET request to /')
      })
    h3 POST
    prism(language='javascript').
      Router.post('/', (client) => {
        return client.response.html('POST request to /')
      })
    h3 PUT
    prism(language='javascript').
      Router.put('/', (client) => {
        return client.response.html('PUT request to /')
      })
    h3 DELETE
    prism(language='javascript').
      Router.delete('/', (client) => {
        return client.response.html('DELETE request to /')
      })
    h3 PATCH
    prism(language='javascript').
      Router.patch('/', (client) => {
        return client.response.html('PATCH request to /')
      })
    h3 HEAD
    b head
    prism(language='javascript').
      Router.head('/', (client) => {
        return client.response.setHeader('Head-Request', 'to /')
      })
    h3 OPTIONS
    prism(language='javascript').
      Router.options('/', (client) => {
        return client.response.setHeader('Options-Request', 'to /')
      })
    h3 MATCH
    p The #[b match] route method allows for catching two or more specific types (#[code GET], #[code POST], etc.)
    prism(language='javascript').
      Router.match(['get', 'post'], '/', (client) => {
        return client.response.html('GET or POST request to /')
      })
    h3 ANY
    p The #[b any] route method allows for catching any type (#[code GET], #[code POST], etc.)
    prism(language='javascript').
      Router.any('/', (client) => {
        return client.response.html('any request to /')
      })
</template>

<style>
table {
  border-collapse: collapse;
}
table > tr > th {
  text-align: left;
  background-color: #eeeeee;
}
table > tr > th,
table > tr > td {
  border: solid 1px #999999;
  padding: 0 5px;
}
</style>