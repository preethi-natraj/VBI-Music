const mongoose = require('mongoose');
const { Song } = require('./models/song');
const {Playlist} = require('./models/playlist');
const Album = require('./models/album');
const response = require('./response/response');
const jwt = require('jsonwebtoken');
const user = require('./response/user.json');
const jwt_decode = require('jwt-decode');


// To Generate Token
 const generateJWT = async (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
   'secret',
    {
      expiresIn: 3600,
    },
  );

}


// Login
 const login = async (req, res) => {
  try {

    const userData = req.body;

    if (!userData.identifier || !userData.password) {
      return res.status(403).send(formatErrorMessage('Please provide identifier & password!..', 403));
    }

    if(userData.identifier != user.email && userData.password != user.password) {
      throw new Error('Invalid User!!..')
    }

    let token = await generateJWT(user)
    // Token
    const generatedJWT = `Bearer ${token}`;

    return res.status(200).send(response.formatSuccessMessage( 
      `User Successfully logged in`,
      user,
      generatedJWT
    ));
   
  } catch (e) {
    console.log(e);
    return res.status(400).send(response.formatErrorMessage(error.message, 400, null));
  }
};

// List songs 
async function listSongs (req, res) {

  try {
    
    const { search } = req.query;
    const userToken = req.headers['x-access-token'];

    let query = {}

    //Search for the song title
    if(search) query = {songTitle: {$regex : search, $options : 'i'}}
    
    // Querying to find the list of songs
    let songsList = await Song.songList(query).catch((e) => {
      throw new Error(e.message);
    });

    return res.status(200).send(response.formatSuccessMessage( 
      `Songs are listed successfully`,
      songsList,
      userToken
    ));

  } catch (error) {
    return res.status(400).send(response.formatErrorMessage(error.message, 400, userToken));
  }
}

// List playlist of the logged in user
async function listPlaylist (req, res) {
  const userToken = req.headers['x-access-token'];

  try {
  
    let decoded = jwt_decode(userToken);
    const { shuffle, playlistId } = req.query;

    let query = {
      userId: mongoose.Types.ObjectId(decoded._id)
    };

    if(playlistId) query.playlistId = mongoose.Types.ObjectId(playlistId)


    let playlist = await Playlist.listPlaylist(query).catch((e) => {
      throw new Error(e.message);
    });

    if(!playlist.length) {
      throw new Error('No playlist found!!!')
    }

    // shuffling the playlist
    if(shuffle && playlistId) playlist[0].songs.sort( () => Math.random() - 0.5)

    return res.status(200).send(response.formatSuccessMessage( 
      `Songs are listed successfully`,
      playlist,
      userToken
    ));

  } catch (error) {
    console.log(error)
    return res.status(400).send(response.formatErrorMessage(error.message, 400, userToken));
  }
}

// Create play list for the logged in user
async function addToPlaylist (req, res) {
  const userToken = req.headers['x-access-token'];

  try {

    const { songIds } = req.body;

    var decoded = jwt_decode(userToken);

    if(!songIds) throw new Error('Please provide the song id');

    let playlist = {
      userId: decoded._id,
      songIds: songIds,
      name: req.body.name
    }

    //Creating the playlist
    let createdPlaylist = await Playlist.create(playlist).catch((e) => {
      throw new Error(e.message);
    });

    return res.status(200).send(response.formatSuccessMessage( 
      `Song added to the play list successfully`,
      createdPlaylist,
      userToken
    ));

  } catch (error) {
    console.log(error)
    return res.status(400).send(response.formatErrorMessage(error.message, 400, userToken));
  }
}

// Updating the playlist for the logged in user
async function updatePlaylist (req, res) {
  const userToken = req.headers['x-access-token'];

  try {

    const { songIds } = req.body;
    const { playlistId } = req.params;

    var decoded = jwt_decode(userToken);

    let playlist = await Playlist.findOne(({_id: playlistId}))

    if(!playlist) {
      throw new Error('Playlist not found!!!')
    }

    // Checking if the songs are already available in the playlist
    const availablePlaylist = playlist.songIds.filter(element =>  songIds.includes(element.toString()));

    if(availablePlaylist.length) throw new Error(`${availablePlaylist} are already available in the ${playlist.name}`)

    if(!req.body.name) req.body.name = playlist.name;

    let updatedPlaylist = await Playlist.findOneAndUpdate(
      {_id: mongoose.Types.ObjectId(playlistId)},
      {$set: {name: req.body.name},
      $push: {"songIds": songIds }},
      { new: true }
    )

    return res.status(200).send(response.formatSuccessMessage( 
      `Song added to the play list successfully`,
      updatedPlaylist,
      userToken
    ));

  } catch (error) {
    console.log(error)
    return res.status(400).send(response.formatErrorMessage(error.message, 400, userToken));
  }
}

module.exports = {
  listSongs,
  addToPlaylist,
  listPlaylist,
  login,
  updatePlaylist
};
