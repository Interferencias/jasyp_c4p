var express = require('express');
var router = express.Router();
var debug = require('debug')('jasyp-c4p:route:papers')
const papers = require('../lib/papers');
const Papers = require('../lib/schema/paper');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'JASYP C4P' });
});

router.post('/', function(req, res, next) {
  const paper = new Paper(req.body);
  papers.create(paper)
    .then(paperId => res.render('papers', {
      success: true,
      paperId
    }))
    .catch(err => {
      debug(err.message, req.body);
      res.status(400).render('papers', {
        errors: [
          err.message
        ],
        success: false,
        submission: req.body
      });
    })
});

module.exports = router;
