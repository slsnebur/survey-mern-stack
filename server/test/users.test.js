const request = require('supertest');
const chai = require('chai');
const {User} = require('../src/api/users/model');
const app = require('../src/app');

const mongoose = require('../src/services/mongoose');

const expect = chai.expect;
let authToken = {};
let u_id;

before(function(done) {
    User.counterReset('user_id', function () {
        User.collection.drop();
    });
    User.collection.drop();
    request(app).post('/api/users')
        .send({
            username: 'test4',
            password: 'test',
            email: 'test4@test.com'
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
            authToken = res.body.token;
            u_id = res.body.user.user_id;
            if (err) return done(err);
            done();
        });
});

describe('Users API integrations tests', () => {
    User.collection.drop();

    describe('#GET /api/users', () => {
        it('should return all users', (done) => {
            request(app).get('/api/users')
                .end((err, res) =>  {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.not.be.empty;
                    done();
                });
        });
    });

    describe('#POST /api/users', () => {
        it('should create user', (done) => {
            request(app).post('/api/users')
                .send({
                    username: 'test3',
                    email: 'test3@test.com',
                    password: 'test'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body.user).to.have.all.keys(['user_id', 'username', 'email', 'comments_id', 'forms_id', 'group']);
                    done();
                });
        });
    });


    describe('#PUT /api/users', () => {
        it('should return modified user', (done) => {
            request(app).put('/api/users/' + u_id)
                .set('Authorization', 'bearer ' + authToken)
                .send({
                    username: 'modified',
                    email: 'test4@test.com',
                    password: 'test'
                    })
                .end((err, res) =>  {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.be.equal('User data successfully updated');
                    done();
                });
        });


    });

    describe('#DELETE /api/users', () => {
        it('should delete user', (done) => {
            request(app).delete('/api/users/' + u_id)
                .set('Authorization', 'bearer ' + authToken)
                .end((err, res) =>  {
                    expect(res.statusCode).to.equal(202);
                    done();
                });
        });
    });


    });
