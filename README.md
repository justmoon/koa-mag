# koa-mag

Development style logger middleware for koa 2.x using [mag](https://github.com/mahnunchik/mag).

```
<-- GET /
--> GET / 200 835ms 746b
<-- GET /
--> GET / 200 960ms 1.9kb
<-- GET /users
--> GET /users 200 357ms 922b
<-- GET /users?page=2
--> GET /users?page=2 200 466ms 4.66kb
```

## Installation

```js
$ npm install koa-mag
```

## Example

```js
var logger = require('koa-mag')
var koa = require('koa')

var app = koa()
app.use(logger())
```

## Options

* `mag` - Provide your own instance of mag. Not generally needed, but useful in some circumstances to fix inheritance issues.

## Notes

Recommended that you `.use()` this middleware near the top to "wrap" all subsequent middleware.

## License

MIT
