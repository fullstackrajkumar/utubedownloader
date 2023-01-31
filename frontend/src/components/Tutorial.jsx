import React from 'react'

const Tutorial = () => {
    return (
        <div className="container guide">
            <h3 className="text-center">How to Download</h3>
            <div className="row">
                <div className="col-md-5 steps">
                    <div className="row">
                        <div className="col-1 dot"><h5>1</h5></div>
                        <div className="col step"><h5>Copy the link</h5></div>
                    </div>
                    <div className="row">
                        <div className="col-1 dot"><h5>2</h5></div>
                        <div className="col step"><h5>Paste link and click search</h5></div>
                    </div>
                    <div className="row">
                        <div className="col-1 dot"><h5>3</h5></div>
                        <div className="col step"><h5>Choose Quality</h5></div>
                    </div>
                    <div className="row">
                        <div className="col-1 dot"><h5>4</h5></div>
                        <div className="col step"><h5>Click three dots</h5></div>
                    </div>
                    <div className="row">
                        <div className="col-1 dot"><h5>5</h5></div>
                        <div className="col step"><h5>Click Download </h5></div>
                    </div>
                </div>
                <div className="col-md-7 gif">
                    <img src="assets/tut.gif" className="img-fluid" />
                </div>
            </div>
        </div>
    )
}

export default Tutorial