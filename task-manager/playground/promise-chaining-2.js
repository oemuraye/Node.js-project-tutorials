require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findOneAndRemove("615de413aa204445015649e6").then((tasks) => {
//     console.log(tasks);
//     return Task.countDocuments({ complete: false });
//   }).then((task) => {
//     console.log(task);
//   }).catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

deleteTaskAndCount('6161d7c9c6cf252f5b098593').then((count) => {
  console.log(count)
  }).catch((e) => {
    console.log(e)
  })