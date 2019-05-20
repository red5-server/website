<template lang="pug">
  mixin escape(string)
    = string
  main
    navbar
    .content
      h1 Plugins
      p Plugins are ways to extend the functionality of the the red5 http server.

      h2 Bootstrapping
      p A plugin needs to be booted up and to do so, we add the plugin to the #[code config/plugin.js] file. All the plugins will be initiated upon startup of the server. The plugin can then add routes, middleware, controllers, etc.
      p First lets start by adding the plugin definition to the configuration file, which can be add like an other #[code require] string. At the time of launch the server will execute the #[b required] items an executing all needed operations.
      prism(language="javascript").
        module.exports = [
          // This is a red5 plugin inside of node_modules
          'plugin-a',
          // This is a red5 plugin outside of node_modules
          './plugins/plugin-b'
        ]
      p The first thing that the server executes is the #[code boot] command, this is a required method that is executed to boot up the plugin. This is where the initiation begins such as route loading with the #[code loadRoutesFrom] method.
      prism(language="javascript").
        const { Plugin } = require('@red5/server')
        const path = require('path')

        exports.default = class extends Plugin {
          boot() {
            this.loadRoutesFrom(path.join(__dirname, './routes.js'))
          }
        }
      p This will tell the plugin to load routes from this location.
</template>