'use strict';

const fs = require('fs');
const express = require('express');
const app = express();
var pretty = require('express-prettify');
var YAML = require('json2yaml'), ymlText, updatedJSON=[];
const PORT = process.env.PORT || 3000
  
var data = fs.readFile('big.json', (err, data) => {  
    if (err) throw err;
    let emp = JSON.parse(data);
    for(var i=0;i<emp.length;i++){
        emp[i]['length'] = Object.values(emp[i]).length;
        updatedJSON[i] = emp[i];
    }
    ymlText = YAML.stringify(updatedJSON);
});

app.use(pretty({ query: 'pretty' }));
app.get("/",function(req, res) {
     res.json(updatedJSON);
});
app.get("/yaml",function(req, res) {
    res.send(ymlText);
});
app.listen(PORT, () => console.log(`App listening on *:${PORT}`)) 
