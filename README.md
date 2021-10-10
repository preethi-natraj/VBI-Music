# VBI-Music

---
## Requirements

For development, you will only need Node.js and a node global package, NPM, installed in your environement.

### Node
- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands. Node version used in this project is 12.18.0

      $ sudo apt install nodejs

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ npm install

## Running the project

    $ npm start


## API's 

1. To login default user: /api/login

2. To list the songs: /api/list/songs

2(a). To search a song in the list: /api/list/songs?search="song name"  

3. To create a playlist: /api/playlist

4. To update a playlist: /playlist

5. To list the playlist(GET): /api/playlist

5(a). To list a particulate playlist of the user: /api/playlist?playlistId="playlistId"

5(b). To shuffle songs in playlist: /api/playlist?shuffle=true