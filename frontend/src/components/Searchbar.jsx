import React, { useState } from 'react'
const BASE_URL = "https://qi7zkmt5ag.execute-api.us-east-1.amazonaws.com/development"

const Searchbar = ({ onResultsFetch }) => {
    const [url, setUrl] = useState('')
    const [isLoading, setLoading] = useState(false)
    const fetchInfo = () => {
        setLoading(true)
        fetch(BASE_URL+'/fetch?url=' + url).then((res) => res.json()).then((response) => {
            setLoading(false);
            if (response.status) {
                onResultsFetch(response)
                window.scrollTo = document.getElementById('success').scrollHeight
            }else{
                onResultsFetch({
                    status : false,
                    code : 400,
                    message : response.message,
                    videos : []
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
    return (
        <div className="banner">
            <form>
                <div className="container section">
                    <h1 className="text-center">Download Youtube Videos Very Easily</h1>
                    <div className="row">
                        <div className="col-md-9 mb-3">
                            <input type="text" autoComplete="off" name="url" className="form-control" id="link" placeholder="Paste your link here..." onChange={(e) => {
                                setUrl(e.target.value.trim())
                            }} value={url} required />
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