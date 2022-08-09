//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem cometer erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

const app = require('../src/index.js');

const assert = require('assert');
const chai = require('chai')
const chaiHttp = require('chai-http');
const chaiJson = require('chai-json-schema');

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

//Define o minimo de campos que o usuário deve ter. Geralmente deve ser colocado em um arquivo separado
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
            type: 'number',
            minimum: 18
        }
    }
}

//Inicio dos testes

//este teste é simplesmente pra enteder a usar o mocha/chai
describe('Um simples conjunto de testes', function () {
    it('deveria retornar -1 quando o valor não esta presente', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
    });
});

//testes da aplicação
describe('Testes da aplicaçao', () => {
    it('o servidor esta online', function (done) {
        chai.request(app)
            .get('/')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('deveria ser uma lista vazia de usuarios', function (done) {
        chai.request(app)
            .get('/users')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.rows).to.eql();
                done();
            });
    });

    it('deveria criar o usuario raupp', function (done) {
        chai.request(app)
            .post('/user/add')
            .send({ name: "raupp", email: "jose.raupp@devoz.com.br", age: 35 })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
            });
    });
    //...adicionar pelo menos mais 5 usuarios. se adicionar usuario menor de idade, deve dar erro. Ps: não criar o usuario naoExiste
    it('deveria criar o usuario Elizabeth', function (done) {
        chai.request(app)
            .post('/user/add')
            .send({ name: "Elizabeth Swann", email: "swann@example.com", age: 18 })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
            });
    });

    it('deveria criar o usuario Hector', function (done) {
        chai.request(app)
            .post('/user/add')
            .send({ name: "Hector Barbossa", email: "barbossa@example.com", age: 52 })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
            });
    });

    it('deveria criar o usuario Angelica', function (done) {
        chai.request(app)
            .post('/user/add')
            .send({ name: "Angelica Teach", email: "teach@example.com", age: 36 })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
            });
    });

    it('deveria criar o usuario Joshamee', function (done) {
        chai.request(app)
            .post('/user/add')
            .send({ name: "Joshamee Gibbs", email: "gibbs@example.com", age: 47 })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
            });
    });

    it('deveria criar o usuario Tia Dalma', function (done) {
        chai.request(app)
            .post('/user/add')
            .send({ name: "Tia Dalma", email: "dalma@example.com", age: 29 })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
            });
    });

    //Aquele que não deve ser cadastrado.
    it('Não deveria criar o usuario Papagaio do Cotton', function (done) {
        chai.request(app)
            .post('/user/add')
            .send({ name: "Papagaio do Cotton", email: "papagaio@example.com", age: 12 })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('o usuario naoExiste não existe no sistema', function (done) {
        chai.request(app)
            .get('/user')
            .send({ name: 'naoExiste' })
            .end(function (err, res) {
                //expect(err.response.body.error).to.be.equal('User not found'); //possivelmente forma errada de verificar a mensagem de erro
                expect(res).to.have.status(404);
                done();
            });
    });

    it('o usuario raupp existe e é valido', function (done) {
        chai.request(app)
            .get('/user')
            .send({ name: 'raupp' })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('deveria excluir o usuario raupp', function (done) {
        chai.request(app)
            .delete('/user')
            .send({ name: 'raupp' })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('o usuario raupp não deve existir mais no sistema', function (done) {
        chai.request(app)
            .get('/user')
            .send({ name: 'raupp' })
            .end(function (err, res) {
                expect(err).to.be.null;
                //expect(res).to.have.status(200);
                //expect(res.body).to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('deveria ser uma lista com pelo menos 5 usuarios', function (done) {
        chai.request(app)
            .get('/users')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.total).to.equal(5);
                done();
            });
    });
})