import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 10;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(session({
  secret: process.env.SESSION_SECRET || "YOUR_SECRET_KEY",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === "production" }
}));
app.use(passport.initialize());
app.use(passport.session());

// Database connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/HarvestHarmony", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// User model
const userSchema = new mongoose.Schema({
  fullname: String,
  phone: String,
  dob: String,
  username: String,
  password: String,
  farmData: {
    nitrogen: String,
    phosphorus: String,
    potassium: String,
    soiltype: String,
    state: String,
    district: String,
    subdivision: String,
    plotnumber: String,
    area: String
  }
});

const User = mongoose.model("User", userSchema);

// Passport configuration
passport.use(new LocalStrategy(
  { usernameField: 'username' },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "User not found" });
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Routes
app.get("/api/", (req, res) => {
  res.json({ message: "Welcome to HarvestHarmony API" });
});

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  console.log("loginbackend");
  res.json({ message: "Login successful", user: req.user });
});

app.post("/api/register", async (req, res) => {
  const { fullname,phone,dob,username,password} = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ fullname,phone,dob,username, password: hashedPassword });
    await newUser.save();
    req.login(newUser, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Error during login after registration" });
      }
      res.json({ message: "Registration successful", user: newUser });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during registration" });
  }
});
app.post("/api/tellusaboutyourfarm", async (req, res) => {
  const { nitrogen, phosphorus, potassium, soiltype, state, district, subdivision, plotnumber, area } = req.body;

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.farmData = { nitrogen, phosphorus, potassium, soiltype, state, district, subdivision, plotnumber, area };
    await user.save();

    res.json({ message: "Farm data saved successfully", user });
  } catch (error) {
    console.error("Error saving farm data:", error);
    res.status(500).json({ message: "Error saving farm data" });
  }
});

app.get("/api/homePage", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: "Welcome to the home page", user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.get("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error during logout" });
    }
    res.json({ message: "Logout successful" });
  });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
