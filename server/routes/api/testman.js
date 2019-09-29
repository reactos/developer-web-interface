const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const convert = require('xml-js');

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

router.get('/testman', (req, res) => {
  rp(testReq(req.query.startrev, req.query.endrev, req.query.page))
    .then(body => {
      const result = convert.xml2json(body, { compact: true, spaces: 2 });
      res.send(result);
    })
    .catch(function(err) {
      res.json({ error: 'oops...something went wrong' + err });
    });
});

module.exports = router;
