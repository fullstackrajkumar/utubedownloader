import React from 'react'

const footer = () => {
  return (
    <footer className="bg-dark">
        <div className="container-fluid p-0">
            <div  className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h5>Utube</h5>
                        <hr/>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3495.616142271584!2d78.78314185721383!3d28.820510838147932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1627045447621!5m2!1sen!2sin" width="100%" height="auto" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
                    </div>
                    <div className="col-md-3">
                        <h5>Services</h5>
                        <hr/>
                        <a href="#"><h6>Youtube Downloader</h6></a>
                    </div>
                    <div className="col-md-3">
                        <h5>Menu</h5>
                        <hr/>
                        <a href="/"><h6>Home</h6></a>
                    </div>
                    <div className="col-md-3">
                        <h5>Subscription</h5>
                        <hr/>
                        <div className='d-flex'>
                        <input type="email" placeholder="Enter the email"/>
                        <button type="submit">Subscribe</button>
                        </div>
                    </div>
                </div>
                <hr/>
                <p>Copyright All rights reserved. Designed by Prince</p>
            </div>
        </div>
    </footer>
  )
}

export default footer