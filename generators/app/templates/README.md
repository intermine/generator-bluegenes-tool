#  <%= toolNameHuman %>

FIXME: fill out a description of your tool here! :)

## Licence
<%= licence %>

### To set up locally for development

1. Clone the repo
2. `cd <%= toolNameComputer %>` and then `npm install` to install dependencies.

All of the editable source files for css and js are in `src`. To bundle for prod, run the following commands:

#### CSS

Assuming [less](http://lesscss.org/) is installed globally:

```
lessc src/style.css dist/style.css --clean-css
```

#### JS

Assuming [webpack](https://webpack.js.org/) is installed globally:

```
npx webpack
```
