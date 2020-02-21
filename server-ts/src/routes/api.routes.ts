import * as express from 'express';


class API {
	public router: express.Router = express.Router();
	private html;
    // tslint:disable-next-line: align
    constructor () {
		this.initRoutes();
		this.html = 'Hello from api';
    }

    // tslint:disable-next-line: align
    public initRoutes () {
        this.router.get('/', this.sendClient);
    }

    // tslint:disable-next-line: align
    private sendClient = (req: express.Request, res: express.Response) => {
      res.send(this.renderFullPage());
	}

	private  renderFullPage = () => {
		return `
		<!doctype html>
		<html>
		  <head>
			<title>Redux Universal Example</title>
		  </head>
		  <body>
			<div id="root">${this.html}</div>

			<script src="bundle.js"></script>
		  </body>
		</html>
		`;
	}
}

export default API;
