function Footer() {
    return (
        <>

        <footer className="footer-container">
            <div className="footer-main">
                <div className="footer-item1 item">
                    <header>
                        <p>HASEKIMAGRU <span>Lorem ipsum dolor sit amet.</span></p>
                        <button>Lorem ipsum.</button>
                    </header>
                    <div className="footer-input-contact">
                        <p>CONTACT ME</p>
                        <div className="input-toogle">
                            <input type="text" 
                        placeholder="Your Email"/>
                        <button><i class="ri-arrow-right-line"></i></button>
                        </div>
                    </div>
                </div>   
                <div className="footer-item2 item">
                    <div className="footer-links">
                        <p>Links</p>
                        <a href="javaScript:void(0)">Home</a>
                        <a href="javaScript:void(0)">Search</a>
                        <a href="javaScript:void(0)">Categories</a>
                        <a href="javaScript:void(0)">History</a>
                        <a href="javaScript:void(0)">About Us</a>
                    </div>
                    <div className="footer-links">
                        <p>Infomation</p>
                        <a href="javaScript:void(0)">Website</a>
                        <a href="javaScript:void(0)">Cookie</a>
                        <a href="javaScript:void(0)">Setting</a>

                    </div>
                </div> 
            </div>
            <hr />
                <div className="footer-bottom">
                    <div className="coppy-right">
                        <span>©Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit accusantium vitae similique!</span>
                    </div>
                    <div className="footer-bottom-icon">
                        <i class="ri-facebook-circle-line"></i>
                        <i class="ri-instagram-line"></i>
                        <i class="ri-twitter-x-line"></i>
                        <i class="ri-tiktok-line"></i>
                        <i class="ri-discord-line"></i>
                    </div>
                </div>
        </footer>
            
        </>
    );
}

export default Footer;