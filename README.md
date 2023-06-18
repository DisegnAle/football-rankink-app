# football-ranking-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Notes
The application has been built in [VueJs](https://www.primefaces.org/primevue-v2/#/) (2.6.14). <br />
The <b>CSS libraries</b> are [Primevue](https://www.primefaces.org/primevue-v2/#/) and [Primeflex](https://www.primefaces.org/primeflex/) <br />
Accessing the app, a <b>skeleton</b> will be shown and, after 2 seconds, <b>the ranking data table with the fetched data will be displayed</b> (a setTimeout is used to delay the display of the skeleton, otherwise, in a normal condition it would not be visible). <br />
It's possible to <b>sort</b> some of the columns of the data table and <b>filter</b> by the football team's name. <br />
As per specification, by default, after fetching the results, only the first 5 records will be shown. <br />
Clicking the "load more" button, 3 more records will be shown, until the total of results are displayed in the data table. <br />
The click button will <b>automatically make the page scroll</b> with different behaviors on small and large screens. <br />
<b>The app is responsive</b> therefore the stylesheets will adapt the content according to the viewport.
