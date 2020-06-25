var mongoose = require('mongoose');

var MemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  address: String,
});

var Member = mongoose.model('Member', MemberSchema);

module.exports = Member;