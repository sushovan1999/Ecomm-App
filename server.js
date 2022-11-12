let serverConfig = require("./config/server.config");
let express = require('express');
let expressApp = express();
const router = require("./routes/index");
expressApp.use(router);

expressApp.listen(serverConfig.PORT, () => {
    console.log("Server listening at port " + serverConfig.PORT);
})