function Footer() {
  return (
    <>
      <footer className="footer-container">
        <nav className="links">
         
            <ul className="item1">
              <li>About</li>
              <li>Blogs</li>
              <li>Website</li>
              <li>Carres</li>
              <li>Source</li>
            </ul>
          
         
            <ul className="item2">
              <li>Contact</li>
              <li>X</li>
              <li>Facebook</li>
              <li>Telegram</li>
              <li>Instagram</li>
            </ul>

            <ul className="item3">
                <li>Get Help</li>
                <li>FAQ</li>
                <li>Shipping</li>
                <li><span>R</span>eturns</li>
                <li><span>Or</span>der Status</li>
            </ul>
          
        <div className="copy">
          <span>Copyright&copy;2026 Moving</span>
          <div className="input">
            <input type="text" placeholder="Enter your email"/>
            <button>Send</button>
          </div>
        </div>
        </nav>
      </footer>
    </>
  );
}

export default Footer;
