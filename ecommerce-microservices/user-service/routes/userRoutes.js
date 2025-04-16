const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { authenticate } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// gogolgr auth ///////////////////////////
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax"
    }
  })
);

router.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/users/auth/google/callback",
      scope: ['profile', 'email']
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you would typically find or create a user in your database
      const user = {
        id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0].value,
        role: 'user' // Default role
      };
      
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: '1h' }
      );

      user.token = token; // Attach token to user object
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Modify the callback route to set cookie
router.get(
  "/auth/google",
  passport.authenticate("google", {
    failureRedirect: "/"
  }),
  (req, res) => {
    res.cookie('authToken', req.user.token, {
      // httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });
  }
);

router.get('/auth/google/callback', 
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/auth/signin'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:5173');
});

// Add an auth status endpoint
router.get("/auth/status", (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (!token) return res.json({ isAuthenticated: false });

    jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    res.json({ isAuthenticated: true });
  } catch (err) {
    res.json({ isAuthenticated: false });
  }
});

// Modify profile endpoint to return JSON
router.get("/api/profile", (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    res.json({ 
      name: decoded.name || "User",
      email: decoded.email,
      avatar: decoded.avatar
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Modify logout to clear cookie
router.get("/logout", (req, res) => {
  res.clearCookie('connect.sid', {
    path: '/', // Important: must match the path used when setting the cookie
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Logout failed');
    }
    
    // Redirect after successful logout
    res.send("cookie cleared")
  });
});


///////////////////////////////////////////////////////////




const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: 'Too many attempts, please try again later'
});
// Register a new user
router.post('/register', async (req, res) => {
  console.log("register request recieved")
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      console.log("user already exist ")
      return res.status(409).json({ error: 'User with this email already exists.' });
    }
    const user = new User(req.body);
    // delete user.role;

    await user.save();
console.log("New User created")
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('authToken', token, {
      // httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 3600000, 
    });
    
    const userDetails = {
      _id: user._id,
      email: user.email,
      role: user.role
    };
    console.log("sent "+ userDetails)
    res.status(201).json({ user: userDetails});
  } catch (err) {
    console.log("error in catch" + err.message)
    res.status(400).json({ error: err.message });
  }
});

// Login user
router.post('/login', authLimiter, async (req, res) => {
  console.log("login rew recieved ")
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("User found " +email )
    if (!user || !(await user.comparePassword(password))) {
      console.log("password is incorrect")
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET||'your_secret_key',
      { expiresIn: '1h' }
    );

    res.cookie('authToken', token, {
      
      maxAge: 3600000,
    });
console.log("cookie sent")
    res.json({
      user: {
        _id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.log("error in catch " + err)
    res.status(500).json({ error: 'Server error' });
  }
});



router.post('/logout', (req, res) => {
  console.log("loggoiin out")
  try {
    console.log("Logout request received from:", req.ip);
    
    // Clear all auth cookies
    res.clearCookie('authToken', {
      // httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      // sameSite: 'strict',
      // path: '/',
      // domain: process.env.COOKIE_DOMAIN || undefined
    });
    
    // Additional cookies cleanup if needed
    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');
    
    console.log("Auth cookies cleared successfully");
    
    // Send response before any potential redirect
    res.status(200).json({ 
      success: true,
      message: 'Logged out successfully',
      timestamp: new Date().toISOString()
    });

    // Log the logout event
    logger.info(`User logged out - IP: ${req.ip}`);

  } catch (err) {
    console.log("in catch " + err.message)
    console.error("Logout handler error:", err);
    
    // Even if error occurs, attempt to clear cookies
    res.clearCookie('authToken');
    
    res.status(500).json({
      success: false,
      error: 'Logout processing failed',
      systemError: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Check if user is logged in
router.get('/check', (req, res) => {
  const token = req.cookies.authToken;
  console.log(token)
  if (!token) return res.status(200).json({ loggedIn: false });

  try {
    jwt.verify(token, JWT_SECRET);
    console.log("checked true")
    res.status(200).json({ loggedIn: true });
  } catch (err) {
    console.log(" in catch"+ err.message )
    res.status(200).json({ loggedIn: false });
  }
});

// Get user by ID (protected route)
router.get('/:id', authenticate, async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied.' });
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});





module.exports = router;
