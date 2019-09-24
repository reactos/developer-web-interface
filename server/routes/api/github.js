const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const key = process.env.SECRET;
const parse = require('parse-link-header');

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

router.get('/commits', (req, res) => {
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

router.get('/branches', (req, res) => {
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

router.get('/pulls', (req, res) => {
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

module.exports = router;
