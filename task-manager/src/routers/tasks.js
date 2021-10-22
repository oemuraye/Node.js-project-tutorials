const express = require('express')
const Tasks = require('../models/task')
// const auth = require('../middleware/auth');
const router = new express.Router()

router.post('/task', async (req, res) => {
  const tasks = new Tasks(req.body)

  try {
    await tasks.save()
    res.status(201).send(tasks)
  } catch (e) {
    res.status(400).send(e)
  }
});

router.get('/task', async (req, res) => {
  try {
    const tasks = await Tasks.find({})
    res.send(tasks);
  } catch (e) {
    res.status(500).send()
  }
});

router.get('/task/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Tasks.findById(_id)

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

router.patch('/task/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["description", "completed"]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' })
  }

  try {
    const task = await Tasks.findById(req.params.id)

    updates.forEach((update) => (task[update] = req.body[update]))
    await task.save();

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/task/:id', async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).send()
    }

    res.status(200).send('Task Deleted')
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router