import App from '../app';
import HeroController from '../routes/app.routes';
import SkillController from '../routes/skill.routes';
import request from 'supertest';
import { response } from 'express';
import UserController from '../routes/user.routes';
import API from '../routes/api.routes';
import AuthController from '../routes/auth.router';


describe('Test  hero controller', () => {
		const app = new App(new HeroController(), new SkillController(), new UserController() , new API(), new AuthController());
		app.listen();

		it('It should response the GET method', (done) => {
			request(app.getServer()).get('/getHeroes').then(response => {
				expect(response.statusCode).toBe(200);
				done();
			});
		});

		it('Should return hero by name (Ironman should always exists in DB) ', (done) => {
			request(app.getServer()).get('/getHero/Ironman').then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.name).toBe('Ironman');
				done();
			});
		});

		it('It should response the POST method', (done) => {
			request(app.getServer()).post('/addHero').send({name: 'jest_hero', universe: 'DC'}).then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.name).toBe('jest_hero');
				done();
			});
		});

		it('It should response the POST method with same hero ', (done) => {
			request(app.getServer()).post('/addHero').send({name: 'jest_hero', universe : 'DC'}).then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.message).toBe('Hero with name jest_hero already exists');
				done();
			});
		});

		it('It should response with error message ', (done) => {
			request(app.getServer()).post('/addHero').send({universe: 'DC'}).then(response => {
				expect(response.statusCode).toBe(400);
				expect(response.body.error).toBe('name is undefined');
				done();
			});
		});

		it('It should update jest_hero with name jest_hero-NEW', (done) => {
			request(app.getServer()).put('/updateHero/jest_hero').send({name: 'jest_hero-NEW', universe: 'DC'}).then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.message).toBe('Hero jest_hero was update - jest_hero-NEW: DC');
				done();
			});
		});

		it('It should delete jest_hero-NEW', (done) => {
			request(app.getServer()).delete('/deleteHero/jest_hero-NEW').then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.message).toBe('Hero jest_hero-NEW was deleted');
				done();
			});
		});

		it('It should set universe "" if universe is undefined', done => {
			request(app.getServer()).post('/addHero').send({name: 'undf_name'}).then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.universe).toBe('');
				done();
			});
		});

		it('It should response with 400 code if new name is undefined for PUT', done => {
			request(app.getServer()).put('/updateHero/undf_name').send({universe: ''}).then(response => {
				expect(response.statusCode).toBe(400);
				expect(response.body.error).toBe('Name is undefined');
				done();
			});
		});

		it('should delete temp object', done => {
			request(app.getServer()).delete('/deleteHero/undf_name').then(response => {
				expect(response.statusCode).toBe(200);
				done();
			});
		});


		it('should get all skills', done => {
			request(app.getServer()).get('/skills/getSkills').then(response => {
				expect(response.statusCode).toBe(200);
				done();
			});
		});

		it('shoud get skill by name', done => {
			request(app.getServer()).get('/skills/getSkill/Heal').then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.skill).toBe('Heal');
				done();
			});
		});

		it('shoud add skill', done => {
			request(app.getServer()).post('/skills/addSkill').send({skill: 'Test_Skill'}).then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.skill).toBe('Test_Skill');
				done();
			});
		});

		it('should update Test skill', done => {
			request(app.getServer()).put('/skills/updateSkill/Test_Skill').send({skill: 'Delete_Skill'}).then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.msg).toBe('Updated Test_Skill');
				done();
			});
		});

		it('should delete Delete_Skill', done => {
			request(app.getServer()).delete('/skills/deleteSkill/Delete_Skill').then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.msg).toBe('Deleted Delete_Skill');
				done();
			});
		});
});
