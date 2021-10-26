const sgMAil = require('@sendgrid/mail')

sgMAil.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMAil.send({
        to: email,
        from: 'oemuraye360@outlook.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app. ${name}, let me know how you get along with the app`,
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMAil.send({
        to: email,
        from: 'oemuraye360@outlook.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}, I hope to see you back. Please ${name}, Is there anything we could have done that would have kept you on board?`,
    })
}



module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}
