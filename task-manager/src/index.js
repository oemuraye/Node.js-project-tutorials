const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('617434539fd17010500e1284')
    // await task.populate('owner')
    // console.log(task.owner)

    const user = await User.findById('617431051eb1eafa9bdb7463')
    await user.populate('userTasks')
    console.log(user.userTasks)
}
main()