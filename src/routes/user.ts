import express from "express"

var router = express.Router();

router.get('/auth', function(req, res) {
  console.log(req.query.accessToken)
  console.log(typeof req.query.accessToken)
  if(typeof req.query.accessToken === 'string' && req.query.accessToken !== '') {
    const accessToken = req.query.accessToken
  }

  
  

  res.send('[GET] this is test');
});

router.post('/', function(req, res) {
  res.send('[POST] this is test');
});

export default router;
