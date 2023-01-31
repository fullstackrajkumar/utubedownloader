import React, { useEffect, useState } from 'react'

const Item = ({quality,url}) => {
    return <div class="row"><div class="col text-center"><h5>{quality}</h5></div><div class="col text-center"><a href={url} target="_blank"><button class="btn btn-success m-auto">Download</button></a></div></div>
}

const Results = ({videos,status,title,thumbnail,message}) => {
    const [allVideos,setVideos] = useState([])
    useEffect(() => {
        setVideos([...videos])
    },[videos])
    return (
        <>
            <div className={(status && allVideos.length > 0) ? "container video-section" : "d-none"} id="success">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <img src={thumbnail ?? "https://images.unsplash.com/photo-1506765515384-028b60a970df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFubmVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"} className="img-thumbnail" />
                    </div>
                    <div className="col-md-6" id="data">
                        <div className="row" id="title"><h4>{title}</h4></div>
                        <div id="links">
                            {allVideos.map(item=><Item quality={item.quality} url={item.url}/>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className={!status ? "container video-section" : "d-none"} id="error">
                <h5>{'Invalid URL or no data found'}</h5>
            </div>
        </>
    )
}

export default Results