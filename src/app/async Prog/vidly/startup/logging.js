const winston = require("winston");
require("winston-mongodb");
require("express-async-errors"); // redirect to error middleware

module.exports = function() {
  // process.on('uncaughtException', (ex) => { // uncaught exception when catch not defined
  //   console.log('WE GOT AN UNCAUGHT EXCEPTION');
  //   winston.error(ex.message, ex);
  //   process.exit(1)
  // })

  winston.handleExceptions(
    // new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })); //same as line 23 and 36 this method is preferable
  // work only for uncaughtException but here is trick which can work with uncaught promise rejection

  // you have to exit process after caught exception and restart process in clean state (because after exception caughted then the process goes an unclean state)
  // in production level there are tools e.g process manager which can restarting node process automatically.

  // process.on('unhandledRejection', (ex) => { // uncaught promise rejection when  not defined e.g line 45
  //   console.log("WE GOT AN UNCAUGHT REJECTION");
  //   winston.error(ex.message, ex)
  //   process.exit(1)
  // })
  process.on("unhandledRejection", ex => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
  winston.add(winston.transports.MongoDB, {
    db: "mongodb://localhost/vidly",
    level: "info"
  });

  // throw new Error('Something failed during startups')  // uncaughtException

  // const p = Promise.reject(new Error('Something failed miserably')) // un handled promise rejection
  // p.then(() => console.log("Done"))
};
