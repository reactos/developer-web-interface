const dotenv = require('dotenv');
const express = require('express');
const rp = require('request-promise');
const app = express();
dotenv.config();
const parse = require('parse-link-header');
const PORT = process.env.PORT || 5000;
const path = require('path');
const dev = app.get('env') !== 'production';
const key = process.env.SECRET;

//settings for production Environment
if (!dev) {
 app.disable('x-powered-by');
 // Serve static files from the React app
 app.use(express.static(path.join(__dirname, 'client/build')));
}

//------- COMMITS END-POINT -------

function commitReq(sha, page) {
 var commits = {
  uri: 'https://api.github.com/repos/reactos/reactos/commits',
  resolveWithFullResponse: true,
  qs: {
   access_token: key, // -> uri + '?access_token=xxxxx%20xxxxx'
   sha: sha,
   per_page: 10,
   page: page
  },
  headers: {
   'User-Agent': 'Request-Promise'
  },
  json: true
 };

 return commits;
}

app.get('/api/commits', (req, res) => {
 rp(commitReq(req.query.sha, req.query.page))
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
   res.json({ error: 'oops...something went wrong', err: err });
  });
});

//------- BRANCHES END-POINT -------

function branchReq() {
 var branches = {
  uri: 'https://api.github.com/repos/reactos/reactos/branches',
  resolveWithFullResponse: false,
  qs: {
   access_token: key,
   per_page: 100
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

function pullReq(state, page) {
 var pulls = {
  uri: 'https://api.github.com/repos/reactos/reactos/pulls',
  resolveWithFullResponse: true,
  qs: {
   access_token: key,
   state: state,
   per_page: 10,
   page: page
  },
  headers: {
   'User-Agent': 'Request-Promise'
  },
  json: true
 };

 return pulls;
}

app.get('/api/pulls', (req, res) => {
 rp(pullReq(req.query.state, req.query.page))
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

//------- BUILD-SET END-POINT -------
//https://build.reactos.org/api/v2/buildsets?field=bsid&field=sourcestamps&order=-bsid
//https://build.reactos.org/api/v2/buildsets?field=bsid&field=sourcestamps&order=-bsid&limit=50
//https://build.reactos.org/api/v2/buildsets?field=bsid&field=sourcestamps&order=-bsid&offset=0&limit=50
//increasing the offset by 50 on next page request!!!
function buildSetReq() {
 var buildSets = {
  uri:
   'https://build.reactos.org/api/v2/buildsets?field=bsid&field=sourcestamps&order=-bsid&offset=0&limit=50',
  headers: {
   'User-Agent': 'Request-Promise'
  },
  json: true
 };

 return buildSets;
}

app.get('/api/buildsets', (req, res) => {
 rp(buildSetReq())
  .then(body => {
   res.json(body);
  })
  .catch(function(err) {
   res.json({ error: 'oops...something went wrong' });
  });
});

//------- BUILD-REQUEST END-POINT -------

//https://build.reactos.org/api/v2/buildrequests?field=buildsetid&field=buildrequestid&buildsetid=1

function buildReq() {
 var buildReq = {
  uri:
   'https://build.reactos.org/api/v2/buildrequests?field=buildsetid&field=buildrequestid',
  headers: {
   'User-Agent': 'Request-Promise'
  },
  json: true
 };

 return buildReq;
}

app.get('/api/buildreq', (req, res) => {
 rp(buildReq())
  .then(body => {
   res.json(body);
  })
  .catch(function(err) {
   res.json({ error: 'oops...something went wrong' });
  });
});

//------- BUILDS END-POINT -------

function builds() {
 var builds = {
  uri: 'https://build.reactos.org/api/v2/builds',
  headers: {
   'User-Agent': 'Request-Promise'
  },
  json: true
 };

 return builds;
}

app.get('/api/builds', (req, res) => {
 rp(builds())
  .then(body => {
   res.json(body);
  })
  .catch(function(err) {
   res.json({ error: 'oops...something went wrong' });
  });
});

if (!dev) {
 app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
 });
}

app.listen(PORT, () => {
 console.log('server started');
});
