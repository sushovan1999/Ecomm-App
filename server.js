const express = require('express');
let bodyParser = require("body-parser");
const serverConfig = require("./config/server.config");
const router = require("./routes/index");
const ErrorHandler = require("./middlewares/Errorhandler")
const expressApp = express();
expressApp.use(router);
expressApp.use(bodyParser.json());
expressApp.use(ErrorHandler);



expressApp.listen(serverConfig.PORT, () => {
    console.log("Server listening at port " + serverConfig.PORT);
})