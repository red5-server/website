<template lang="pug">
  #app
    nav.top
      ul
        li: router-link(to='/') Home
        li: router-link(to='/getting-started') Getting Started
        li
          router-link(to='/guide') Guide
          .sub-content
            div
              ul
                li: router-link(to='/guide/routing') Routing
                li: router-link(to='/guide/middleware') Middleware
        li: router-link(to='/api') API Reference
    router-view
    footer
  </div>
</template>

<script>
import Prism from 'vue-prism-component'
import Navbar from './components/Navbar'

export default {
  components: {
    Prism, Navbar
  }
}
</script>

<style>
main {
  display: flex;
  margin: auto;
}

main > nav {
  width: 20%;
}

main {
  width: 80%;
  padding-left: 20px;
}

.sub-content > div > ul {
  list-style-type: none;
}

.sub-content {
  position: absolute;
  left: 0;
  right: 0;
  padding: 0;
  display: none;
  background: #292929;
  padding: 5vh 0;
}

.sub-content > div:first-child {
  width: 25vw;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
}

nav.top > ul > li:hover > .sub-content {
  display: block;
}

.sub-content > div > ul > li > a {
  color: #ffffff;
  padding: 5px 10px;
  font-size: 0.9rem;
  text-decoration: none;
  display: block;
}

.sub-content > div > ul > li > a:hover {
  /* background: #ee2012; */
  text-decoration: underline;
}

nav.top {
  background: #f44336;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: sticky;
  top: 0;
}

nav.top > ul {
  margin: 0;
  display: flex;
  flex-direction: row;
  list-style-type: none;
}

nav.top > ul > li > a {
  display: inline-block;
  padding: 1rem 1.5rem;
  color: #ffffff;
  text-decoration: none;
}

nav.top > ul > li > a:hover,
nav.top > ul > li > a.router-link-exact-active {
  background: #ee2012;
}

footer {
  background: #292929;
  min-height: 20vh;
  margin-top: 5vh;
}
</style>
