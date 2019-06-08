const dotenv = require('dotenv');
const express = require('express');
const rp = require('request-promise');
const app = express();
const parse = require('parse-link-header');
const PORT = process.env.PORT || 5000;
const path = require('path');
const dev = app.get('env') !== 'production';
const key = process.env.SECRET;

dotenv.config();
//settings for production Environment
if (!dev) {
	app.disable('x-powered-by');
	// Serve static files from the React app
	app.use(express.static(path.join(__dirname, 'client/build')));
}

//------- COMMITS END-POINT -------

function commitReq(sha) {
	var repos = {
		uri: 'https://api.github.com/repos/reactos/reactos/commits',
		resolveWithFullResponse: true,
		qs: {
			access_token: key, // -> uri + '?access_token=xxxxx%20xxxxx'
			sha: sha,
			per_page: 5
		},
		headers: {
			'User-Agent': 'Request-Promise'
		},
		json: true
	};

	return repos;
}

app.get('/api/commits', (req, res) => {
	rp(commitReq(req.query.sha))
		.then(body => {
			let link = body.headers.link;
			let parsed = parse(link);
			let dataAndPage = {
				page: {
					...parsed
				},
				commits: body
			};

			res.json(dataAndPage);
		})
		.catch(function(err) {
			res.json({ error: 'oops...something went wrong' });
		});
});

//------- BRANCHES END-POINT -------

function branchReq() {
	var branches = {
		uri: 'https://api.github.com/repos/reactos/reactos/branches',
		resolveWithFullResponse: false,
		qs: {
			access_token: key
		},
		headers: {
			'User-Agent': 'Request-Promise'
		},
		json: true
	};

	return branches;
}

app.get('/api/branches', (req, res) => {
	rp(branchReq())
		.then(body => {
			res.json(body);
		})
		.catch(function(err) {
			res.json({ error: 'oops...something went wrong' });
		});
});

//------- PR'S END-POINT -------

function pullReq() {
	var pulls = {
		uri: 'https://api.github.com/repos/reactos/reactos/pulls',
		resolveWithFullResponse: true,
		qs: {
			access_token: key,
			per_page: 5
		},
		headers: {
			'User-Agent': 'Request-Promise'
		},
		json: true
	};

	return pulls;
}

app.get('/api/pulls', (req, res) => {
	rp(pullReq())
		.then(body => {
			let link = body.headers.link;
			let parsed = parse(link);
			let dataAndPage = {
				page: {
					...parsed
				},
				pulls: body
			};

			res.json(dataAndPage);
		})
		.catch(function(err) {
			res.json({ error: 'oops...something went wrong' });
		});
});

app.listen(PORT, () => {
	console.log('server started');
});
