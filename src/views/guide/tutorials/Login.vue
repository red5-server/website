<template lang="pug">
  mixin escape(string)
    = string
  main
    navbar
    .content
      h1 User Logins
      p Many websites have a members area that require specific credentials to access this location. Horse Power makes logins simple.
      p In our login system, we will make four routes:
      ul
        li A route to display a login form
        li A route to log the user out of their account
        li A route to process the user login
        li A route to display the users member area
      h2 The routes
      prism(language="javascript").
        const { Router } = require('@horsepower/router')

        // This route will render the login page for our user
        Router.get('/login', client => client.response.render('login.mix')).name('login')

        // We will create a login route to validate the users login
        // If the login is successful we will redirect the user to the main page
        // If the login is not successful we will redirect the user back to the login page
        Router.post('/login', 'User@login').name('login-handle')

        // Here we will process the users logout this will destroy the session
        Router.post('/logout', 'User@logout').name('logout-handle')

        // This will render the users home page with information about that user
        Router.get('/home', client => client.response.render('home.mix')).name('user-home')

      h2 The controllers
      p We have two controllers here, one will handle the login for the user and the other will handle the logout for the user.
      h3 Login controller
      p The login controller will get the users input from the login form, it will then check the database to see if the user exists with those credentials. If the user exists a user will be returned, otherwise nothing will be returned.
      p If nothing is returned, then we will redirect the user back to the login page. Otherwise, we will create the session data and redirect the user to the members area.
      prism(language="javascript").
        const { DB } = require('@horsepower/mysql')

        module.exports.login = async function (client) {
          // Get the username and password
          let username = client.data.post('username')
          let password = client.data.post('password')

          // Search the database for the user using the credentials that were
          // provided by the user from the login page.
          let user = await DB.table('users')
            .where('username', username)
            .where('password', password)
            .first()

          // If the user was not found redirect the user back to the login page.
          if(!user) return client.response.redirect.to('login')

          // Since we have gotten this far, we must have gotten a user back
          // so we will set the session information for the current user
          client.session.set('id', user.id)
          client.session.set('username', user.username)

          // Now lets redirect the user to their member's area
          // where we can utilize the session information we just set
          return client.response.redirect.to('user-home')
        }
      h3 Logout controller
      p The logout controller is really simple, all it does is destroy the session and then redirects the user back to the login page.
      prism(language="javascript").
        module.exports.logout = async function (client) {
          // The user requested to be logged out, so we won't do any validation
          // here, we will just destroy the session.
          await client.session.destroy()

          // Now we will redirect the user to the login form
          return client.response.redirect.to('login')
        }
      h2 The views
      p The views will display two things for us, one is the login form so the user can login to their account, and the other is the members area displaying information that relates to them.
      h3 The login view
      p Lets create the login view located at #[code resources/views/login.mix], this will show the login form to the user so they can enter in their information.
      prism(language="html")
        +escape(`<html>
    <head><title>User Login</title></head>
    <body>
      <form method="post" action="{{'\\{\\{route(\\\'login-handle\\\')\\}\\}'}}">
        <p>Username: <input type="text" name="username" placeholder="What is your username?"></p>
        <p>Password: <input type="password" name="password" placeholder="What is your password?"></p>
        <p><input type="submit" value="Login"></p>
      </form>
    </body>
  </html>`)
      h3 The members view
      p The members view will show information to the user that relates to them, this could be anything that you would like as it all depends on what your website is.
      p Here we will create a view located at #[code resources/views/home.mix], this will show the users home page when they are logged into their account.
      p As you might see, we can access the users username with #[code {{'\{\{$session.username\}\}'}}], this is accessing the session data associated with this user and grabbing the username that was set in the login controller.
      prism(language="html")
        +escape(`<html>
    <head><title>User Member Area</title></head>
    <body>
      <h1>Welcome {{'\\{\\{$session.username\\}\\}'}}</h1>
      <p>Welcome to your members area where this page is all about you!</p>
      <p><a href="{{'\\{\\{route(\\\'logout-handle\\\')\\}\\}'}}">Logout</a></p>
    </body>
  </html>`)
</template>