const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
var db = require("./models");
//const config = require('./config/config');

const app = express();
const env = process.env.NODE_ENV || 'development';
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

var login = require('./api/login');
var applicationStatus = require('./api/applicationStatus');
var approvalstatus= require('./api/approvalStatus');
var updateEmp=require('./api/updateEmp');
var addEmp=require('./api/addEmp');
var deleteApp=require('./api/deltApplications');
var searchApp=require('./api/search');
var appSinceDate=require('./api/applicatinSinceDate');
var approveAndRejects=require('./api/approveAndRejects');
var empDetails=require('./api/empDetails');
var adminDetails=require('./api/adminDetails');


login(app,db);
applicationStatus(app,db);
approvalstatus(app,db);
updateEmp(app,db);
addEmp(app,db);
deleteApp(app,db);
searchApp(app,db);
appSinceDate(app,db);
approveAndRejects(app,db);
empDetails(app,db);
adminDetails(app,db);

app.listen(8000, () => console.log("Listening on 8000"));