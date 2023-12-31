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
<ul>
<li>The application has been built in [VueJs](https://www.primefaces.org/primevue-v2/#/) (2.6.14). </li>
<li>The <b>CSS libraries</b> are [Primevue](https://www.primefaces.org/primevue-v2/#/) and [Primeflex](https://www.primefaces.org/primeflex/) </li>
<li>Accessing the app, a <b>skeleton</b> will be shown and, after 2 seconds, <b>the ranking data table with the fetched data will be displayed</b> (a setTimeout is used to extend the display of the skeleton, otherwise, in a normal condition it would not be visible as the request is very quick). </li>
<li>It's possible to <b>sort</b> some of the columns of the data table and <b>filter the data</b> by the football team's name. </li>
<li>As per specification, by default, after fetching the results, only the first 5 records will be shown. </li>
<li>Clicking the "load more" button, 3 more records will be shown, until the total of results are displayed in the data table. </li>
<li>The click button will <b>automatically make the page scroll</b> with <b>different behaviors on small and large screens.</b> </li>
<li>Hovering every table header, a <b>tooltip will be displayed</b> showing a more explanatory header title. </li>
<li><b>The app is responsive</b>, therefore the stylesheets will adapt the content according to the viewport.</li>
</ul>
