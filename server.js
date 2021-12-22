var express = require('express');
const path=require('path');
var app = express();
const env = require('./app/config/env.js');
const port = env.node_server_port;
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Kolkata");

const os = require("os");
const formData = require("express-form-data");
/**
 * Options are the same as multiparty takes.
 * But there is a new option "autoClean" to clean all files in "uploadDir" folder after the response.
 * By default, it is "false".
 */
 const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};

// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());


const cors = require('cors')
const corsOptions = {

  origin:[ 'http://cbe.themaestro.in', 'http://183.82.250.141'] ,

}

  
app.use(cors(corsOptions))
//console.log(__dirname);
app.use('/images',express.static(path.join(__dirname, 'images')));
app.use("/exports",express.static(path.join(__dirname,"exports")));

const db = require('./app/config/db.config.js');
console.log("Om test -----------------------------------");  

//Test connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

require('./app/route/master.route.js')(app);
require('./app/route/user.route.js')(app);
require('./app/route/seller.route.js')(app);
require('./app/route/buyer.route.js')(app);
require('./app/route/admin.route.js')(app);


// Create a Server
var server = app.listen(port, function () {
  let host = server.address().address
  let port = server.address().port
  console.log("App listening at http://%s:%s", host, port);
})
 

