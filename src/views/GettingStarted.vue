<template lang="pug">
main
  navbar
  .content
    h1 Installation
    p Red5 can be installed multiple ways. Choosing the way you wish to install is up to you.
    h2 Command Line Tool
    p Red5 can be installed using the command line tool, and having installed all of the prerequisites, creating an application is very easy using #[code red5-cli]
    prism.command-line(language="bash").
      npm install -g red5-cli
    p Next all that needs to be done is to run the #[code new] command to create a new project
    prism.command-line(language="bash").
      red5 new hello-world
    p The following process will then run:
    ol
      li A folder will be created called #[code hello-world] in the current directory
      li Red5 will be downloaded into the #[code hello-world] folder
      li All of the dependencies of Red5 will be downloaded
      li A temporary server will be started
      li The url #[code http://localhost:5000] will be opened in a new browser window
    p You should then see the #[b Welcome] screen within your browser and if you do, everything should be working!
    h2 Git
    p This is the process that the command line tool does automatically.
    prism.command-line(language="bash").
      git clone git@github.com:red5-server/red5 hello-world --depth 1
      cd hello-world
      npm install
      red5 serve
    P When opening a browser and navigating to #[code http://localhost:5000], you should then see the #[b Welcome] screen within your browser and if you do, everything should be working!
    h1 Command Line Tool
    p The red5 command line tool allows you to create key features in your application such as controllers and middleware. It also allows for testing and maintaining your application.
    p If you haven't already, install #[code red5-cli] this will then install the tool for this. This is still a work in progress and new features will be added in due time. However you can get your project started and running within a minute.
    prism(language="bash"  data-output="3-4").command-line.
      npm install -g red5-cli
      red5 help
        new       Creates a new project
        serve     Serves the current project
    h1 Static Files
    p Static files are are configured to automatically be served from #[code /public]. Any files located in that directory will automatically be served.
    p Additional paths can be setup by editing #[code /config/app.js] and adding paths to the #[code static] option as an array
    prism(language="javascript").
      module.exports = {
        static: ['/path/to/static/files']
      }
</template>