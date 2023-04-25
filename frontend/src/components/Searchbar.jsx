import React, { useState } from 'react'
const BASE_URL = "https://qi7zkmt5ag.execute-api.us-east-1.amazonaws.com/development"

const View = ({title,image, onClick}) => {
    return <div className='resultss text-start bg-white d-flex justify-content-between ms-4 me-4 p-1 align-items-center border-bottom' onClick={onClick}>
        <p className='m-0'>{title}</p>
        <img src={image} style={{maxHeight : "40px"}} />
    </div>
}

const Searchbar = ({ onResultsFetch }) => {
    const [url, setUrl] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [searchList, setSerachList] = useState([]);
    const [interval, setMyInterval] = useState();
    const fetchInfo = () => {
        setLoading(true)
        fetch(BASE_URL + '/fetch?url=' + url).then((res) => res.json()).then((response) => {
            setLoading(false);
            if (response.status) {
                onResultsFetch(response)
                window.scrollTo = document.getElementById('success').scrollHeight
            } else {
                onResultsFetch({
                    status: false,
                    code: 400,
                    message: response.message,
                    videos: []
                })
            }
        }).catch((err) => {
            setLoading(false);
            onResultsFetch({
                status: false,
                code: 404,
                message: "No data found",
                videos: []
            })
        })
    }
    const searchNow = async (keyword) => {
        if (interval) {
            clearTimeout(interval);
        }
        let id = setTimeout(() => {
            (() => {
                fetch("http://localhost:5000/search?search_query=" + keyword).then(res => res.json()).then((response) => {
                    if(response.status){
                        setSerachList([...response?.data])
                        console.log(response.data[0])
                    }else{
                        console.log(response.message)
                    }
                }).catch((err) => {
                    console.log(err.message)
                })
            })()
        }, 1000)
        setMyInterval(id);
    }
    return (
        <div className="banner">
            <form>
                <div className="container section">
                    <h1 className="text-center">Download Youtube Videos Very Easily</h1>
                    <div className="row">
                        <div className="col-md-9 mb-3">
                            <input type="text" autoComplete="off" name="url" className="form-control" id="link" placeholder="Paste your link here..." onChange={(e) => {
                                if(e.target.value.trim() === ""){
                                    setSerachList([])
                                    setUrl("");
                                }else{
                                    searchNow(e.target.value);
                                    setUrl(e.target.value)
                                }
                            }} value={url} required />
                            {searchList.length > 0 ? searchList.map(item=>{
                                return <View title={item.title} image={item.thumbnails.default.url} onClick={()=>{
                                    setUrl(item.link);
                                    setSerachList([])
                                }} />
                            }) : null}
                        </div>
                        <div className="col-md-3">
                            <button disabled={isLoading} type="button" className="btn btn-primary w-100 btn-block" onClick={() => {
                                fetchInfo()
                            }} id="find">
                                <span id="loader" className={isLoading ? '' : 'd-none'}>
                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>&nbsp;
                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>&nbsp;
                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                </span>
                                <span id="text" className={isLoading ? 'd-none' : ''}>Search</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Searchbar