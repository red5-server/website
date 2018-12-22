<template>
  <main>
    <Navbar/>
    <div class="content">
      <h1>Routing</h1>
      <p>
        <b>Routing</b> refers to how an application’s endpoints (URIs) respond to client requests.
      </p>
<prism language="javascript">const { Router } = require('red5')

Router.get('/', (client) => {
  return client.response.html('Hello World')
})
</prism>
      <h2>Routes</h2>
      <p>A route has 1-3 parameters for creating a route.</p>
      <ul>
        <li><code>path</code> &ndash; (optional) this is the path of the url which can be a string or regexp. For the url <code>http://example.com/test/route</code> the path would be <code>/test/route</code>. If not specified the path defaults to <code>/</code>.</li>
        <li><code>options</code> &ndash; (optional) this is the options for the route, such as middleware to be used.</li>
        <li><code>controller</code> (required) this is the callback/method to be executed. It can either be a string or a function.</li>
      </ul>
      <p>Routes have multiple formats. One way is to use strings which then execute a controller module in the controllers directory.</p>
<prism language="javascript">// Calls the controller 'MyController' and executes the method 'main'
Router.get('/', 'MyController')

// Calls the controller 'MyController' and executes the method 'myMethod'
Router.get('/', 'MyController@myMethod')

// Calls the controller 'MyController' within the directory 'Public' and executes the method 'myMethod'
Router.get('/', 'Public/MyController@myMethod')</prism>
      <p>Another way to create a route is to pass a function as the last parameter.</p>
<prism language="javascript">Router.get('/', client => client.response.html('Hello World'))</prism>
      <h2>Route Groups</h2>
      <p>A route group is a way to prefix paths and/or add middleware to a group of routes.</p>
<prism language="javascript">Router.group('/settings', () => {
  Router.get('/profile', 'Settings@profile')
  Router.get('/notifications', 'Settings@notifications')
})</prism>
      <p>In the above example two routes are created within a group. This will create two routes:</p>
      <ul>
        <li><code>/settings/profile</code></li>
        <li><code>/settings/notifications</code></li>
      </ul>
      <p>This can be taken further by adding some middleware to the group. For example if we want to protect these routes to logged in users only, we could create an <code>Auth</code> middleware that checks your logged in status and applies it to the group as a whole instead of each route individually.</p>
<prism language="javascript">const { Auth } = require('../middleware/Auth.js')

Router.group('/settings', { middleware: [Auth] }, () => {
  Router.get('/profile', 'Settings@profile')
  Router.get('/notifications', 'Settings@notifications')
})</prism>
      <h2>Route Resources</h2>
      <p>A route resource is a way to create a group of routes that all relate to one another. A resource takes two parameters each of which are strings.</p>
      <ul>
        <li><code>name</code> &ndash; This is the name of the resource, it is also part of the path</li>
        <li><code>controller</code> &ndash; This is the controller which is the name of the class with predefined methods</li>
      </ul>
<prism language="javascript">Router.resource('photos', 'Photos')</prism>
      <table>
        <tr><th style="width: 100px">Method</th><th style="width: 300px">URI</th><th style="width: 100px">Action</th><th style="width: 200px">Name</th></tr>
        <tr><td>GET</td><td>/photos</td><td>main</td><td>photos.main</td></tr>
        <tr><td>GET</td><td>/photos/create</td><td>create</td><td>photos.create</td></tr>
        <tr><td>POST</td><td>/photos</td><td>store</td><td>photos.store</td></tr>
        <tr><td>GET</td><td>/photos/:id</td><td>show</td><td>photos.show</td></tr>
        <tr><td>GET</td><td>/photos/:id/edit</td><td>edit</td><td>photos.edit</td></tr>
        <tr><td>PUT</td><td>/photos/:id</td><td>update</td><td>photos.update</td></tr>
        <tr><td>DELETE</td><td>/photos/:id</td><td>destroy</td><td>photos.destroy</td></tr>
      </table>
      <h2>Route methods</h2>
      <ul>
        <li><a href="">GET</a></li>
        <li><a href="">POST</a></li>
        <li><a href="">PUT</a></li>
        <li><a href="">DELETE</a></li>
        <li><a href="">PATCH</a></li>
        <li><a href="">HEAD</a></li>
        <li><a href="">OPTIONS</a></li>
        <li><a href="">MATCH</a> &ndash; This isn't a method type, it just handles 2+ types</li>
        <li><a href="">ANY</a> &ndash; This isn't a method type, it just handles all types</li>
      </ul>
      <h3>GET</h3>
<prism language="javascript">Router.get('/', (client) => {
  return client.response.html('GET request to /')
})</prism>
      <h3>POST</h3>
<prism language="javascript">Router.post('/', (client) => {
  return client.response.html('POST request to /')
})</prism>
      <h3>PUT</h3>
<prism language="javascript">Router.put('/', (client) => {
  return client.response.html('PUT request to /')
})</prism>
      <h3>DELETE</h3>
<prism language="javascript">Router.delete('/', (client) => {
  return client.response.html('DELETE request to /')
})</prism>
      <h3>PATCH</h3>
<prism language="javascript">Router.patch('/', (client) => {
  return client.response.html('PATCH request to /')
})</prism>
      <h3>HEAD</h3>
      A <b>head</b> request only returns the headers without a body.
<prism language="javascript">Router.head('/', (client) => {
  return client.response.setHeader('Head-Request', 'to /')
})</prism>
      <h3>OPTIONS</h3>
<prism language="javascript">Router.options('/', (client) => {
  return client.response.setHeader('Options-Request', 'to /')
})</prism>
      <h3>MATCH</h3>
      The <b>match</b> route method allows for catching two or more specific types (<code>GET</code>, <code>POST</code>, etc.)
<prism language="javascript">Router.match(['get', 'post'], '/', (client) => {
  return client.response.html('GET or POST request to /')
})</prism>
      <h3>ANY</h3>
      The <b>any</b> route method allows for catching any type (<code>GET</code>, <code>POST</code>, etc.)
<prism language="javascript">Router.any('/', (client) => {
  return client.response.html('any request to /')
})</prism>
    </div>
  </main>
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

<script>
import Prism from "vue-prism-component";
import Navbar from "../components/Navbar";

export default {
  components: {
    Prism, Navbar
  }
};
</script>