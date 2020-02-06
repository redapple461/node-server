const request = require('supertest')
const app = require('../server')

describe('Test the root path', () => {

    it('It should response the GET method', (done) => {
        request(app).get('/getHeroes').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    it('It should response the POST method', (done) => {
        request(app).post('/addHero').send({name:'jest_hero',universe:'jest_un'}).then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    it('It should response the GET for total count', (done) => {
        request(app).get('/getTotalCount').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    it('It should response the GET for total count', (done) => {
        request(app).get('/getHero/jest_hero').send().then((response) => {
            console.log(response);
            expect(response.statusCode).toBe(200);
            expect(response.body[0].name === 'jest_hero');
            done();
        });
    });
    

    it('It should response the PUT for total count', (done) => {
        request(app).put('/updateHero/jest_hero').send({name:'jest_hero1', universe:'abc'}).then((response) => {
            console.log(response);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg === 'hero was updated!');
            done();
        });
    });

    it('It should response the DELETE hero', (done) => {
        request(app).delete('/deleteHero/jest_hero1').send().then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.msg === 'all is ok');
            done();
        });
    });
  
});