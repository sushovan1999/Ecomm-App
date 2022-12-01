const serverConfig = require("./config/server.config");
const expressApp = require("./app");

expressApp.listen(serverConfig.PORT, () => {
  console.log("Server listening at port " + serverConfig.PORT);
});
