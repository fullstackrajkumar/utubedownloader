const express = require("express");
var cors = require('cors');
const app = new express();
const ytdl = require('ytdl-core');
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/fetch", async (req,res)=>{
    try{
        const vid = await ytdl.getURLVideoID(req.query.url);
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
        res.status(200).send(narray);
    }catch(e){
        res.status(400).send(e);
    }
});

app.listen(port,()=>{
});