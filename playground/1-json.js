const fs = require('fs')
const { consumers } = require('stream')

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-JSON.json', bookJSON)

// const dataBuffer = fs.readFileSync('1-JSON.json')
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)

// console.log(data.title)

const dataBuffer = fs.readFileSync('1-JSON.json') //fetching data
const dataJSON = dataBuffer.toString() //turn to string

const user = JSON.parse(dataJSON) //storing data fetched in a variable

user.name = 'Pius'
user.age = '26'

const userJSON = JSON.stringify(user) //stringifying again
fs.writeFileSync('1-JSON.json', userJSON) //re-writing the fetched data

