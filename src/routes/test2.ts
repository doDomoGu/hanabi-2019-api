import express from "express"

var router = express.Router();

router.get('/a', function(req, res) {
  res.send('[GET222] this is test');
});

router.post('/a2', function(req, res) {
  res.send('[POST222] this is test');
});

export default router;
