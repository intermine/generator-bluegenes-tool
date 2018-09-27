#  <%= toolNameHuman %>

FIXME: fill out a description of your tool here! :)

## Licence
<%= licence %>

### To set up locally for development

1. Clone the repo
2. `cd <%= toolNameNpm %>` and then `npm install` to install dependencies.

All of the editable source files for css and js are in `src`. To bundle for prod, run the following commands:

#### CSS

Assuming [less](http://lesscss.org/) is installed globally:

```
npm run less
```

#### JS

Assuming [webpack](https://webpack.js.org/) is installed globally:

##### Single build:
```
npm run build
```

##### Dev build that auto-rebuilds saved files:
Note that you'll still have to serve and refresh the page yourself - we don't provide a built-in hot-reload server.
```
npm run dev
```
