var EvenetEmitter = require("events");

class Logger extends EvenetEmitter {
  log(message) {
    console.log(message);
    this.emit("saad", { id: 1, url: "url" });
}
}
module.exports = Logger