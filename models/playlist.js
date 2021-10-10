const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  name: { type: String },
  songIds: [{
    songId: { 
      type: mongoose.Schema.ObjectId, 
      required: true 
    },
    date:{ 
      type: Date, default: Date.now()
    }
  }],
  userId: { type: mongoose.Schema.ObjectId, required: true }
},{ capped: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false});

schema.index({ name: 1,  userId:1}, { unique: true });

schema.statics.listPlaylist = function listPlaylist (query) {
  return new Promise((resolve, reject) => {
    this.aggregate([
      {
        '$match': {}
      }, {
        '$unwind': {
          'path': '$songIds', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'songs', 
          'let': {
            'id': '$songIds.songId', 
            'date': '$songIds.date'
          }, 
          'pipeline': [
            {
              '$match': {
                '$and': [
                  {
                    '$expr': {
                      '$eq': [
                        '$_id', '$$id'
                      ]
                    }
                  }
                ]
              }
            }, {
              '$project': {
                '_id': 1.0, 
                'songTitle': 1.0, 
                'genre': 1.0, 
                'singers': 1.0, 
                'created_at': '$$date'
              }
            }
          ], 
          'as': 'songs'
        }
      }, {
        '$unwind': {
          'path': '$songs', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$sort': {
          'songs.created_at': 1
        }
      }, {
        '$group': {
          '_id': '$_id', 
          'playlist': {
            '$first': '$name'
          }, 
          'songs': {
            '$push': '$songs'
          }
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

const Playlist = mongoose.model('playlist', schema);
module.exports = { Playlist };

// module.exports = mongoose.model("playlist", schema)