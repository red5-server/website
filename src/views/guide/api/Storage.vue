<template lang="pug">
main
  navbar
  .content
    h1 Storage
    p Storage is a factory that allows for easily accessing multiple storage types. This could be a local file storage location or a cloud file storage location. As long as the correct driver is installed and setup you can access any file system.
    p @red5/storage comes build with a file storage driver that connects to the current machine.
    h2 Configuration
    p Storage is configured within #[code config/storage.js]. Within the file there is an option labeled #[code disks] which is an object containing a list of disks that can be used where the key is the name of the disk.
    prism(language="javascript").
      const { applicationPath, storagePath, env } = require('@red5/server')

      module.exports = {
        // This is the default driver that will be used if one isn't manually mounted
        default: env('STORAGE_DRIVER', 'local'),

        disks: {
          // This is a driver that links to "storage/app"
          local: {
            driver: 'file',
            root: storagePath('app')
          },
          // This is a driver that links to "public"
          public: {
            driver: 'file',
            root: applicationPath('public')
          }
        }
      }
    h2 Usage
    p Storage can be easily loaded by mounting a disk and executing the task that you would like.

    p Lets use this example css file located at #[code public/master.css]

    prism(language="css").
      body {
        color: red;
        background: green;
      }

    p We can then #[code mount('public')] and call #[code load('master.css')] to load the file.

    prism(language="javascript").
      const { Storage } = require('@red5/storage')

      module.exports.main = async function (client) {
        // See the configuration above for the location of "public".
        let text = await Storage.mount('public').load('master.css')
        console.log(text)
      }

    p It is also possible to omit #[code mount()] if you want to use the default driver. In this case, since the css is in the #[code public] directory, it will not be able to load it unless we move the file to the location of #[code mount('local')] since #[code local] is the default driver.

    prism(language="javascript").
      const { Storage } = require('@red5/storage')

      module.exports.main = async function (client) {
        // This uses "local" as the driver because it is set as the default.
        // If no file has been saved to the drivers location called "master.css",
        // then this file will not load anything.
        let text = await Storage.load('master.css')
        console.log(text)
      }
</template>