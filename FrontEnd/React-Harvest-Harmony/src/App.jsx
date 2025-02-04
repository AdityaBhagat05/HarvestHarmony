import SignInButton from "./SignInButton.jsx"
import Landing2 from "./landing2.jsx"
import Landing3 from "./landing3.jsx"
import Landing4 from "./landing4.jsx"
import Landing5 from "./landing5.jsx"
import CropMatrix from './CropMatrix';
import useChatbot from './hooks/useChatbot';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import i1 from "./assets/mail.jpg"
import i2 from "./assets/pp.jpg"

function LandingPage() {
  return (
    <>
    <div className="background-image">
        <div className="bottom-container">
          <h3 className="bottom-heading">Harvest <br></br> Harmony</h3>
          <Link to="/login"><SignInButton /></Link>
        </div>
      </div>
      <Landing2 />
      <Landing3 />
      <Landing4 />
      <Landing5 />
      {/* <Home /> */}
    </>
  );
}

function Login(){
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logged in with username:", username);
    navigate("/home"); // Direct access to HomePage
  };

  return (
    <div className="login-container">
        <h2>Sign In</h2>
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">Login</button>
          <div className="form-footer">
            <a href="/Signup">Create Account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

function Signup(){
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signed up with username:", username);
    navigate("/home"); // Direct access to HomePage
  };

  return (
    <div className="signup-container">
        <h2>Create Account</h2>
      <div className="signup-box">
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="Date of Birth"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">Sign Up</button>
          <div className="form-footer">
            <p>Already have an account? <a href="/login">Login here</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

function Home() {
  useChatbot();
  return (
  <div className="Home">
        <div className="navbar">
            <ul>
                <li><div className="heading">Harvest Harmony</div></li>
                <li><a href="#">Home</a></li>
                <li><a href="/tellus">Tell us about your farm</a></li>
                <li><a href="#"><img src={i1} alt="mail" /></a></li>
                <li><a href="#"><img src={i2} alt="pp" /></a></li>
            </ul>
        </div>
        <CropMatrix />
        <div className="chatbot-container">
          </div>
    </div>
  );
}

function Tellus(){
  const [formData, setFormData] = useState({
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      soilType: '',
      state: '',
      district: '',
      subdivision: '',
      plotNumber: '',
      area: ''
  });
  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return(
    <>
  <div className="tellus-container">
    <h1>TELL US ABOUT<br />YOUR FARM</h1>
    <form className="farm-form" onSubmit={handleSubmit}>
      <p className="form-notice">
        If you do not know these values, contact us and we will come and test these.
      </p>
      
      <div className="form-group">
        <label>Nitrogen-</label>
        <input type="text" name="nitrogen" value={formData.nitrogen} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Phosphorus-</label>
        <input type="text" name="phosphorus" value={formData.phosphorus} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Potassium-</label>
        <input type="text" name="potassium" value={formData.potassium} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Soil type-</label>
        <input type="text" name="soilType" value={formData.soilType} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>State-</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>District-</label>
        <input type="text" name="district" value={formData.district} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Subdivision-</label>
        <input type="text" name="subdivision" value={formData.subdivision} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Plot number-</label>
        <input type="text" name="plotNumber" value={formData.plotNumber} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Area</label>
        <input type="text" name="area" value={formData.area} onChange={handleChange} />
      </div>

      <button type="submit" className="submit-btn">Submit</button>
    </form>
  </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tellus" element={<Tellus />} />
      </Routes>
    </Router>
  );
}
export default App;
