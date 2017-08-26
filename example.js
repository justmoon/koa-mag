
const logger = require('./')
const Koa = require('koa')
const compress = require('koa-compress')()
const app = new Koa()

// wrap subsequent middleware in a logger

app.use(logger())

// 204

app.use(async function (ctx, next){
  if ('/204' == ctx.path) ctx.status = 204
  else await next()
})

// 404

app.use(async function (ctx, next){
  if ('/404' == ctx.path) return
  await next()
})

// destroy

app.use(async function (ctx, next){
  if ('/close' == ctx.path) return ctx.req.destroy()
  await next()
})

// compress the response 1/2 the time to calculate the stream length

app.use(async function (ctx, next){
  if (Math.random() > 0.5) {
    await next ()
  } else {
    await compress(ctx, next)
  }
})

// response middleware

app.use(async function (ctx, next){
  // yield control downstream
  await next()

  // sleep for 0-2s
  await sleep(Math.random() * 2000 | 0)

  // error
  if (Math.random() > .75) {
    var err = new Error('boom')
    err.status = 500
    throw err
  }

  // random body
  var body = Array(Math.random() * 5 * 1024 | 9).join('a')
  ctx.status = 200
  ctx.body = body
})

var port = process.env.PORT || 3000
app.listen(port)
console.log('listening on port ' + port)

// sleep helper

function sleep(ms) {
  return function(done){
    setTimeout(done, ms)
  }
}
