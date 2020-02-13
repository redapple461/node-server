import App from '../app'
import HeroController from '../routes/app.routes'
import request from 'supertest'
import { response } from 'express'

describe('Test  hero controller', () => {
    const app = new App(new HeroController())
    app.listen();

    it('It should response the GET method', (done) => {
        request(app.getServer()).get('/getHeroes').then((response) => {
            expect(response.statusCode).toBe(200)
            done()
        })
    })

    it('Should return hero by name (Ironman should always exists in DB) ', (done) => {
        request(app.getServer()).get('/getHero/Ironman').then((response) => {
            expect(response.statusCode).toBe(200)
            expect(response.body.name).toBe("Ironman")
            done()
        })
    })

    it('It should response the POST method', (done) => {
        request(app.getServer()).post('/addHero').send({name:'jest_hero',universe:'jest_un'}).then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBe('jest_hero')
            done()
        })
    })

    it('It should response the POST method with same hero ', (done) => {
        request(app.getServer()).post('/addHero').send({name:'jest_hero',universe:'jest_un'}).then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Hero with name jest_hero already exists')
            done()
        })
    })

    it('It should response with error message ', (done) => {
        request(app.getServer()).post('/addHero').send({universe:'jest_un'}).then((response) => {
            expect(response.statusCode).toBe(400)
            expect(response.body.error).toBe('name is undefined')
            done()
        })
    })

    it('It should update jest_hero with name jest_hero-NEW', (done) => {
        request(app.getServer()).put('/updateHero/jest_hero').send({name: "jest_hero-NEW", universe: "jest_un"}).then((response) => {
            expect(response.statusCode).toBe(200)
            expect(response.body.message).toBe('Hero jest_hero was update - jest_hero-NEW: jest_un')
            done()
        })
    })

    it('It should delete jest_hero-NEW', (done) => {
        request(app.getServer()).delete('/deleteHero/jest_hero-NEW').then((response) => {
            expect(response.statusCode).toBe(200)
            expect(response.body.message).toBe('Hero jest_hero-NEW was deleted')
            done()
        })
    })

    it('It should set universe "" if universe is undefined', done => {
        request(app.getServer()).post('/addHero').send({name:"undf_name"}).then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body.universe).toBe("")
            done()
        })
    })

    it('It should response with 400 code if new name is undefined for PUT', done => {
        request(app.getServer()).put('/updateHero/undf_name').send({universe: ""}).then(response => {
            expect(response.statusCode).toBe(400)
            expect(response.body.error).toBe("Name is undefined")
            done()
        })
    })
    it('should delete temp object', done => {
        request(app.getServer()).delete('/deleteHero/undf_name').then(response => {
            expect(response.statusCode).toBe(200)
            done()
        })
    })
})

