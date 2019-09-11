import express from "express"
import User from "../models/user"

const router = express.Router();

router.get('/auth', function(req, res) {
  if(typeof req.query.accessToken === 'string' && req.query.accessToken !== '') {
    const accessToken = req.query.accessToken
    console.log(accessToken)

    User.findAll().then((users: Array<any>) => {
      console.log(typeof users)
      console.log("All users:", JSON.stringify(users, null, 4));
    });


    // db.query( 'SELECT * FROM User',(err, results , fields ) => {
    //     console.log(err)
    //     console.log(results)
    //     console.log(fields)
        
    // })
  }

  res.send('[GET] this is test');
  
});

router.post('/', function(req, res) {
  res.send('[POST] this is test');
});

export default router;
