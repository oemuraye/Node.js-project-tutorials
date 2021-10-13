const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Tasks = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//how to create or post a task/user to a database
app.post('/users', async (req, res) => {
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

//how to read/fetch all tasks/users from database
app.get('/users', async (req, res) => {
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
app.get('/users/:id', async (req, res) => {
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
app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)  //keys converts the contents of the object to a string
  const allowedUpdates = ["name", "email", "password", "age"]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(400).send(e);
  }
});

//how to delet tasks/users in database
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }
    } catch (e) {
        res.status(500).send()
    }
})

app.post('/task', async (req, res) => {
    const tasks = new Tasks(req.body)

    try {
        await tasks.save()
        res.status(201).send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/task', async (req, res) => {
    try {
        const tasks = await Tasks.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/task/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Tasks.findById(_id)
        if (!task) {
            return res.status(400).send()
        }
    } catch (e) {
        res.status(500).send()
    }
})

app.patch('/task/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        })

         if (!task) {
           return res.status(404).send();
         }

         res.send(task);
    }catch(e){
        res.status(400).send(e)
    }
})

app.delete('/task/:id', async (req, res) => { 
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }
  } catch (e) {
    res.status(500).send();
  }
});


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})