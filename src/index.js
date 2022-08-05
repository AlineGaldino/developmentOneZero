//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');

const koa = new Koa();
var router = new Router();

//rota simples pra testar se o servidor está online
router.get('/', async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

koa.use(BodyParser());

let users = [
  {
    id:0,
    name: 'Elizabeth Swann',
    email: 'swann@example.com',
    age: 25,
  },
  {
    id:1,
    name: 'Will Turner',
    email: 'turner@example.com',
    age: 22,
  },
  {
    id:2,
    name: 'Hector Barbossa',
    email: 'barbossa@example.com',
    age: 50,
  },
];

//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo
router.get('/users', read);
router.get('/user/:id', readId)
router.post('/create', add);
router.put('/update', update);
router.delete('/deleted', deleteUser);

async function read(ctx){
  ctx.body = users
}

async function readId(ctx){
  ctx.status = 200;
  ctx.body = users[ctx.params.id]
}

async function add(ctx){
  var userimport = ctx.request.body;
  users.push(userimport)
  ctx.body = 'User created!'
}

async function update(ctx){
  let userimport = ctx.request.body;
  const index = users.findIndex((e) => e.id === userimport.id)
  if(index === -1){
    data.push(userimport)
    ctx.body = 'User created!'
  } else {
    users[index] = userimport
    message = 'User update!'
  }
}

async function deleteUser(ctx){
  let userimport = ctx.request.body;
  const index = users.findIndex((e) => e.id === userimport.id)
  if(index === -1){
    ctx.body = 'User not found!'
  } else {
    delete users[index];
    ctx.body = 'User deleted!'
  }
}

koa
  .use(router.allowedMethods())
  .use(router.routes());

const server = koa.listen(PORT);

module.exports = server;