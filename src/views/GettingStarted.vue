<template lang="pug">
main
  navbar
  .content
    h1 Installation
    p Horse Power can be installed multiple ways. Choosing the way you wish to install is up to you.
    h2 Command Line Tool
    p Horse Power can be installed using the command line tool, and having installed all of the prerequisites, creating an application is very easy using #[code horsepower-cli]
    prism.command-line(language="bash").
      npm install -g horsepower-cli
    p Next all that needs to be done is to run the #[code new] command to create a new project
    prism.command-line(language="bash").
      horsepower new hello-world
    p The following process will then run:
    ol
      li A folder will be created called #[code hello-world] in the current directory
      li Horse Power will be downloaded into the #[code hello-world] folder
      li All of the dependencies of Horse Power will be downloaded
      li A temporary server will be started
      li The url #[code http://localhost:5000] will be opened in a new browser window
    p You should then see the #[b Welcome] screen within your browser and if you do, everything should be working!
    h2 Git
    p This is the process that the command line tool does automatically.
    prism.command-line(language="bash").
      git clone git@github.com:horsepower-server/horsepower hello-world --depth 1
      cd hello-world
      npm install
      horsepower serve
    P When opening a browser and navigating to #[code http://localhost:5000], you should then see the #[b Welcome] screen within your browser and if you do, everything should be working!
    h1 Command Line Tool
    p The horsepower command line tool allows you to create key features in your application such as controllers and middleware. It also allows for testing and maintaining your application.
    p If you haven't already, install #[code horsepower-cli] this will then install the tool for this. This is still a work in progress and new features will be added in due time. However you can get your project started and running within a minute.
    prism(language="bash"  data-output="3-4").command-line.
      npm install -g horsepower-cli
      horsepower help
        new       Creates a new project
        serve     Serves the current project
    h1 Static Files
    p Static files are are configured to automatically be served from #[code /public]. Any files located in that directory will automatically be served.
    //- p Additional paths can be setup by editing #[code /config/app.js] and adding paths to the #[code static] option as an array
    //- prism(language="javascript").
    //-   module.exports = {
    //-     static: ['/path/to/static/files']
    //-   }
    h1 Web Servers
    p horsepower runs on the default port #[code 5000], so to access it you need to know the port. This is fine during development, but as a public facing website you most likely don't want that. To fix this we need to place the horsepower server behind a web server such as Nginx.
    h2 Nginx
    p Nginx is a fast lightweight server that is easy to use on linux servers.
    p First you will want to install and create a new configuration file:
    prism(language='bash').
      # Install nginx if it hasn't already been installed
      sudo apt install nginx

      # Create a new configuration file
      sudo vim /etc/nginx/sites-available/example.com
    p Within the configuration file add the following content, replacing #[code example.com] with your domain name and #[code 5000] with the actual port that you are running the horsepower server on.
    prism(language='nginx').
      server {
        # Setup the domain name(s)
        # Each domain is separated by a space
        # Since horsepower supports domain routing, multiple domains can share the same port
        # Note: Unrelated domains should have their own port and horsepower project
        server_name example.com api.example.com;
        listen 80;

        # Setup the proxy
        # This will forward all requests to the horsepower http server
        # and then it will relay the servers response back to the client
        location / {
          proxy_pass http://127.0.0.1:5000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_cache_bypass $http_upgrade;
        }
      }
    p We will want to create a symbolic link to this file so that we can enable/disable this domain without deleting the file itself, and just add/remove the symbolic link.
    prism(language='bash').
      # CD to nginx "sites-enabled" directory
      cd /etc/nginx/sites-enabled

      # Create the symbolic link
      ln -s ../sites-available/example.com ./example.com
    p Finally we start both of the services and test the domain (assuming it has already propagated).
    prism(language='bash').
      # Start the horsepower http server
      pm2 start /path/to/ecosystem.config.js

      # Start the nginx service
      sudo service nginx start
    h2 Apache
    p Apache is a popular server that works well on all platforms though it isn't lightweight like Nginx.
    p First we will start by installing apache if it hasn't already been installed, then we will create the configuration file.
    prism(language='bash').
      # Install apache if it hasn't already been installed
      sudo apt install apache2

      vim /etc/apache2/sites-available/example.conf
    p So first we create a new virtual host, replacing #[code example.com] with your domain name and #[code 5000] with the actual port that you are running the horsepower server on.
    prism(language='apacheconf').
      &lt;VirtualHost *:80&gt;
        # Setup the domain name(s)
        # Since horsepower supports domain routing, multiple domains can share the same port
        # Note: Unrelated domains should have their own port and horsepower project
        ServerName example.com
        ServerAlias api.example.com

        # Setup the proxy
        # This will forward all requests to the horsepower http server
        # and then it will relay the servers response back to the client
        ProxyPass http://127.0.0.1:5000

        ProxyPreserveHost On
      &lt;/VirtualHost&gt;
    p You must also have the modules enabled within the master apache config file:
    prism(language='apacheconf').
      LoadModule proxy_module modules/mod_proxy.so
      LoadModule proxy_http_module modules/mod_proxy_http.so
    p Finally we start both of the services and test the domain (assuming it has already propagated).
    prism(language='bash').
      # Start the horsepower http server
      pm2 start /path/to/ecosystem.config.js

      # Start the apache service
      sudo service apache2 start
</template>