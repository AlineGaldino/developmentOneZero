//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const path = require('path');
const render = require('koa-ejs');

const koa = new Koa();
var router = new Router();

render(koa, {
  root: path.join(__dirname, 'views',),
  layout: 'layout',
  viewExt:'html',
  cache: false,
  debug: false
})

router.get('/', async (ctx) => {
  await ctx.render('index',{
    users: users
  })
});

koa.use(BodyParser());

let users = [
  {
    name: "Elizabeth Swann",
    email: "swann@example.com",
    age: 18 
  }
];

//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo
router.get('/users', read);
router.get('/user', readName)
router.post('/user', add);
router.put('/user', update);
router.delete('/user', deleteUser);

async function read(ctx) {
  ctx.status = 200;
  ctx.body = users
}

async function readName(ctx) {
  let userimport = ctx.request.body;
  const index = users.findIndex((e) => e.name === userimport.name)
  if (index === -1) {
    ctx.body = 'User not found!'
    ctx.status = 404
  } else {
    ctx.status = 200;
    ctx.body = users[index]
  }
}

async function add(ctx) {
  let userimport = ctx.request.body;
  users.push(userimport)
  ctx.status = 201;
  ctx.body = 'User created!'
}

async function update(ctx) {
  let userimport = ctx.request.body;
  const index = users.findIndex((e) => e.name === userimport.name)
  if (index === -1) {
    users.push(userimport)
    ctx.body = 'User created!'
  } else {
    users[index] = userimport
    message = 'User update!'
  }
}

async function deleteUser(ctx) {
  let userimport = ctx.request.body;
  const index = users.findIndex((e) => e.name === userimport.name)
  if (index === -1) {
    ctx.body = 'User not found!'
    ctx.status = 404
  } else {
    delete users[index];
    ctx.body = 'User deleted!'
    ctx.status = 200
  }
}

koa
  .use(router.allowedMethods())
  .use(router.routes());

const server = koa.listen(PORT);

module.exports = server;