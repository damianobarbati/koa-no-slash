import { URL } from 'url';

const hasTrailingSlash = (value) => value !== '/' && value.endsWith('/');

const noSlash =
  (http_code = 302) =>
  (ctx, next) => {
    const removeTrailingSlash = hasTrailingSlash(ctx.path);
    if (!removeTrailingSlash) {
      return next();
    }

    const href = ctx.request.href;

    try {
      const url = new URL(href);
      const pathname = url.pathname.slice(0, -1).replace(/[/]+/g, '/');

      const newURL = new URL(pathname + url.search, href).toString();

      ctx.status = http_code;
      ctx.redirect(newURL);
    } catch (error) {
      console.error('koa-no-slash could not handle ', href, 'because:', error.message);
      // Intentionally left blank. Can't parse the requested path as URL
    }

    return next();
  };

export default noSlash;
