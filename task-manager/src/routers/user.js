const express = require("express");
const User = require('../models/user')
const router = new express.Router();

//how to create or post a task/user to a database
router.post('/users', async (req, res) => {
    const user = new User(req.body) 

    try {
        await user.save()
        res.status(201).send(user)
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
    res.send(user)
  } catch (e) {
    res.status(400).send()
  }
})

//how to read/fetch all tasks/users from database
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

//how to read/fetch all task/user from database
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
          return res.status(404).send();
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }

    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }

    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

//how to update tasks/users in database
router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)  //keys converts the contents of the object to a string
  const allowedUpdates = ["name", "email", "password", "age"]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findById(req.params.id)

      updates.forEach((update) => user[update] = req.body[update])
      
      await user.save()


    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(400).send(e);
  }
});

//how to delete tasks/users in database
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
