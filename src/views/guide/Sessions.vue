<template lang="pug">
main
  navbar
  .content
    h1 Sessions
    p @red5/session is a way to persist data from one request to another. There is many usages for using sessions, such as when your site has users that login/logout or maybe you want to remember a shopping cart. Sessions can be used here for making data persist from one page request to another.
    h2 Configuration
    p Sessions need to be configured through one and optionally two configurations. The main configuration is the #[code config/session.js] which describes how sessions need to work. The second optional config is the #[code config/storage.js] config when you store the sessions using a #[code file] store.
    prism(language="javascript").
      module.exports = {
        store: 'file',

        cookie: {
          path: '/',
          // Expire the cookie in approximately 30 days
          expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
        }
      }
    p #[a(href="https://www.npmjs.com/package/cookie#options-1") Cookie options] are required and are the options for creating the reference cookie on the client.
    p As seen above, the store is set to file, so in this case we need a #[router-link(to='/guide/storage#configuration') storage configuration] setup. We need to label it as #[code session] with a driver type of file. Next we need to make sure that it points to the location of where the sessions will be stored.
    prism(language="javascript").
      module.exports = {
        disks: {
          session: {
            driver: 'file',
            root: storagePath('framework/sessions')
          }
        }
      }
    h2 Usage
    p Sessions need to be started upon every request in order to use them. Thankfully there is middleware for that we can use that will do this for us (red5 automatically closes open sessions after the response is sent if it has not already been ended).
    p In the following example we will assume that our website has a public facing side and a members facing side. On the members facing side we will work with sessions, and on the public side we will not.
    prism(language="javascript").
      const { Router } = require('@red5/router')
      const { StartSession } = require('@red5/middleware')

      // These pages do not require a session, so we will not start one
      Router.get('/', 'welcome').name('welcome')
      Router.post('/register', 'register')

      // The pages in this group do require a session, so on every request to them
      // we will automatically start the session.
      Router.group('/member', { middleware: [StartSession] }, async () => {
        Router.get('/', 'user@home').name('home')
        Router.post('/login', 'user@login').name('login')
        Router.get('/settings', 'user@settings').name('settings')
      })
    p Now with the above implemented, we can use sessions in our controller
    prism(language="javascript").
      module.exports.login = async function (client) {
        /* Query the database for the user
         * We will assume the user was found for this example
         * const result = ....
         */
        client.session.set('user', result)
        return client.response.redirect.to('home')
      }

      module.exports.home = async function (client) {
        return client.response.render('user-home.rtpl', {
          session: client.session.get('user')
        })
      }
    //- prism(language="html")
    //-   :escape
    //-     <html>
    //-       <body>
    //-       </body>
    //-     </html>
</template>