<template>
  <div id="app">
    <nav class="top">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/getting-started">Getting Started</router-link>
        </li>
        <li>
          <router-link to="/guide">Guide</router-link>
        </li>
        <li>
          <router-link to="/api">API Reference</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
    <footer></footer>
  </div>
</template>

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
  nav.top > ul > li > a.router-link-exact-active.router-link-active {
    background: #ee2012;
  }

  footer {
    background: #292929;
    min-height: 20vh;
    margin-top: 5vh;
  }
</style>
