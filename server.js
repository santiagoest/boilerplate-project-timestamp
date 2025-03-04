// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//API endpoints
app.get("/api", function(req, res){
  res.json({
    unix: (new Date()).getTime(),
    utc: (new Date()).toUTCString()
  })
});

app.get("/api/hello", function(req, res){
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function(req, res){
  const date = req.params.date;
  let unix, utc

  if ((new Date(parseInt(date))).toString() === "Invalid Date"){
    res.json({error : "Invalid Date"});
    return;
  }
  if (parseInt(date) < 10000){
    unix = (new Date(date)).getTime();
    utc = (new Date(parseInt(unix))).toUTCString();
  }
  else{
    unix = parseInt(date);
    utc = (new Date(parseInt(date))).toUTCString();
  }
  res.json({
    unix: unix,
    utc: utc
  })
})

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
