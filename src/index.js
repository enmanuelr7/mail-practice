const express = require('express')
const nodemailer = require('nodemailer')
require('dotenv').config()
const app = express()

app.use(express.json())

app.post('/', async (req, res) => {
    let transporter = nodemailer.createTransport({
        host: "mail.dekorachile.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'noreply@dekorachile.com', // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object

    try {
        let info = await transporter.sendMail({
            from: 'noreply@dekorachile.com', // sender address
            to: "enmanuel_ram@hotmail.com", // list of receivers
            subject: "Gracias por tu compra", // Subject line
            text: `hola ${req.body.name}, gracias por tu compra`, // plain text body
            // html: `hola ${req.body.name}, gracias por tu compra`, // html body
        });
        res.send("Message sent: %s " + info.messageId);
    } catch (error) {
        res.status(400).send(error);
    }

})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})