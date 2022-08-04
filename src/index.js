//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const Koa = require('koa');
const Router = require('koa-router');

const koa = new Koa();
var router = new Router();

let users = [
  {
    name: 'Elizabeth Swann',
    email: 'swann@example.com',
    age: '25',
  },
  {
    name: 'Will Turner',
    email: 'turner@example.com',
    age: '22',
  },
  {
    name: 'Hector Barbossa',
    email: 'barbossa@example.com',
    age: '50',
  },
];

//rota simples pra testar se o servidor está online
router.get('/', async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo

//rota que lista todos os usuarios
router.get('/users', (ctx) => {
  ctx.status = 200;
  ctx.body = users
});

//rota que lista um usuario por id
router.get('/user/:id', (ctx) => {
  ctx.status = 200;
  ctx.body = users[ctx.params.id]
});

//rota que edita um usuario já existente
router.post('/userUpdate/:id', (ctx) => {
  ctx.body = Object.assign(users[ctx.params.id], ctx.request.body);
});

//rota que cria um usuario novo, preciso colocar pra ele mostrar todos juntos depois também
router.post('/user/:id', (ctx) => {});

//rota que deleta um usuario já existente
router.delete('/user/:id', (ctx) => {});

koa
  .use(require('koa-body')())
  .use(router.allowedMethods())
  .use(router.routes());

const server = koa.listen(PORT);

module.exports = server;