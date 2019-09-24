const express = require('express');
const router = express.Router();
const rp = require('request-promise');

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

router.get('/buildsets', (req, res) => {
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

router.get('/buildreq', (req, res) => {
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

router.get('/builds', (req, res) => {
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

router.get('/builders', (req, res) => {
  rp(builderReq())
    .then(body => {
      res.json(body);
    })
    .catch(function(err) {
      res.json({ error: 'oops...something went wrong' + err });
    });
});

module.exports = router;
