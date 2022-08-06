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

/*
const userSchema = {
  title: "Schema do Usuario, define como é o usuario, linha 24 do teste",
  type: "object",
  required: ['name', 'email', 'age'],
  properties: {
      name: {
          type: 'string'
      },
      email: {
          type: 'string'
      },
      age: {
          type: 0
      }
  }
}

let users = [userSchema.find]
*/

let users = [
  {
    name: 'Elizabeth Swann',
    email: 'swann@example.com',
    age: 25,
  },
  {
    name: 'Will Turner',
    email: 'turner@example.com',
    age: 22,
  },
  {
    name: 'Hector Barbossa',
    email: 'barbossa@example.com',
    age: 50,
  },
];


//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo
router.get('/users', read);
router.get('/user', readId)
router.post('/user', add);
router.put('/user', update);
router.delete('/user', deleteUser);

async function read(ctx) {
  ctx.status = 200;
  ctx.body = users
}

async function readId(ctx) {
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


/*
async function add(ctx) {
  let userVerify = ctx.request.body.find(({age}) => age < 18)
  let userimport = ctx.request.body;
  if (userVerify === true){
    ctx.body = 'User cannot be created'
  } else {
    users.push(userimport)
    ctx.status = 200;
    ctx.body = 'User created!'
  }
}
*/

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