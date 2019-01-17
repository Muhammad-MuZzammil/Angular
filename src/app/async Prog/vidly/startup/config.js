const config = require("config");

module.exports = function() {
  if (!config.get("jwtPrivateKey")) {
    // essential configuration settings during application startup
    // for environment variable set secret key digital signature if not found this block will run.
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
