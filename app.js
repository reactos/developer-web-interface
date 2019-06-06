const dotenv = require('dotenv');
const express = require('express');
const rp = require('request-promise');
const app = express();
var parse = require('parse-link-header');
dotenv.config();
const PORT = process.env.PORT || 5000;
const path = require('path');

const dev = app.get('env') !== 'production';
var key = process.env.SECRET;
//settings for production Environment
if (!dev) {
	app.disable('x-powered-by');
	// Serve static files from the React app
	app.use(express.static(path.join(__dirname, 'client/build')));
	// app.get('*', (req, res) => {
	// 	res.sendFile(path.join(__dirname + '/client/build/index.html'));
	// });
}

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
	/** 
	 *Endpoint structure
	 :api/commits?sha=sha&per_page=
	 sha = branch name(can fetch data according to the branch requested)
	 dataAndPage={
		page={next,last,prev},
		 commits={
		 	statusCode,body=[commit data]
		 }

	 }
	*/

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

function branchReq() {
	var branches = {
		uri: 'https://api.github.com/repos/reactos/reactos/branches',
		resolveWithFullResponse: false,
		qs: {
			// access_token: key, // -> uri + '?access_token=xxxxx%20xxxxx'
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

app.listen(PORT, () => {
	console.log('server started');
});
