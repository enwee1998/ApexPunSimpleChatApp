var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JoinGroupSchema = new Schema({
  groupName: String,
  username: String,
});
module.exports = Message = mongoose.model("JoinGroup", JoinGroupSchema);
