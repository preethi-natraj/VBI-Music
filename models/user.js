const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  name: { type: String, required: true},
  username: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true },
  token: {type: String}
},{ capped: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false});

module.exports = mongoose.model("playlist", schema)