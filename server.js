const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const path = require('path');

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    expressWs.getWss().clients.forEach(client => {
      client.send(msg.toString());
    });
  });
});

app.use("/public", express.static('./public/'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(9000);