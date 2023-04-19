const express = require("express");
const cors = require('cors');
const app = new express();
const path = require("path");
const ytdl = require('ytdl-core');
require('dotenv').config()
const port = process.env.PORT || 3000;

// Allowing hbs to use
app.set('view engine', 'hbs');

// using statc path
// app.use(express.static(path.join(__dirname, '../public')));

// Allowing json in project
app.use(express.json());

// use cors to avoid cors errors
app.use(cors({
    "origin": "*",
    "methods": "GET",
    "preflightContinue": true,
    "optionsSuccessStatus": 204,
    "access-control-allow-credentials": true
}));

// Main route
// app.get("/*", (req, res) => {
//     res.sendFile('./index.html');
// });

// Main fetch path to find the videos url
app.get("/fetch", async (req, res) => {
    try {
        const vid = await ytdl.getURLVideoID(req.query.url);
        let info = await ytdl.getInfo(vid);
        const respondArray = info.player_response.streamingData.formats;
        const narray = [];
        for (let i = 0; i < respondArray.length; i++) {
            if (respondArray[i].itag === 18) {
                narray[i] = {
                    "itag": respondArray[i].itag,
                    "quality": "360p",
                    "url": respondArray[i].url
                }
            } else if (respondArray[i].itag === 22) {
                narray[i] = {
                    "itag": respondArray[i].itag,
                    "quality": "720p",
                    "url": respondArray[i].url
                }
            } else if (respondArray[i].itag === 37) {
                narray[i] = {
                    "itag": respondArray[i].itag,
                    "quality": "1080p",
                    "url": respondArray[i].url
                }
            } else if (respondArray[i].itag === 38) {
                narray[i] = {
                    "itag": respondArray[i].itag,
                    "quality": "3072p",
                    "url": respondArray[i].url
                }
            }
        }
        res.status(200).json({
            "status" : true,
            "length": narray.length,
            "title": info.player_response.videoDetails.title,
            "thumbnail": info.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url,
            "videos": narray
        });
    } catch (e) {
        res.status(400).send({
            status : false,
            code : 400,
            message : e.message
        });
    }
});

module.exports = app