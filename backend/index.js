import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";
import mongoose from "mongoose";
const app=express();
const port=3000;
const saltRounds=10;
env.config();

app.use(express.json());
app.use(
    session({
      secret: "PASSWORD",
      resave: true,
      saveUninitialized: true,
    })
  );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/HarvestHarmony", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req,res)=>{ 
    console.log("LandingPage test");
})

app.get("/login", (req,res)=>{
  console.log("login test");
})

app.get("/signup", (req,res)=>{
  console.log("signup test");
})

app.get("/homePage", (req,res)=>{
  if(req.isAuthenticated()){
    console.log("Logged onto home page");
  }
  else{
    console.log("Could not login");
    res.redirect("/login");
  }
})

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/homePage",
    failureRedirect: "/login",
  })
);
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  console.log(email,password);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.redirect("/login");
    }
    console.log(password,saltRounds);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    req.login(newUser, (err) => {
      if (err) {
        console.log("Error while registering");
        console.error("Login error:", err);
        return res.redirect("/login");
      }
      res.redirect("/secrets");
    });
  } catch (err) {
    console.error(err);
    res.redirect("/register");
  }
});
passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      const isValid = await bcrypt.compare(password, user.password);
      return isValid ? done(null, user) : done(null, false, { message: "Incorrect password" });
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });