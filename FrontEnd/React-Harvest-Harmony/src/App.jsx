import SignInButton from "./SignInButton.jsx"
import Landing2 from "./landing2.jsx"
import Landing3 from "./landing3.jsx"
import Landing4 from "./landing4.jsx"
import Landing5 from "./landing5.jsx"
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
// function LandingPage() {
//   return (
//     <div>
//       <h1>Welcome to HarvestHarmony</h1>
//       <Link to="/login">Login</Link>
//       <Link to="/signup">Sign Up</Link>
//     </div>
//   );
// }
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
    <div>
      {/* <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link> */}
    </div>
    </>
  );
}

// Login Component
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history=useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        history.push("/HomePage");
            } else {
        const errorData = await response.json();
        alert(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };
  return (
    <div className="login-container">
        <h2>Sign In</h2>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
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
}

// Signup Component
function Signup() {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, phone, dob, username, password }),
        credentials: 'include'
      });
  
      const data = await response.json();
      if (response.ok) {
        window.location.href = '/homePage';
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  

  return (
    <div className="signup-container">
        <h2>Create Account</h2>
      <div className="signup-box">
        <form onSubmit={handleSubmit}>
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
}
function TellUsAboutYourFarm() {
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [soiltype, setSoiltype] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [subdivision, setSubdivision] = useState('');
  const [plotnumber, setPlotnumber] = useState('');
  const [area, setArea] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/tellusaboutyourfarm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nitrogen, phosphorus, potassium, soiltype, state, district, subdivision, plotnumber, area }),
        credentials: 'include',
      });

      if (response.ok) {
        alert('Farm details submitted successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to submit farm details');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={nitrogen} onChange={(e) => setNitrogen(e.target.value)} placeholder="Nitrogen" required />
      <input type="number" value={phosphorus} onChange={(e) => setPhosphorus(e.target.value)} placeholder="Phosphorus" required />
      <input type="number" value={potassium} onChange={(e) => setPotassium(e.target.value)} placeholder="Potassium" required />
      <input type="text" value={soiltype} onChange={(e) => setSoiltype(e.target.value)} placeholder="Soil Type" required />
      <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required />
      <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="District" required />
      <input type="text" value={subdivision} onChange={(e) => setSubdivision(e.target.value)} placeholder="Subdivision" required />
      <input type="text" value={plotnumber} onChange={(e) => setPlotnumber(e.target.value)} placeholder="Plot Number" required />
      <input type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Area (sq ft)" required />
      <button type="submit">Submit</button>
    </form>
  );
}


// Home Page Component
function HomePage() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch('http://localhost:3000/api/homePage', {
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Not authenticated');
        }
        return response.json();
      })
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        history.push('/login');
      });
  }, [history]);
  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { credentials: 'include' });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/homePage" component={HomePage} />
        <Route path="/tellusaboutyourfarm" component={TellUsAboutYourFarm} />

      </Switch>
    </Router>
  );
}
export default App
