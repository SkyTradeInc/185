const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User')

const createToken = (doc) => {
  const token = jwt.sign(
<<<<<<< HEAD
    {email: doc.email},
=======
    {username: doc.username, role: doc.role},
>>>>>>> 40576ab0d3d20e79a0256709fd1539a7651815d6
    'Fp21nsEbDT',
    {expiresIn: '14d'}
  );
  return token;
}

<<<<<<< HEAD
router.post('/register', (req,res) => {
  const { email, password } = req.body;
  User.findOne({email})
    .then(doc => {
      if(!doc) {
        const email_verification = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
        if(email_verification.test(email)) {
          if(password.length >= 6) {
            bcrypt.hash(password, 10, function(err, hash) {
              User.create({email, password:hash})
                .then(newUser => {
                  const token = createToken(newUser);
                  return res.status(200).send({
                    success: true,
                    timestamp: Date.now(),
                    message: "Successful registration",
                    jwt: token
                  })
                })
            })
          } else {
            return res.status(200).send({
              success: false,
              timestamp: Date.now(),
              message: "Invalid password"
            })
          }
        } else {
          return res.status(200).send({
            success: false,
            timestamp: Date.now(),
            message: "Invalid email"
          })
        }
      } else {
        return res.status(200).send({
          success: false,
          timestamp: Date.now(),
          message: "Email is already registered"
        })
      }
    })
    .catch(err => {
      return res.status(200).send({
        success: false,
        timestamp: Date.now(),
        message: "Unknown error"
      })
    })

})

router.post('/login', (req,res) => {
  const {email, password} = req.body;
  User.findOne({email})
    .then(doc => {
      if(!doc) {
        return res.status(200).send({
          success: false,
          timestamp: Date.now(),
          message: "Email doesn't exist"
        })
      } else {
        //check
        bcrypt.compare(password, doc.password, function(err, match) {
          if(match) {
=======
returnError = (res, message) => {
  res.status(200).send({
    success: false,
    timestamp: Date.now(),
    message: message
  })
}

const isAuthenticated = (req,res, next) => {
  const {token}  = req.headers;
  if(token) {
    const secret = 'Fp21nsEbDT';
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return returnError(res, err)
      req.role = decoded.role;
      next();
    })
  } else {
    return returnError(res, 'Token not present in headers')
  }
}

router.post('/status', isAuthenticated, (req,res) => {
  return res.status(200).send({
    success: true,
    timestamp: Date.now(),
    message: "Authenticated",
    role: req.role
  })
})



router.post('/register', (req,res) => {
  const { username, password } = req.body;
  if(username && password) {
    User.findOne({username})
      .then(doc => {
        if(!doc) {
          if(username.length > 3 && username.length < 15) {
            if(password.length >= 3) {
              bcrypt.hash(password, 10, function(err, hash) {
                User.create({username, password:hash, role:'admin'})
                  .then(newUser => {
                    const token = createToken(newUser);
                    return res.status(200).send({
                      success: true,
                      timestamp: Date.now(),
                      message: "Successful registration",
                      token
                    })
                  })
              })
            } else {
              return returnError(res, 'Invalid password')
            }
          } else {
            return returnError(res, 'Invalid username')
          }
        } else {
          return returnError(res, 'Username is already taken')
        }
      })
      .catch(err => {
        return returnError(res, `Error: ${err}`)
      })
    } else {
      returnError(res, "You must provide a username and password")
    }
})


router.put('/users', (req, res) => {
  const {username, password} = req.body;
  if(username && password) {
    User.findOne({username})
    .then(doc => {
      if(!doc) {
        return returnError(res, 'Username not found')
      } else {
        if(password.length >= 3) {
          bcrypt.hash(password, 10, function(err, hash) {
            doc.password = hash
            doc.save()
>>>>>>> 40576ab0d3d20e79a0256709fd1539a7651815d6
            const token = createToken(doc);
            return res.status(200).send({
              success: true,
              timestamp: Date.now(),
<<<<<<< HEAD
              message: "Successful login",
              jwt: token
            })
          } else {
            return res.status(200).send({
              success: false,
              timestamp: Date.now(),
              message: "Wrong password"
            })
          }
        })
      }
    })
    .catch(err => {
      return res.status(200).send({
        success: false,
        timestamp: Date.now(),
        message: "Unknown error"
      })
    })
=======
              message: "Successful password change",
              token
            })
          })
        } else {
          returnError(res, "You must provide a valid password")
        }

      }
    })
    .catch(err => {
      return returnError(res, `Error: ${err}`)
    })
  } else {
    returnError(res, "You must provide a username and password")
  }
})



router.post('/login', (req,res) => {
  const {username, password} = req.body;
  if(username && password) {
    User.findOne({username})
      .then(doc => {
        if(!doc) {
          return returnError(res, 'Username not found')
        } else {
          //check
          bcrypt.compare(password, doc.password, function(err, match) {
            if(match) {
              const token = createToken(doc);
              return res.status(200).send({
                success: true,
                timestamp: Date.now(),
                message: "Successful login",
                token
              })
            } else {
              return returnError(res, 'Wrong password')

            }
          })
        }
      })
      .catch(err => {
        return returnError(res, `Error: ${err}`)
      })
    } else {
      returnError(res, "You must provide a username and password")
    }
>>>>>>> 40576ab0d3d20e79a0256709fd1539a7651815d6
})

router.post('/forgotPassword', (req,res) => {
  const { email } = req.body;
  User.findOne({email})
    .then(doc => {
      if(!doc) {
        return res.status(200).send({
          success: false,
          timestamp: Date.now(),
          message: "Email does not exist"
        })
      } else {
        // send an email link to new password
      }
    })
})

<<<<<<< HEAD

router.post('/changePassword', (req, res) => {

})

router.post('/changeRole', (req,res) => {
  
})


module.exports = router;
=======
router.get('/users', (req, res) => {
  User.find({})
  .then(doc => {
    res.status(200).send({
      success: true,
      timestamp: Date.now(),
      message: `${doc.length} users(s) found`,
      data: doc
    })
  })
  .catch(err => {
    return returnError(res, `Error: ${err}`)
  })
})

router.delete('/users', (req, res) => {
  const {_id} = req.body;
  User.deleteOne({_id})
    .then(doc => {
      if(!doc) {
        return returnError(res, `User with _id ${_id} not found`)
      } else {
        res.status(200).send({
          success: true,
          timestamp: Date.now(),
          message: `User with _id ${_id} deleted`,
          data: doc
        })
      }
    })
    .catch(err => {
      return returnError(res, `Error: ${err}`)
    })
})



router.post('/changeRole', (req,res) => {

})


module.exports = router;
>>>>>>> 40576ab0d3d20e79a0256709fd1539a7651815d6
