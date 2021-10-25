const express = require('express')
const Tasks = require('../models/task')
const auth = require('../middleware/auth');
const router = new express.Router()

router.post('/task', auth, async (req, res) => {

  const tasks = new Tasks({
      ...req.body,
      owner: req.user._id
  })

  try {
    await tasks.save()
    res.status(201).send(tasks)
  } catch (e) {
    res.status(400).send(e)
  }
});

router.get('/task', auth, async (req, res) => {
  const match = {}
  const sort= {}

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    // const tasks = await Tasks.find({  owner: req.user._id })
    // res.send(tasks)

//alternatively the above also works

    await req.user.populate({
      path: 'userTasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    })
    res.send(req.user.userTasks)
  } catch (e) {
    res.status(500).send()
  }
});

router.get('/task/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Tasks.findOne({ _id, owner: req.user._id })

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

router.patch('/task/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["description", "completed"]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' })
  }

  try {
    const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id })

    
    if (!task) {
      return res.status(404).send()
    }

    updates.forEach((update) => (task[update] = req.body[update]))
    await task.save();

    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/task/:id', auth, async (req, res) => {
  try {
    const task = await Tasks.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      res.status(404).send()
    }

    res.status(200).send('Task Deleted')
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router