var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  username: String,
  groupName: String,
  timestamp: { type: Date, default: new Date() },
  message: String,
});
module.exports = Message = mongoose.model("Message", MessageSchema);
