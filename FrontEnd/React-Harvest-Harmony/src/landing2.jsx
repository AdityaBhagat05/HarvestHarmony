import i1 from "./assets/landing2.1.png"
import i2 from "./assets/landing2.2.jpg"
import i3 from "./assets/landing2.3.png"
import i4 from "./assets/landing2.4.png"
function landing2() {
    return (
        <div className="offer-container">
          <div className="offer-header">
            <h1 className="offer-title">
              What We <span className="highlight">Can Offer You</span>
            </h1>
            <p className="offer-description">
              We empower farmers with accurate knowledge on fertilizers, government schemes, crop rotation, and weather updates.
              Based on this information, we provide tailored insights to help them make informed decisions and maximize their yield.
            </p>
          </div>
    
          <div className="cards-grid">
            <div className="offer-card">
              <img src={i1} alt="Crop in hands" />
              <h3>Bespoke Tour Packages</h3>
            </div>
    
            <div className="offer-card">
              <img src={i2} alt="Money and phone" />
              <h3>Certified Activity Guides</h3>
            </div>
    
            <div className="offer-card">
              <img src={i3} alt="Fertilizer in hands" />
              <h3>A la Carte Activities</h3>
            </div>
    
            <div className="ministry-logo">
              <img 
                src={i4} 
                alt="Ministry of Agriculture Logo" 
              />
              <p>Ministry of Agriculture & Farmers Welfare<br />Government of India</p>
            </div>
          </div>
        </div>
      );
}

export default landing2;