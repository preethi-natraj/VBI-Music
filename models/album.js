const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  album: { type: String, required: true },
  songIds: { type: Array },
},{ capped: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false});

module.exports = mongoose.model("album", schema)