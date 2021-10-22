const express = require("express");
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router();



//how to create or post a task/user to a database
router.post('/users', async (req, res) => {
    const user = new User(req.body) 

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }


    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

//how to login in user
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send()
  }
})

//how to logout user from one device
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.send('User Logout Successfully')
  } catch (e) {
    res.status(500).send()
  }
})

//how to logout user from all devices
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []

    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

//how to read/fetch all tasks/users from database
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

//how to update tasks/users in database
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)  //keys converts the contents of the object to a string
  const allowedUpdates = ["name", "email", "password", "age"]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {

    updates.forEach((update) => req.user[update] = req.body[update])  
    await req.user.save()
    res.send(req.user)
    
  } catch (e) {
    res.status(400).send(e);
  }
});

//how to delete tasks/users in database
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()

        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
