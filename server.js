var express = require('express');
var app = express();
var moment = require('moment');

var port = process.env.PORT || 3500;

app.get('/', (req, res) => {
  res.end('Hi there!');
});

app.get('/:date', (req, res) => {
  var date = req.params.date;

  if (!Number(date) && !Date.parse(date)) {
    res.json({
      unix: null,
      natural: null
    });
  } else {
    date = isUnix() ? moment(date, 'X') : moment(date, 'MMMM D, YYYY');
    res.json({
      unix: date.unix(),
      natural: date.format('MMMM D, YYYY')
    });
  }

  function isUnix() {
    return /^\d{8,}$/.test(req.params.date);
  }
})

app.listen(port, () => {
  console.log('Example app listening on port ' + port + '!')
})