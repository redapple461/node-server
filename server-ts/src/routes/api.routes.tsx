import * as express from 'express';
import React from 'react';
import reducer from '../../../client-ts/src/reducers';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import HeroController from '../routes/app.routes';
import {renderToString} from 'react-dom/server';
import UniverseController from './universe.routes';
import SkillController from './skill.routes';

  // tslint:disable: align
class API {
	public router: express.Router = express.Router();
  private heroController: HeroController;
  public skillController = new SkillController();
  public universeController = new UniverseController();
    // tslint:disable-next-line: align
    constructor () {
		this.initRoutes();
		this.heroController = new HeroController(this.universeController, this.skillController);
    }

    // tslint:disable-next-line: align
    public initRoutes () {
		this.router.get('^/$', (req, res) => {
		const store = createStore(reducer);
		let initState;
		this.heroController.getAllHeroes((data) => {
			initState = {
				searchUniverse: '',
				heroes: data,
				oldName : '',
				addHero: {name: '', universe: '', skills: []},
				detailHero: null,
				isLoad: false,
				noHeroes: false
			};
			const html = renderToString(
				<Provider store = {store} >
					<h1>Hello</h1>
				</Provider>
			);
			res.send(this.renderFullPage(html, initState));
			});
		});
	}

	private renderFullPage (html: any, preloadedState: any) {
		return`
		<!doctype html>
		<html>
		<head>
			<title>Redux Universal Example</title>
		</head>
		<body>
			<div id="root">${html}</div>
			<script>
         	 window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          	)}
        </script>
			<script type="text/javascript" src="bundle.js"></script>
		</body>
		</html>
		`;
	}
}

export default API;
