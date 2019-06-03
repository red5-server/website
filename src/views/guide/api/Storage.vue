<template lang="pug">
main
  navbar
  .content
    h1 Storage
    p Storage is a factory that allows for easily accessing multiple storage types. This could be a local file storage location, a cloud file storage location or even a mongodb file storage. As long as the correct driver is installed and setup you can access any file system.
    p @red5/storage comes built with three storage drivers.
    ul
      li #[code file] &ndash; for accessing the current machines file system (or remote machine using http)
      li #[code mongo] &ndash; for accessing a mongodb file system using GridFS
      li #[code s3] &ndash; for accessing an s3 cloud file system
    h2 Configuration
    p Storage is configured within #[code config/storage.js]. Within the file there is an option labeled #[code disks] which is an object containing a list of disks that can be used where the key is the name of the disk.
    prism(language='javascript').
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
    h3 Mongo Storage Configuration
    p Mongodb is a built in driver that allows you to connect to your mongo server and use it as a file system using GridFS. The configuration utilizes the #[code options] setting in the config to connect to a mongo server. The only required option is #[code db] which is the database on the server to store the files.
    prism(language='javascript').
      module.exports = {
        disks: {
          mongo: {
            driver: 'mongo',
            root: '/',
            options: {
              db: 'my-database',        // (required)
              user: 'root',             // (optional) defaults to: ''
              pass: 'abc123',           // (optional) defaults to: ''
              host: '123.123.123.123',  // (optional) defaults to: 'localhost'
              port: 27017               // (optional) defaults to: 27017
            }
          }
        }
      }
    h3 S3 Storage Configuration
    p The S3 driver is a built in driver that allows you to connect to S3. The configuration utilizes the #[code options] setting in the config to connect to the S3 server.
    prism(language='javascript').
      module.exports = {
        disks: {
          amazonS3: {
            driver: 's3',
            root: '/',
            bucket: 'my-bucket'
            options: {
              accessKeyId: 'xxxxxxxxxxxxxxxxxxxx',
              secretAccessKey: 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy'
              // See the connection settings:
              // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
            }
          }
        }
      }
    h2 Usage
    p Once all your storage drivers have been setup, storage can then be easily loaded by mounting a disk and executing the task that you would like. You can update your config settings and the driver will start working with the new settings without having to change code.

    p Lets use this example css file located at #[code public/master.css]

    prism(language="css").
      body {
        color: red;
        background: green;
      }

    p We can then #[code mount('public')] and call #[code load('master.css')] to load the file.

    prism(language='javascript').
      const { Storage } = require('@red5/storage')

      module.exports.main = async function (client) {
        // See the configuration above for the location of "public".
        let text = await Storage.mount('public').load('master.css')
        console.log(text)
      }

    p It is also possible to omit #[code mount()] if you want to use the default driver. In this case, since the css is in the #[code public] directory, it will not be able to load it unless we move the file to the location of #[code mount('local')] since #[code local] is the default driver.

    prism(language='javascript').
      const { Storage } = require('@red5/storage')

      module.exports.main = async function (client) {
        // This uses "local" as the driver because it is set as the default.
        // If no file has been saved to the drivers location called "master.css",
        // then this file will not load anything.
        let text = await Storage.load('master.css')
        console.log(text)
      }
</template>