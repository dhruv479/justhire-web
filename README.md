# istem-web

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# accessibility issues
-for radio button and checkboxes use fieldset tag to properly group them.
-use aria-attributes ie. role,aria-labeledby etc for smooth accessibility.

# UI note
-make more use of tables and lists for displaying descriptive content
-avoid using external plugins and stick to basic css as most plugins aren't accessible
-any button which redirect to other page should render as a link
-for pop-ups or notifications use aria-attribute "role" and set it to value of "alert"
-when using antd vue at check if its accessible or not, many of its components aren't and are not easy to    customize 

# test
-you can test if your changes are accessible or not using Microsoft's in-built "Narrator" application