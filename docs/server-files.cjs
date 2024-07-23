const static_ = require("node-static");
const http = require("http");

const args = require("minimist")(process.argv.slice(2));
require("dotenv").config({ path: args.pathEnv });

const file = new static_.Server(process.env.VITE_BASE_DIST);
const fileStatics = new static_.Server("statics");

/* create server */
http.createServer(async function (req, res) {
	console.log(req.url);
	try {
		/* link privacy page */
		if (req.url == "/privacy" || req.url == "/privacy.html") {
			if (req.url == "/privacy") {
				req.url = req.url + ".html";
			}
			fileStatics.serve(req, res, function (err, result) {
				if (err && err.status === 404) {
					console.log(err);
				}
			});
			return;
		}
		/* default link */
		file.serve(req, res, function (err, result) {
			if (err && err.status === 404) {
				file.serveFile("/index.html", 200, {}, req, res);
			}
		});
	} catch (error) {
		file.serveFile("/index.html", 200, {}, req, res);
	}
}).listen(process.env.VITE_BASE_PORT);
