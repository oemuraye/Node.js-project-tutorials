const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=67cf0805e8f415b0029bf781148a9646&query=45,-75&units=f'

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log('An error', error)
}) 


request.end()