const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  songTitle: { type: String, required: true },
  singers: { type: Array },
  genre: { type: String }
},{ capped: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false});


schema.statics.songList = function songList (query) {
  return new Promise((resolve, reject) => {
    this.aggregate([
      {
        '$match': query
      }, 
      {
        '$lookup': {
          'from': 'albums', 
          'localField': '_id', 
          'foreignField': 'songIds', 
          'as': 'album'
        }
      }, {
        '$unwind': {
          'path': '$album', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$project': {
          '_id': 1.0, 
          'singers': 1.0, 
          'album': '$album.album', 
          'songTitle': 1.0
        }
      }
    ]).allowDiskUse(true).exec().then((data) => {
      console.log(data)
      resolve(data);
    }).catch((e) => {
      reject(e.message);
    });
  });
};

const Song = mongoose.model('song', schema);
module.exports = { Song };
