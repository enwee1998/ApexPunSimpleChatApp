var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GroupSchema = new Schema({
  groupName: String,
});
module.exports = Message = mongoose.model("Group", GroupSchema);
