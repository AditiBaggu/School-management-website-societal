import React from "react";
import "../Components/Footer.css"

const Footer = () => {
    return(
        <div className="footer">
            <div className = "sb_footer section_padding">
                <div className="sb_footer-links">
                    <div className="sb_footer-links_div">
                        <h4>For Business</h4>
                        <p>Home</p>
                        <p>Contact</p>
                    </div>
                </div><hr></hr>
                <div className="sb_footer-below">
                    <div className="sb_footer-copyright">
                        <p>
                            @{new Date().getFullYear()} All Rights Reserved.
                        </p>
                    </div>
                    <div className="sb_footer-below-links">
                        <a href="/terms"><div><p>Terms and Conditions</p></div></a>
                        <a href="/terms"><div><p>Privacy</p></div></a>
                        <a href="/terms"><div><p>Security</p></div></a>
                        <a href="/terms"><div><p>Cookie Declarations</p></div></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;