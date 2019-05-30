<template lang="pug">
main
  navbar
  .content
    h1 MySQL
    p The MySQL database package is one of the optional packages that is available for the red5 server. It allows you to connect to the database and make queries against it by selecting, updating, deleting and inserting items. The package comes with many great features that allow you to write queries using built in methods aka the query builder. The package also contains Models so you can modify your table by using a model.
    h2 Configuration
    p The database is configured using the config file #[code config/db.js]. Within that file you can setup your database connection information.
    p The export has a named item, it can be whatever you would like. So we added one called #[code mysql], and setup the database settings for that driver within that object.
    p.warn You can have multiple #[b default] items in this config but they must be for different drivers. That means that each driver type may only have one #[b default]. If there is more than one default for a driver, then an error will be thrown.
    prism(language="javascript").
      const { env } = require('@red5/server')

      module.exports = {
        mysql: {
          default: true,
          driver: 'mysql',
          database: env('DB_DATABASE', ''),
          username: env('DB_USERNAME', ''),
          password: env('DB_PASSWORD', ''),
          hostname: env('DB_HOSTNAME', 'localhost')
        }
      }
    p The #[code mysql] object has #[code default: true] which means that when we don't call #[code connect()] it will use this default #[code mysql driver] like this:
    prism(language="javascript").
      // This will use the default driver
      DB.table('my_table')
    p If we want to use a driver that isn't the default we can do it like so:
    prism(language="javascript").
      DB.connect('mysql2').table('my_table')
      DB.connect('mysql2', 'my_table')
    h2 Query Builder
    p The query builder is a tool that allows you to build queries by chaining methods together. When the queries run, they are escaped automatically as to avoid sql injection.
    h3 Select all
    p Here is a basic query that selects all users from the table #[code users]
    prism(language="javascript").
      let result = await DB.table('users').get()
    p The resulting query string will look like this:
    prism(language="sql").
      SELECT * FROM users;
    h3 Select one
    p We can select one item using #[code first()] this will get the first item in the result set it will also add a limit to the query for optimization.
    prism(language="javascript").
      let result = await DB.table('users').first()
    p The resulting query string will look like this:
    prism(language="sql").
      SELECT * FROM users LIMIT 1 OFFSET 0;
    h3 Filtering results
    p There are multiple types of #[code where] methods and they are used to add filters to a where statement. These methods can be strung together to form one where clause.
    p Here is a list of where items that can be used to build a mysql query:
    ul
      li where
      li whereIn
      li whereNotIn
      li whereBetween
      li whereNotBetween
      li whereNull
      li whereNotNull
      li whereMatchAgainst
    p.warn In the following queries, the actual queries will be escaped for query safety. You do not need to worry about escaping these values before making the query as it is done automatically.
    h4 where
    prism(language="javascript").
      // This performs an equality search on the table
      await DB.table('users').where('username', 'Billy').first()

      // This performs a greater than search on the table
      await DB.table('users').where('age', '>', 10).get()
    prism(language="sql").
      -- The query for the equality search
      SELECT * FROM `users` WHERE `username` = 'Billy' LIMIT 1 OFFSET 0;

      -- The query for the greater than search
      SELECT * FROM `users` WHERE `age` > 10;

    h4 whereIn
    prism(language="javascript").
      await DB.table('users').whereIn('username', ['Billy', 'Bob', 'Joe']).get()
    prism(language="sql").
      SELECT * FROM `users` WHERE `username` IN('Billy', 'Bob', 'Joe');

    h4 whereNotIn
    prism(language="javascript").
      await DB.table('users').whereNotIn('username', ['Billy', 'Bob', 'Joe']).get()
    prism(language="sql").
      SELECT * FROM `users` WHERE `username` NOT IN('Billy', 'Bob', 'Joe');

    h4 whereBetween
    prism(language="javascript").
      await DB.table('users').whereBetween('age', 10, 20).get()
    prism(language="sql").
      SELECT * FROM `users` WHERE `age` BETWEEN 10 AND 20;

    h4 whereNotBetween
    prism(language="javascript").
      await DB.table('users').whereNotBetween('age', 10, 20).get()
    prism(language="sql").
      SELECT * FROM `users` WHERE `age` NOT BETWEEN 10 AND 20;

    h4 whereNull
    prism(language="javascript").
      await DB.table('users').whereNull('gender').get()
    prism(language="sql").
      SELECT * FROM `users` WHERE `gender` IS NULL;

    h4 whereNotNull
    prism(language="javascript").
      await DB.table('users').whereNotNull('gender').get()
    prism(language="sql").
      SELECT * FROM `users` WHERE `gender` IS NOT NULL;

    h4 whereMatchAgainst
    prism(language="javascript").
      await DB.table('search').whereMatchAgainst(['title', 'document'], 'red roses').get()
      await DB.table('search').whereMatchAgainst(['title', 'document'], 'red roses', 'boolean').get()
    prism(language="sql").
      SELECT * FROM users WHERE MATCH ('title', 'document') AGAINST ('red roses');
      SELECT * FROM users WHERE MATCH ('title', 'document') AGAINST ('red roses' IN BOOLEAN MODE);
</template>