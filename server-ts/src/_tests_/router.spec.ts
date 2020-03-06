import App from '../app';
import HeroController from '../routes/app.routes';
import SkillController from '../routes/skill.routes';
import request from 'supertest';
// import { response } from 'express';
import UserController from '../routes/user.routes';
import API from '../routes/api.routes';
import AuthController from '../routes/auth.router';
import { User } from '../models/schema';



describe('Test  hero controller', () => {
    const userController = new UserController();
		  const app = new App(new HeroController(), new SkillController(), userController , new API(), new AuthController(userController));
		  app.listen();

		  it('It should response the GET method', (done) => {
			request(app.getServer()).get('/getHeroes').set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
      }).then(response => {
				expect(response.statusCode).toBe(200);
				done();
			});
		});

		  it('Should return hero by name (Ironman should always exists in DB) ', (done) => {
			request(app.getServer()).get('/getHero/Ironman').set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
      }).then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.name).toBe('Ironman');
				done();
			});
		});

		  it('It should response the POST method', (done) => {
			request(app.getServer()).post('/addHero').set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
      }).send({name: 'jest_hero', universe: 'DC'}).then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.name).toBe('jest_hero');
				done();
			});
		});

		  it('It should response the POST method with same hero ', (done) => {
			request(app.getServer()).post('/addHero').set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
      }).send({name: 'jest_hero', universe : 'DC'}).then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.message).toBe('Hero with name jest_hero already exists');
				done();
			});
    });

    it('It should update jest_hero to jest_hero_new on PUT request', (done) => {
      request(app.getServer()).put('/updateHero/jest_hero').set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
      }).send({name: 'jest_hero_new', universe : 'DC'}).then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.message).toBe('Hero jest_hero was update - jest_hero_new: DC');
				done();
			});
    });

    it('It should delete jest_hero_new on DELETE request', (done) => {
    request(app.getServer()).delete('/deleteHero/jest_hero_new').set({
      authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
    }).then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Hero jest_hero_new was deleted');
      done();
    });
  });

		  it('It should response with error message ', (done) => {
			request(app.getServer()).post('/addHero').set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
      }).send({universe: 'DC'}).then(response => {
				expect(response.statusCode).toBe(400);
				expect(response.body.error).toBe('name is undefined');
				done();
			});
    });

		  it('It should set universe "Marvel" if universe is undefined', done => {
			request(app.getServer()).post('/addHero').set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
      }).send({name: 'undf_name'}).then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.universe).toBe('Marvel');
				done();
			});
    });

    it('It should delete undf_name on DELETE request', (done) => {
      request(app.getServer()).delete('/deleteHero/undf_name').set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
      }).then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Hero undf_name was deleted');
        done();
      });
    });

		  it('It should response with 400 code if new name is undefined for PUT', done => {
			request(app.getServer()).put('/updateHero/undf_name').set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
      }).send({universe: ''}).then(response => {
				expect(response.statusCode).toBe(400);
				expect(response.body.error).toBe('Name is undefined');
				done();
			});
    });


    it('should register user' , (done) => {
      const user = new User({email: 'textnode@mail.ru', name: 'Node', surname: 'NodeJS', password: '1234567', phone: '375292309343'});
      request(app.getServer()).post('/auth/register').send(user).then(res => {
        expect(res.status).toBe(200);
        done();
      });
    });
    it('should error on same user' , (done) => {
      const user = new User({email: 'textnode@mail.ru', name: 'Node', surname: 'NodeJS', password: '1234567', phone: '375292309343'});
      request(app.getServer()).post('/auth/register').send(user).then(res => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('User with this email already exists');
        done();
      });
    });

    it('should register error with wrong data' , (done) => {
      const user = new User({email: 'textnode@mail.ru', name: 'Node', surname: 'NodeJS', password: '1234', phone: '375292309343'});
      request(app.getServer()).post('/auth/register').send(user).then(res => {
        expect(res.status).toBe(400);
        done();
      });
    });


    it('should login with NodeJs  data' , (done) => {
      const user = {email: 'textnode@mail.ru', password: '1234567'};
      request(app.getServer()).post('/auth/login').send(user).then(res => {
        expect(res.status).toBe(200);
        done();
      });
    });

    it('should erro on login with wrong NodeJs  data' , (done) => {
      const user = {email: 'textnode@mail.ru', password: '123457'};
      request(app.getServer()).post('/auth/login').send(user).then(res => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Wrong password, try again');
        done();
      });
    });


    it('should  change data for NodeJs user' , (done) => {
      const user = {email: 'textnode@mail.ru', password: '1234567'};
      request(app.getServer()).post('/auth/resetPassword').set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
      }).send(user).then(res => {
        expect(res.status).toBe(201);
        done();
      });
    });

    it('should  send email for NodeJs user' , (done) => {
      const user = {email: 'textnode@mail.ru', password: '1234567'};
      request(app.getServer()).post('/auth/forgot').send(user).then(res => {
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Check email');
        done();
      });
    });

    it('should  delete NodeJs user' , (done) => {
      request(app.getServer()).delete('/user/deleteUser/textnode@mail.ru').set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
      }).then(res => {
        expect(res.status).toBe(201);
        done();
      });
    });


    it('should  return front on /' , (done) => {
      request(app.getServer()).get('/').then(res => {
        expect(res.status).toBe(200);
        done();
      });
    });

    it('It should return all skills', (done) => {
      request(app.getServer()).get('/skills/getSkills').set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
      }).then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });


    it('It should add skill', (done) => {
      request(app.getServer()).post('/skills/addSkill').set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
      }).send({skill: 'Tesing'}).then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('It should return all skills', (done) => {
      request(app.getServer()).get('/skills/getSkills').set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
      }).then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

});
