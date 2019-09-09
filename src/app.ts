import express from "express"

import test from "./routes/test"

var app = express();

app.use('/test',  test);

app.use( (req, res, next) => {
  res.status(404).send("404 NOT FOUND");
});

app.listen(3000, function(){
    console.log('Example app listening on port 3000');
})
