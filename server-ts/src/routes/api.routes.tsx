import * as express from 'express';
import React from 'react';
import ReactDOMServer, { renderToString } from 'react-dom/server';
import App from '../../../client-ts/src/App';
import reducer from '../../../client-ts/src/reducers';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

class API {
	public router: express.Router = express.Router();
    // tslint:disable-next-line: align
    constructor () {
      this.initRoutes();
    }

    // tslint:disable-next-line: align
    public initRoutes () {
        this.router.get('^/$', (req, res) => {
			const store = createStore(reducer);
			const html = renderToString(
			<Provider store = {store} >
				<h1>Hello</h1>
			</Provider>
			);
			res.send(this.renderFullPage(html, store.getState()));
        });
	}

	private renderFullPage(html: any,preloadedState: any) {
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
