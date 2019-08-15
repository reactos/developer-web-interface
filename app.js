const dotenv = require('dotenv');
const express = require('express');
const rp = require('request-promise');
const convert = require('xml-js');
const app = express();
//app.disable('query parser');
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
  const commits = {
    uri: 'https://api.github.com/repos/reactos/reactos/commits',
    resolveWithFullResponse: true,
    qs: {
      access_token: key,
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
  const branches = {
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
      res.json({ error: 'oops...something went wrong' + err });
    });
});

//------- PR'S END-POINT -------

function pullReq(state, page) {
  const pulls = {
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
      res.json({ error: 'oops...something went wrong' + err });
    });
});

//------- BUILD-SET END-POINT -------

function buildSetReq(str) {
  //https://build.reactos.org/api/v2/buildsets?field=bsid&field=sourcestamps&order=-bsid&offset=0&limit=200
  const buildSets = {
    uri: `https://build.reactos.org/api/v2/buildsets?field=bsid&field=sourcestamps&field=submitted_at&order=-bsid${str}`,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  return buildSets;
}

app.get('/api/buildsets', (req, res) => {
  let q =
    '&submitted_at__le=' +
    req.query.submitted_at__le +
    '&submitted_at__ge=' +
    req.query.submitted_at__ge;
  rp(buildSetReq(q))
    .then(body => {
      res.json(body);
    })
    .catch(function(err) {
      res.json({ error: 'oops...something went wrong' + err });
    });
});

//------- BUILD-REQUEST END-POINT -------

function buildReq(str) {
  const buildReq = {
    uri: `https://build.reactos.org/api/v2/buildrequests?${str}&field=buildsetid&field=buildrequestid&order=-buildsetid`,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  return buildReq;
}

app.get('/api/buildreq', (req, res) => {
  let f = req.query.buildsetid__contains;
  let queryStr = f.join('&buildsetid__contains=');
  queryStr = 'buildsetid__contains=' + queryStr;
  rp(buildReq(queryStr))
    .then(body => {
      res.json(body);
    })
    .catch(function(err) {
      res.json({ error: 'oops...something went wrong' + err });
    });
});

//------- BUILDS END-POINT -------

function builds(str) {
  const builds = {
    uri: `https://build.reactos.org/api/v2/builds?${str}&order=-buildrequestid`,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  return builds;
}

app.get('/api/builds', (req, res) => {
  let f = req.query.buildrequestid__contains;
  let queryStr = f.join('&buildrequestid__contains=');
  queryStr = 'buildrequestid__contains=' + queryStr;
  rp(builds(queryStr))
    .then(body => {
      res.json(body);
    })
    .catch(function(err) {
      res.json({ error: 'oops...something went wrong' + err });
    });
});

//------- BUILDERS END-POINT -------

function builderReq() {
  const builders = {
    uri: 'https://build.reactos.org/api/v2/builders',
    resolveWithFullResponse: false,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  return builders;
}

app.get('/api/builders', (req, res) => {
  rp(builderReq())
    .then(body => {
      res.json(body);
    })
    .catch(function(err) {
      res.json({ error: 'oops...something went wrong' + err });
    });
});

//------- TESTMAN END-POINT -------

function testReq(startrev, endrev, page) {
  const tests = {
    uri: `https://reactos.org/testman/ajax-search.php?startrev=${startrev}&endrev=${endrev}&page=${page}&resultlist=0&requesttype=2`,
    resolveWithFullResponse: false,
    headers: {
      'User-Agent': 'Request-Promise'
    }
  };

  return tests;
}

app.get('/api/testman', (req, res) => {
  rp(testReq(req.query.startrev, req.query.endrev, req.query.page))
    .then(body => {
      const result = convert.xml2json(body, { compact: true, spaces: 2 });
      res.send(result);
    })
    .catch(function(err) {
      res.json({ error: 'oops...something went wrong' + err });
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
