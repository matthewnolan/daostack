var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));

// app.use('/', express.static('/dist'))


// app.set('views', __dirname + '/dist');
app.set('view engine', 'html');


// app.get('/', function(request, response) {
//     response.render('index');
// });

// app.use(express.staticProvider(__dirname + '/dist'));

app.get('/', function(req, res) {
    // res.render('index.html');
    res.sendfile('/dist/index.html');
});




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


