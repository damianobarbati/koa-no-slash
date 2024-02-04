# koa-no-slash

Koa middleware removing trailing slash from path.

## Requirements

- nodejs v21+
- add `type=module` in your package.json as middleware is exported as ESM

## Usage

Install:
```sh
yarn add koa-no-slash
```

Usage:
```js
import http from 'http';
import koa from 'koa';
import noslash from 'koa-no-slash';

const app = new koa()
app.use(noslash());
app.use(ctx => ctx.body = ctx.path);

const server = http
    .createServer(app.callback())
    .listen(80, console.log);
```
