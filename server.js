const express = require('express');
const app = express();

const port = 5000;

// console.log server is running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', function(req, res) {
    res.send({express: 'YOUR BACKEND IS CONNECTED'});
});



