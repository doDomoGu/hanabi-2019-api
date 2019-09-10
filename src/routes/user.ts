import express from "express"
import db from '../db'

var router = express.Router();

router.get('/auth', function(req, res) {
  if(typeof req.query.accessToken === 'string' && req.query.accessToken !== '') {
    const accessToken = req.query.accessToken

    db.query( 'SELECT * FROM User',(err, results , fields ) => {
        console.log(err)
        console.log(results)
        console.log(fields)
        
    })
  }

  res.send('[GET] this is test');
  
});

router.post('/', function(req, res) {
  res.send('[POST] this is test');
});

export default router;
