import express from "express"

var router = express.Router();

router.get('/', function(req, res) {
  res.send('[GET] this is test');
});

router.post('/', function(req, res) {
  res.send('[POST] this is test');
});

export default router;
