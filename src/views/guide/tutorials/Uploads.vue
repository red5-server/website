<template lang="pug">
  mixin escape(string)
    = string
  main
    navbar
    .content
      h1 File Uploads
      p Uploading content from your users browser to your server can be a tricky task, however, red5 makes it easy to do this by allowing you to use a storage driver.
      p To make a minimalist upload application, we will need to create a few things: two mix files and three controllers. The mix files will render a form and a success page, while the controllers will get the form, success page and process the upload request.
      h2 The Routes
      p We will start by modifying our routes file, lets define three routes that will handle a file upload, these routes will do the following:
      ul
        li Render a page to display a form
        li Process the file upload
        li Render a page to display a success message

      prism(language="javascript").
        Router.group('/upload', () => {
          Router.get('/', 'upload').name('upload-form')
          Router.post('/handle', 'upload@handle').name('upload-handle')
          Router.get('/success', 'upload@success').name('upload-success')
        })

      h2 The Upload Form
      p Lets add a route handler to display our form that we will create below
      prism(language="javascript").
        const path = require('path')
        const { route } = require('red5/router')
        const { Storage } = require('@red5/storage')

        module.exports.main = async function (client) {
          return client.response.render('upload.mix', {
            // This is the location of where we will upload the file to.
            // We will use this variable within the template so if the route path changes
            // the form action will automatically change as well.
            location: route('upload-handle')
          })
        }

        // module.exports.handle = ...
        // module.exports.success = ...
      p Now lets create a #[code mix] file at #[code resources/views/upload.mix] that will display the form when the route is accessed.
      prism(language="html")
        +escape(`<html>
    <head><title>Upload File</title></head>
    <body>
      <form method="post" action="{{'\\{\\{$location\\}\\}'}}" enctype="multipart/form-data">
        <p><input type="file" name="image"></p>
        <p><input type="submit" value="Upload Image"></p>
      </form>
    </body>
  </html>`)
      h2 The Upload Handler
      p The storage driver has a built in disk called #[code tmp] that points to the operating system's #[b tmp directory]. We will use that here to move the file from the #[b tmp directory] to the actual location of where we want the file to be stored.
      p.warn There are multiple commands that move a file from one storage driver to another. The best one to use when uploading a file is #[code moveFile()], as this will also remove the file from the #[b sorce directory]. Using #[code copyFile()] will keep the file within the #[b source directory].
      prism(language="javascript").
        const path = require('path')
        const { route } = require('red5/router')
        const { Storage } = require('@red5/storage')

        // module.exports.main = ...

        module.exports.upload = async function (client) {
          // Get the file information from the file upload
          // This is just information about where the file is
          // located on the server and not the actual file itself.
          let img = client.data.files('image')

          // This will move the file from tmp storage to the location
          // of where we want to actually store the file. In this case,
          // we want to store the file in local storage.
          await Storage.mount('local')
            .moveFrom('tmp', img.tmpStoragePath, path.join('test', img.filename))

          // Redirect the user to a success page
          return client.response.redirect.to('upload-success')
        }

        // module.exports.success = ...
      h2 The Success Page
      p Once the upload completes, we will let the user know by rendering a page that lets the user know that their upload completed successfully.
      prism(language="javascript").
        const path = require('path')
        const { route } = require('red5/router')
        const { Storage } = require('@red5/storage')

        // module.exports.main = ...
        // module.exports.handle = ...

        module.exports.success = async function (client) {
          return client.response.render('success.mix', {
            location: route('upload-form')
          })
        }
      p Create this simple #[code mix] file at #[code resources/views/success.mix] we show the success message.
      prism(language="html")
        +escape(`<html>
    <head><title>Upload Success</title></head>
    <body>
      <h1>Success</h1>
      <p>Your file was successfully uploaded!</p>
      <p><a href="{{'\\{\\{$location\\}\\}'}}">Upload another file</a></p>
    </body>
  </html>`)
</template>