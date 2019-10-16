# get-json-value

> Command Line Tool that returns the value of a key path (`some.key.path`) in one or multiple JSON files.

## Installation

```sh
$ npm i -g get-json-value
```

## Usage

By default it looks for JSON files in the current working directory. 

```sh
$ get-json-value <object.key.path> <file> (optional file name)
```

## Examples

Executed in a directory with the following files and contents:

```js
locales/
|__es.json // {"home": {"greeting": "Hola"}}
|__en.json // {"home": {"greeting": "Hello"}}
```

It will output:

```sh
$ get-json-value home.greeting

es Hola
en Hello
```

Passing file name (without extension):

```sh
$ get-json-value home.greeting es

es Hola
```

### Custom search directory

You can specify a custom search directory, for instance, for usage in npm-scripts, by setting the Node env variable `GJV_SEARCH_DIR`.

```json
"scripts": {
  "getvalue": "GJV_SEARCH_DIR=./path/to/something npx get-json-value"
}
```

```sh
$ npm run getvalue some.path
```
