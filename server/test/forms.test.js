const request = require('supertest');
const chai = require('chai');
const {Form} = require('../src/api/forms/model');
const {User} = require('../src/api/users/model');
const app = require('../src/app');

const mongoose = require('../src/services/mongoose');

const expect = chai.expect;
let authToken = {};
let f_id;

before(function(done) {
    Form.counterReset('form_id', function () {
        Form.collection.drop();
        User.collection.drop();
    });


    request(app).post('/api/users')
        .send({
            username: 'test',
            password: 'test',
            email: 'test@test.com'
        })
        .set('Accept', 'application/json')
        .end(function(err, res) {
            authToken = res.body.token;
            if (err) return done(err);
            //Create form
            request(app).post('/api/forms')
                .send({name: 'Comments testing'})
                .set('Authorization', 'bearer ' + authToken)
                .end(function(err, res) {
                    f_id = res.body.form.form_id;
                    if (err) return done(err);
                });
        });

    done();
});

after(function(done) {
    Form.counterReset('form_id', function () {
        Form.collection.drop();
        User.collection.drop();
    });
   done();
});

describe('Forms API integrations tests', () => {

    describe('#GET /api/forms', () => {
        it('should return no forms', (done) => {
            request(app).get('/api/forms')
                .end((err, res) =>  {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.be.empty;
                    done();
                });
        });
    });

    describe('#POST /api/forms', () => {

        it('should require authorization', (done) => {
            request(app).post('/api/forms')
                .send({name: 'Form name'})
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should add a form', (done) => {
            request(app).post('/api/forms')
                .send({name: 'Form name'})
                .set('Authorization', 'bearer ' + authToken)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body.form).to.have.all.keys(['form_id', 'name', 'user_id', 'comments_id', 'pages']);
                    done();
                });
        });

        it('should return 422 when form does not have a name', (done) => {
            request(app).post('/api/forms')
                .set('Authorization', 'bearer ' + authToken)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(422);
                    done();
                });
        });

    });


    describe('#PUT /api/forms', () => {

        it('should return form with modified name', (done) => {
            request(app).put('/api/forms/' + f_id)
                .set('Authorization', 'bearer ' + authToken)
                .send({name: 'modified'})
                .end((err, res) =>  {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.form.name).to.be.equal('modified');
                    done();
                });
        });
    });


    describe('#DELETE /api/forms', () => {
        it('should return no forms', (done) => {
            request(app).delete('/api/forms/' + f_id)
                .set('Authorization', 'bearer ' + authToken)
                .end((err, res) =>  {
                    expect(res.statusCode).to.equal(202);
                    done();
                });
        });
    });


});

