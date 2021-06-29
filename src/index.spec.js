import http from 'http';
import supertest from 'supertest';
import koa from 'koa';
import noslash from './index.js';

const app = new koa();
app.use(noslash());
app.use((ctx) => (ctx.body = 'ok'));

const server = http.createServer(app.callback());

const request = supertest.agent(server);

describe('noSlash', () => {
  beforeAll(() => server.listen(80));
  afterAll(() => server.close());

  it('should work with /', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('ok');
  });

  it('should work with /ciao', async () => {
    const response = await request.get('/ciao');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('ok');
  });

  it('should work with /ciao/', async () => {
    const response = await request.get('/ciao/');
    expect(response.status).toEqual(302);
    expect(response.headers.location).toEqual('http://127.0.0.1/ciao');
  });

  it('should work with /ciao/?hello=world', async () => {
    const response = await request.get('/ciao/?hello=world');
    expect(response.status).toEqual(302);
    expect(response.headers.location).toEqual('http://127.0.0.1/ciao?hello=world');
  });

  it('should work with //ciao.com/', async () => {
    const response = await request.get('//ciao.com/');
    expect(response.status).toEqual(302);
    expect(response.headers.location).toEqual('http://127.0.0.1/ciao.com');
  });

  it('should work with //ciao.com/?hello=world', async () => {
    const response = await request.get('//ciao.com/?hello=world');
    expect(response.status).toEqual(302);
    expect(response.headers.location).toEqual('http://127.0.0.1/ciao.com?hello=world');
  });
});
