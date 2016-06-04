# Remove html element module

## About

npm module for removing html element from .html files

Based on [jsdom module](https://github.com/tmpvar/jsdom)

## Install

`npm install remove-html-element`

or

`npm install --save remove-html-element`

or

`npm install --save-dev remove-html-element`

## Usage

To fast test run:
`npm install && npm test`

### Selectors

For finding html elements jQuery is used, docs for [selectors](https://api.jquery.com/category/selectors/)

### Remove 1 selector in 1 file

``` js
var rem  = require('remove-html-element');
rem('file.html', '#remove-this-selector');
```

### Remove few selectors in 1 file

``` js
var rem  = require('remove-html-element');
rem('file.html', ['#remove-this-selector', '.and-this']);
```

### Remove 1 selector in few files

``` js
var rem  = require('remove-html-element');
rem([
    ['file.html'],
    ['file2.html']
], '#remove-this-selector-in-all-files');
```

### Remove few selectors in few files

``` js
var rem  = require('remove-html-element');
rem([
    ['file.html', ['#remove-this-selector', '.and-this']],
    ['file2.html', ['#remove-this-selector2', '.and-this2']],
]);
```

## ToDo

* save to another file
* check if file exist
* fix empty lines instead of removed element
* check if selector found
* console coloring

## License

* MIT
* Made by [littleguga](https://github.com/littleguga/)