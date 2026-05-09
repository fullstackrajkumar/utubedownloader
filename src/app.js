require('dotenv').config();
const os = require('os');
// ytdl saves debug copies of YouTube's player script next to the process cwd unless redirected.
if (!process.env.YTDL_DEBUG_PATH) {
    process.env.YTDL_DEBUG_PATH = os.tmpdir();
}

const express = require("express");
const cors = require('cors');
const app = new express();
const ytdl = require('@distube/ytdl-core');
var search = require('youtube-search');
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

// Include WEB so streamingData from the watch page is parsed; default clients alone can yield zero formats.

const YTDL_GET_INFO_OPTIONS = {
    playerClients: ["WEB", "WEB_EMBEDDED", "IOS", "ANDROID", "TV"],
};

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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Main route
// app.get("/*", (req, res) => {
//     res.sendFile('./index.html');
// });

// GET /fetch — @distube/ytdl-core (drop-in fork; fent/ytdl-core no longer tracks YouTube’s player)
app.get("/fetch", async (req, res) => {
    try {
        const videoUrl = req.query.url;
        if (!videoUrl) {
            return res.status(400).send({
                status: false,
                code: 400,
                message: "URL is required"
            });
        }
        if (!ytdl.validateURL(videoUrl)) {
            return res.status(400).send({
                status: false,
                code: 400,
                message: "Invalid YouTube URL"
            });
        }
        const info = await ytdl.getInfo(videoUrl, YTDL_GET_INFO_OPTIONS);
        const itagQuality = new Map([
            [18, "360p"],
            [135, "480p"],
            [247, "720p"],
            [136, "720p"],
            [248, "1080p"],
            [137, "1080p"]
        ]);
        const videos = [];
        for (const [itag, quality] of itagQuality) {
            const format = info.formats.find((f) => f.itag === itag && f.url);
            if (format) {
                videos.push({ itag, quality, url: format.url });
            }
        }
        const thumbs = info.videoDetails.thumbnails || [];
        const thumbnail = thumbs.length ? thumbs[thumbs.length - 1].url : undefined;
        res.status(200).json({
            status: true,
            length: videos.length,
            title: info.videoDetails.title,
            thumbnail,
            videos
        });
    } catch (e) {
        return res.status(400).send({
            status: false,
            code: 400,
            message: e.message
        });
    }
});

app.get('/search', async (req, res) => {
    try {
        const { search_query } = req.query;
        if(!search_query){
            return res.status(400).send({
                status: false,
                code: 400,
                message: "Search query is required"
            });
        }
        var opts = {
            maxResults: 10,
            type: 'video',
            key: process.env.YOUTUBE_API_KEY
          };
          
          search(search_query, opts, function(err, results) {
            if(err){
                res.status(400).send({
                    status: false,
                    code: 400,
                    message: err.message
                });
            }else{
                res.status(200).send({
                    status : true,
                    code : 200,
                    message : "Fetched",
                    data : results
                });
            }
          });
    } catch (err) {
        res.status(400).send({
            status: false,
            code: 400,
            message: err.message
        });
    }
});

app.use('*', (req,res) => {
    res.redirect('/docs');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});