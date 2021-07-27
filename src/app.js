const express = require("express");
const cors = require('cors');
const app = new express();
const ytdl = require('ytdl-core');
const port = process.env.PORT || 3000;

// app.use((req,res,next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(cors({
    "origin": "*",
    "methods": "GET",
    "preflightContinue": true,
    "optionsSuccessStatus": 204,
    "access-control-allow-credentials": true
}));

app.get("/data/:url", async (req,res) => {
    res.send(req.params.url);
});

async function fetch(url){
    const vid = await ytdl.getURLVideoID(url);
        let info = await ytdl.getInfo(vid);
        const respondArray = info.player_response.streamingData.formats;
        const narray = [];
        for(let i=0;i<respondArray.length;i++){
            if(respondArray[i].itag === 18){
                narray[i] = {
                    "itag" : respondArray[i].itag,
                    "quality" : "360p",
                    "url" : respondArray[i].url
                }
            }else if(respondArray[i].itag === 22){
                narray[i] = {
                    "itag" : respondArray[i].itag,
                    "quality" : "720p",
                    "url" : respondArray[i].url
                }
            }else if(respondArray[i].itag === 37){
                narray[i] = {
                    "itag" : respondArray[i].itag,
                    "quality" : "1080p",
                    "url" : respondArray[i].url
                }
            }else if(respondArray[i].itag === 38){
                narray[i] = {
                    "itag" : respondArray[i].itag,
                    "quality" : "3072p",
                    "url" : respondArray[i].url
                }
            }
        }
        return {"length" : narray.length, "videos" : narray};
}

app.get("/fetch", async (req,res)=>{
    try{
        const result = await fetch(req.query.url);
        res.status(200).send(result);
    }catch(e){
        res.status(400).send(e);
    }
});

app.listen(port,()=>{
});