<template>
  <main>
    <Navbar />
    <div class="content">
      <h1>Installation</h1>
      <p>
        Having installed all of the prerequisites, creating an application is very easy using
        <code>red5-cli</code>
      </p>
      <Prism>$ npm install -g red5-cli</Prism>
      <p>
        Next all that needs to be done is to run the <code>new</code> command to create a new project
      </p>
      <Prism>$ red5 new hello-world</Prism>
      <p>The following process will then run:</p>
      <ol>
        <li>A folder will be created called <code>hello-world</code> in the current directory</li>
        <li>Red5 will be downloaded into the <code>hello-world</code> folder</li>
        <li>All of the dependencies of Red5 will be downloaded</li>
        <li>A temporary server will be started</li>
        <li>The url <code>http://localhost:5000</code> will be opened in a new browser window</li>
      </ol>
      <p>You should then see the <b>Welcome</b> screen within your browser and if you do, everything should be working!</p>

      <h1>Static Files</h1>
      <p>
        Static files are are configured to automatically be served from <code>/public</code>. Any files located in that directory will automatically be served.
      </p>
      <p>
        Additional paths can be setup by editing <code>/config/app.js</code> and adding paths to the <code>static</code> option as an array
      </p>
<Prism language="javascript">module.exports = {
  static: ['/path/to/static/files']
}</Prism>
    </div>
  </main>
</template>

<script>
  import Prism from "vue-prism-component";
  import Navbar from "../components/Navbar";

  export default {
    components: {
      Prism, Navbar
    }
  };
</script>

