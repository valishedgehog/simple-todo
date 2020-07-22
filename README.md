# Simple todo app

This is simple todo app build with React.js, GraphQL and Tachyons CSS library, deployed on heroku and hasura.
It is a part of udemy course on React.js

## Installing

Firstly, create a new app in Hasura, create a table called ```todos``` with the following cols:
```
name  type     default
id    UUID     gen_random_uuid()
text  STRING   ""
done  Boolean  False
```

Then paste your ```GraphQL API``` and ```Admin Secret``` in ```config.js``` file.

Finally, run
```bash
npm install
npm start
```