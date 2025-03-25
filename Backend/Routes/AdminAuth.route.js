const express = require('express');
const router = express.Router();
const User = require('../Model/Admin_user');

// POST route for handling registration and login
router.post('/', async function (req, res, next) {
  try {
    if (req.body.password !== req.body.passwordConf) {
      const err = new Error('Password doesn\'t match!');
      err.status = 400;
      res.send('Password doesn\'t match!');
      return next(err);
    }

    if ( req.body.username && req.body.password && req.body.passwordConf) {
      const AdminuserData = {
        username: req.body.username,
        password: req.body.password,
        // passwordConf: req.body.passwordConf,
      };

      // Using async/await for creating the user
      const admin = await User.create(AdminuserData);
      req.session.userId = admin._id;
      console.log("Admin created")
      return res.redirect('/profile');
    } else if (req.body.logusername && req.body.logpassword) {
      // Authenticate user
      const admin = await User.authenticate(req.body.logusername, req.body.logpassword);

      if (!admin) {
        const err = new Error('Wrong username or password! 454');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = admin._id;
        console.log("logged in")
        return res.redirect('/profile');
      }
    } else {
      const err = new Error('All fields are required!');
      err.status = 400;
      return next(err);
    }
  } catch (error) {
    return next(error);
  }
});

// GET route to view profile
router.get('/profile', async function (req, res, next) {
  try {
    const admin = await User.findById(req.session.userId);

    if (!admin) {
      const err = new Error('Not authorized! Go back!');
      err.status = 400;
      return next(err);
    } else {
      return res.send(`<h2>Your name: </h2>${admin.username}<h2>Your email: </h2>${admin.email}<br><a type="button" href="/logout">Logout</a>`);
    }
  } catch (error) {
    return next(error);
  }
});

// GET for logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        // Clear the session cookie from the client
        console.log('logged out ')
        res.clearCookie('connect.sid'); // This clears the session cookie
        return res.status(200).json({ message: 'Logged out successfully' });
      }
    });
  } else {
    return res.status(400).json({ message: 'No active session found' });
  }
});


// Check if user is logged in (authenticated)
router.get('/check', function (req, res) {
  if (req.session && req.session.userId) {
    // User is logged in, send the user data
    return res.status(200).json({ loggedIn: true, userId: req.session.userId });
  } else {
    // No session, user is not logged in
    return res.status(200).json({ loggedIn: false });
  }
});


module.exports = router;
