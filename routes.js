const express = require("express");
const router = express.Router();
const controller = require('./controller');
const auth = require('./middleware/auth');


// Login
router.post("/login", async (req, res) => {
  controller.login(req, res);
});

// To list the songs
router.get("/list/songs", auth, async (req, res) => {
  controller.listSongs(req, res);
});

// To list the playlist of the user
router.get("/playlist", auth, async (req, res) => {
  controller.listPlaylist(req, res);
});

// To add songs to the playlist
router.post("/playlist", auth, async (req, res) => {
  controller.addToPlaylist(req, res);
});

// update playist
router.put("/playlist/:playlistId", auth, async (req, res) => {
  controller.updatePlaylist(req, res);
});

module.exports = router;
