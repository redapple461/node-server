"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
describe('Test routes methods ', () => {
    test('It should response the GET method', (done) => {
        supertest_1.default(index_1.default).get('/getHeroes').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    test('Should return hero by name (Ironman should always exists in DB) ', (done) => {
        supertest_1.default(index_1.default).get('/getHero/Ironman').then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBe("Ironman");
            done();
        });
    });
    it('It should response the POST method', (done) => {
        supertest_1.default(index_1.default).post('/addHero').send({ name: 'jest_hero', universe: 'jest_un' }).then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBe('jest_hero');
            done();
        });
    });
    it('It should response the POST method with same hero ', (done) => {
        supertest_1.default(index_1.default).post('/addHero').send({ name: 'jest_hero', universe: 'jest_un' }).then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Hero with name jest_hero already exists');
            done();
        });
    });
    it('It should response with error message ', (done) => {
        supertest_1.default(index_1.default).post('/addHero').send({ universe: 'jest_un' }).then((response) => {
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe('name is undefined');
            done();
        });
    });
    it('It should update jest_hero with name jest_hero-NEW', (done) => {
        supertest_1.default(index_1.default).put('/updateHero/jest_hero').send({ name: "jest_hero-NEW", universe: "jest_un" }).then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Hero jest_hero was update - jest_hero-NEW: jest_un');
            done();
        });
    });
    it('It should delete jest_hero-NEW', (done) => {
        supertest_1.default(index_1.default).delete('/deleteHero/jest_hero-NEW').then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Hero jest_hero-NEW was deleted');
            done();
        });
    });
    it('It should set universe "" if universe is undefined', done => {
        supertest_1.default(index_1.default).post('/addHero').send({ name: "undf_name" }).then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body.universe).toBe("");
            done();
        });
    });
    it('It should response with 400 code if new name is undefined for PUT', done => {
        supertest_1.default(index_1.default).put('/updateHero/undf_name').send({ universe: "" }).then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe("Name is undefined");
            done();
        });
    });
});
//# sourceMappingURL=router.test.js.map