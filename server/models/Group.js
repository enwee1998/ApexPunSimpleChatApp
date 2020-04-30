var mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Message = require("./Message");
const GroupSchema = new Schema({
  groupName: String,
  // chats: [Message],
});
module.exports = Message = mongoose.model("Group", GroupSchema);
