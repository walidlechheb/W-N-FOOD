import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="banner">
          <div className="left">W&N FOOD</div>
          <div className="right">
            <p>Z6 Gulshan-e-Maymar, Maroc</p>
            <p>Open: 05:00 PM - 12:00 AM</p>
          </div>
        </div>
        <div >
          <div className="left" style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Created By <u>Lachheb Walid</u> & <u>Elarrag Naima</u>  </p>
            <p>© 2024 W&N FOOD™. All Rights Reserved</p>
            <span style={{ display: "flex", fontSize: "25px", alignItems: "center" }}>
              <FaInstagram style={{ marginRight: "3px" }} />
              <FaFacebook style={{ marginRight: "3px" }} />
              <FaYoutube style={{ marginRight: "3px" }} />
              <FaTwitter style={{ marginRight: "3px" }} />
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;